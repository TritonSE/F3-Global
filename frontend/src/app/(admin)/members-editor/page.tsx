"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { StorageReference } from "firebase/storage";

import {
  createMember,
  deleteMember,
  getMembers,
  type Member,
  type MemberPayload,
  updateMember,
} from "@/api/members";
import { AdminSidebar } from "@/components/admin-portal/AdminSidebar";
import { ConfirmationNotification } from "@/components/admin-portal/ConfirmationNotification";
import { HeaderSection } from "@/components/admin-portal/HeaderSection";
import { type MemberFormData, MemberFormModal } from "@/components/admin-portal/MemberFormModal";
import { IconAdd } from "@/components/admin-portal/MemberIcons";
import { MembersTable } from "@/components/admin-portal/MembersTable";
import { MembersPreview } from "@/components/admin-portal/preview-components/MembersPreview";
import { PreviewMode } from "@/components/admin-portal/preview-components/PreviewMode";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Pagination } from "@/components/newsletters-page/Pagination";
import { auth } from "@/firebase/firebase";
import { rollbackUploads, uploadToStorage } from "@/utils/firebaseStorage";

const PAGE_SIZE = 6;

function TableSkeleton() {
  return (
    <div className="w-full rounded-[16px] border border-[#C7C7C7] overflow-hidden">
      <div className="h-[58px] bg-[#F4F4F4]" />
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <div key={i} className="border-t border-[#C7C7C7] px-[25px] py-[20px]">
          <div className="h-[20px] w-full animate-pulse rounded bg-[#F4F4F4]" />
        </div>
      ))}
    </div>
  );
}

export default function TeamMembersEditorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [page, setPage] = useState(1);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [countryFilter, setCountryFilter] = useState("");

  const [isAdding, setIsAdding] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const [toast, setToast] = useState<string | null>(null);
  const [toastFading, setToastFading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        router.push("/login");
        return;
      }
      void getMembers()
        .then((fetched) => setMembers(fetched))
        .catch((error) => console.error("Failed to fetch members:", error))
        .finally(() => setLoading(false));
    });
    return () => unsubscribe();
  }, [router]);

  const countryOptions = useMemo(() => [...new Set(members.map((m) => m.country))], [members]);

  const processed = useMemo(() => {
    const filtered = countryFilter ? members.filter((m) => m.country === countryFilter) : members;
    return [...filtered].sort((a, b) =>
      sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  }, [members, countryFilter, sortDir]);

  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
  const pageMembers = processed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  function showToast(message: string) {
    setToast(message);
    setToastFading(false);
    setTimeout(() => setToastFading(true), 3000);
    setTimeout(() => setToast(null), 4500);
  }

  function closeModal() {
    setIsAdding(false);
    setEditingMember(null);
  }

  async function handlePublish(data: MemberFormData) {
    setIsPublishing(true);
    const uploadedRefs: StorageReference[] = [];
    try {
      let headshotUrl = data.headshotUrl;
      if (data.newImage) {
        headshotUrl = await uploadToStorage(
          data.newImage,
          `members/${Date.now()}-${data.newImage.name}`,
          uploadedRefs,
        );
      }

      const payload: MemberPayload = {
        name: data.name,
        memberPosition: data.memberPosition,
        country: data.country,
        email: data.email,
        linkedinUrl: data.linkedinUrl,
        headshotUrl,
      };

      if (editingMember) {
        const updated = await updateMember(editingMember._id, payload);
        setMembers((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
      } else {
        const created = await createMember(payload);
        setMembers((prev) => [...prev, created]);
      }
      showToast(
        `Team member ${data.name} has been ${editingMember ? "edited" : "added"} successfully.`,
      );
      closeModal();
    } catch (error) {
      console.error("Failed to publish member:", error);
      await rollbackUploads(uploadedRefs);
    } finally {
      setIsPublishing(false);
    }
  }

  async function handleDelete(member: Member) {
    setIsPublishing(true);
    try {
      await deleteMember(member._id);
      setMembers((prev) => prev.filter((m) => m._id !== member._id));
      showToast(`Team member ${member.name} has been deleted successfully.`);
    } catch (error) {
      console.error("Failed to delete member:", error);
    } finally {
      setDeletingMember(null);
      setIsPublishing(false);
    }
  }

  const addButton = (
    <button
      type="button"
      onClick={() => setIsAdding(true)}
      className="flex items-center justify-center gap-[10px] rounded-[99px] bg-[#1169B0] px-[20px] py-[10px] cursor-pointer"
    >
      <IconAdd className="size-[32px]" />
      <span className="font-dm-sans text-[16px] font-semibold text-white">ADD TEAM MEMBER</span>
    </button>
  );

  if (isPreview) {
    return (
      <div className="min-h-screen bg-white">
        <AdminSidebar activeItem="meet-the-team" />
        <div className="ml-[203px]">
          <PreviewMode onBack={() => setIsPreview(false)} publishButton={null}>
            <MembersPreview members={members} />
          </PreviewMode>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AdminSidebar activeItem="meet-the-team" />
      <div className="relative ml-[203px] flex flex-col">
        {toast && (
          <ConfirmationNotification
            message={toast}
            fading={toastFading}
            onDismiss={() => setToast(null)}
          />
        )}

        <HeaderSection
          title="Edit Team Members"
          tags={["MEET THE TEAM"]}
          description="Add or remove current F3 team members, or edit information including member locations, image, and contact links."
          onBack={() => router.push("/admin-portal")}
          onPreview={() => setIsPreview(true)}
          actionButton={addButton}
        />

        <div className="flex flex-col gap-[40px] px-[100px] py-[50px]">
          {loading ? (
            <TableSkeleton />
          ) : (
            <>
              <MembersTable
                members={pageMembers}
                sortDir={sortDir}
                onToggleSort={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                countryFilter={countryFilter}
                countryOptions={countryOptions}
                onCountryFilterChange={(code) => {
                  setCountryFilter(code);
                  setPage(1);
                }}
                onRowClick={(m) => setEditingMember(m)}
                onDelete={(m) => setDeletingMember(m)}
              />
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </div>
      </div>

      {(isAdding || editingMember) && (
        <MemberFormModal
          mode={editingMember ? "edit" : "add"}
          initialMember={editingMember ?? undefined}
          isPublishing={isPublishing}
          onClose={closeModal}
          onPublish={(data) => void handlePublish(data)}
        />
      )}

      <ConfirmationDialog
        open={deletingMember !== null}
        onClose={() => setDeletingMember(null)}
        title="Are You Sure?"
        body={`Are you sure you want to delete ${
          deletingMember?.name ?? "this member"
        }? This action cannot be undone.`}
        cancelLabel="Cancel"
        confirmLabel="YES, DELETE"
        confirmLoading={isPublishing}
        onConfirm={() => {
          if (deletingMember) void handleDelete(deletingMember);
        }}
      />
    </div>
  );
}

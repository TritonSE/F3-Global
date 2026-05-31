"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { StorageReference } from "firebase/storage";

import {
  getClientHighlights,
  type HighlightItem,
  updateClientHighlights,
} from "@/api/clientHighlights";
import { AdminSidebar } from "@/components/admin-portal/AdminSidebar";
import { ConfirmationNotification } from "@/components/admin-portal/ConfirmationNotification";
import { HeaderSection } from "@/components/admin-portal/HeaderSection";
import { HighlightForm } from "@/components/admin-portal/HighlightForm";
import { PreviewMode } from "@/components/admin-portal/preview-components/PreviewMode";
import { PreviewNavBar } from "@/components/admin-portal/preview-components/PreviewNavBar";
import { PublishButton } from "@/components/admin-portal/PublishButton";
import { RevertButton } from "@/components/admin-portal/RevertButton";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Highlights } from "@/components/Highlights";
import { deleteFromStorageUrl, rollbackUploads, uploadToStorage } from "@/utils/firebaseStorage";

function ClientPill({
  highlight,
  isSelected,
  onClick,
}: {
  highlight: HighlightItem;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-[#F4F4F4] border flex items-center justify-between px-[15px] py-[10px] rounded-[10px] w-[185px] cursor-pointer transition-colors ${
        isSelected ? "border-[#1169B0]" : "border-[#C7C7C7] hover:border-[#A0A0A0]"
      }`}
    >
      <span
        className={`font-dm-sans text-[16px] text-[#1E1E1E] truncate ${
          isSelected ? "font-semibold" : "font-normal"
        }`}
      >
        {highlight.clientName || `Unnamed Client`}
      </span>
      <span className="shrink-0 ml-[10px] flex items-center justify-center">
        <span
          className={`size-[16px] rounded-full border-[1.5px] flex items-center justify-center transition-colors ${
            isSelected ? "border-[#1169B0]" : "border-[#C7C7C7]"
          }`}
        >
          {isSelected && <span className="size-[8px] rounded-full bg-[#1169B0]" />}
        </span>
      </span>
    </button>
  );
}

export default function ClientHighlightsEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [originalHighlights, setOriginalHighlights] = useState<HighlightItem[]>([]);
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [primaryId, setPrimaryId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [showBackDialog, setShowBackDialog] = useState(false);
  const [showRevertDialog, setShowRevertDialog] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastFading, setToastFading] = useState(false);

  function showToast(message: string) {
    setToast(message);
    setToastFading(false);
    setTimeout(() => setToastFading(true), 3000);
    setTimeout(() => setToast(null), 4500);
  }

  useEffect(() => {
    async function load() {
      try {
        const fetched = await getClientHighlights();
        const sorted = [...fetched].sort((a, b) => a.order - b.order);
        setOriginalHighlights(sorted);
        setHighlights(sorted);
        const primary = sorted.find((h) => h.order === 0);
        setPrimaryId(primary?._id ?? null);
        setSelectedId(primary?._id ?? sorted[0]?._id ?? null);
      } catch (error) {
        console.error("Failed to fetch client highlights:", error);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  const originalPrimaryId = originalHighlights.find((o) => o.order === 0)?._id ?? null;

  const hasChanges =
    primaryId !== originalPrimaryId ||
    highlights.some((h) => {
      const orig = originalHighlights.find((o) => o._id === h._id);
      if (!orig) return true;
      return (
        h.newImage !== undefined ||
        h.clientName !== orig.clientName ||
        h.quoteText !== orig.quoteText ||
        h.fullText !== orig.fullText ||
        h.imageUrl !== orig.imageUrl
      );
    });

  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      if (hasChanges) e.preventDefault();
    }
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [hasChanges]);

  function handleChange(id: string, updated: Partial<HighlightItem>) {
    setHighlights((prev) => prev.map((h) => (h._id === id ? { ...h, ...updated } : h)));
  }

  function handleMakePrimary(id: string) {
    setPrimaryId((curr) => (curr === id ? null : id));
  }

  function handleRevert() {
    setHighlights(originalHighlights);
    setPrimaryId(originalPrimaryId);
  }

  async function handlePublish() {
    if (!primaryId) return;
    setIsPublishing(true);
    const newlyUploadedRefs: StorageReference[] = [];

    try {
      const ordered = highlights.slice().sort((a, b) => {
        if (a._id === primaryId) return -1;
        if (b._id === primaryId) return 1;
        return 0;
      });

      const finalHighlights: HighlightItem[] = await Promise.all(
        ordered.map(async (h, idx) => {
          let imageUrl = h.imageUrl;
          if (h.newImage) {
            imageUrl = await uploadToStorage(
              h.newImage,
              `client-highlights/${Date.now()}-${h.newImage.name}`,
              newlyUploadedRefs,
            );
          }
          const { newImage: _newImage, ...rest } = h;
          return { ...rest, imageUrl, order: idx };
        }),
      );

      const saved = await updateClientHighlights(finalHighlights);

      const replacedUrls = highlights
        .filter((h) => h.newImage)
        .map((h) => originalHighlights.find((o) => o._id === h._id)?.imageUrl)
        .filter((url): url is string => Boolean(url));

      await Promise.all(replacedUrls.map(deleteFromStorageUrl));

      const sortedSaved = [...saved].sort((a, b) => a.order - b.order);
      setOriginalHighlights(sortedSaved);
      setHighlights(sortedSaved);
      const savedPrimary = sortedSaved.find((h) => h.order === 0);
      setPrimaryId(savedPrimary?._id ?? null);
      showToast("Client highlights have been published successfully.");
    } catch (error) {
      console.error("Critical Publish Error:", error);
      await rollbackUploads(newlyUploadedRefs);
    } finally {
      setIsPublishing(false);
    }
  }

  const publishButton = (
    <PublishButton
      handleClick={() => void handlePublish()}
      disabled={!hasChanges || !primaryId || isPublishing}
    />
  );

  const previewHighlights = useMemo(() => {
    if (!primaryId) return highlights;
    return highlights
      .slice()
      .sort((a, b) => {
        if (a._id === primaryId) return -1;
        if (b._id === primaryId) return 1;
        return 0;
      })
      .map((h, idx) => ({ ...h, order: idx }));
  }, [highlights, primaryId]);

  if (loading) return null;

  if (isPreview) {
    return (
      <PreviewMode
        onBack={() => setIsPreview(false)}
        publishButton={publishButton}
        notificationMessage={toast}
        notificationFading={toastFading}
        onDismissNotification={() => setToast(null)}
      >
        <div className="bg-white rounded-[10px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.1)] w-full">
          <PreviewNavBar activeItem="Get Involved" />
          <Highlights highlights={previewHighlights} />
        </div>
      </PreviewMode>
    );
  }

  const primary = primaryId ? (highlights.find((h) => h._id === primaryId) ?? null) : null;
  const secondaries = highlights.filter((h) => h._id !== primaryId);
  const selectedHighlight = highlights.find((h) => h._id === selectedId) ?? highlights[0];
  const selectedIndex = selectedHighlight
    ? highlights.findIndex((h) => h._id === selectedHighlight._id)
    : 0;

  return (
    <div className="bg-white min-h-screen relative">
      <AdminSidebar />
      <div className="ml-[203px]">
        {toast && (
          <ConfirmationNotification
            message={toast}
            fading={toastFading}
            onDismiss={() => setToast(null)}
          />
        )}
        <HeaderSection
          title="Client Testimonials"
          tags={["HOME", "ABOUT US", "DONORS", "CLIENTS*"]}
          description="Edit 3 different client stories and their pictures. One story must be primary."
          onBack={() => (hasChanges ? setShowBackDialog(true) : router.push("/admin-portal"))}
          onPreview={() => setIsPreview(true)}
        />

        <div className="px-[100px] py-[50px]">
          <div className="flex gap-[100px] items-start">
            <div className="flex flex-col gap-[25px] shrink-0">
              <div className="flex flex-col gap-[10px]">
                <span className="font-dm-sans font-bold text-[12px] text-[#5D5D5D]">PRIMARY</span>
                {primary && primary._id ? (
                  <ClientPill
                    highlight={primary}
                    isSelected={selectedId === primary._id}
                    onClick={() => setSelectedId(primary._id ?? null)}
                  />
                ) : (
                  <div className="w-[185px] px-[15px] py-[10px] rounded-[10px] border border-[#B93B3B] bg-[#FBEAEA] flex items-center justify-between gap-[10px]">
                    <span className="font-dm-sans font-semibold text-[14px] text-[#B93B3B]">
                      Select Primary
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#B93B3B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-[20px] shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-[10px]">
                <span className="font-dm-sans font-bold text-[12px] text-[#5D5D5D]">SECONDARY</span>
                <div className="flex flex-col gap-[15px]">
                  {secondaries.map((h) =>
                    h._id ? (
                      <ClientPill
                        key={h._id}
                        highlight={h}
                        isSelected={selectedId === h._id}
                        onClick={() => setSelectedId(h._id ?? null)}
                      />
                    ) : null,
                  )}
                </div>
              </div>
            </div>

            {selectedHighlight && (
              <div className="flex flex-col gap-[25px]">
                <HighlightForm
                  index={selectedIndex}
                  highlight={selectedHighlight}
                  isPrimary={selectedHighlight._id === primaryId}
                  onChange={handleChange}
                  onMakePrimary={handleMakePrimary}
                />
                <div className="flex gap-[10px] items-center justify-end">
                  <RevertButton
                    handleClick={() => setShowRevertDialog(true)}
                    disabled={!hasChanges || isPublishing}
                  />
                  {publishButton}
                </div>
              </div>
            )}
          </div>
        </div>

        <ConfirmationDialog
          open={showBackDialog}
          onClose={() => setShowBackDialog(false)}
          title="Are You Sure?"
          body="Are you sure you want to go back? Your changes will not be saved. This action cannot be undone."
          cancelLabel="Cancel"
          confirmLabel="YES, GO BACK"
          onConfirm={() => router.push("/admin-portal")}
        />

        <ConfirmationDialog
          open={showRevertDialog}
          onClose={() => setShowRevertDialog(false)}
          title="Are You Sure?"
          body="Are you sure you want to revert all changes made? This action cannot be undone."
          cancelLabel="Cancel"
          confirmLabel="YES, REVERT"
          onConfirm={() => {
            handleRevert();
            setShowRevertDialog(false);
          }}
        />
      </div>
    </div>
  );
}

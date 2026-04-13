"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { onAuthStateChanged } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  type StorageReference,
  uploadBytes,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { Client } from "@/api/client";

import { getAllClients, updateClients } from "@/api/client";
import { AddCardDialog } from "@/components/admin-portal/AddCardDialog";
import { DraggableCollegeCard } from "@/components/admin-portal/DraggableSortableCard";
import { HeaderSection } from "@/components/admin-portal/HeaderSection";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { auth, storage } from "@/firebase/firebase";

type ClientItem = { id: string; _id?: string; name: string; imageUrl: string; file?: File };

export default function ClientLogosEditorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [originalClients, setOriginalClients] = useState<Client[]>([]);
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [showRevertDialog, setShowRevertDialog] = useState(false);
  const [showBackDialog, setShowBackDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        router.push("/login");
      } else {
        async function loadClients() {
          try {
            const fetched = await getAllClients();
            setOriginalClients(fetched);
            setClients(fetched.map((c) => ({ ...c, id: crypto.randomUUID() })));
          } catch (error) {
            console.error("Failed to fetch clients:", error);
          } finally {
            setLoading(false);
          }
        }
        void loadClients();
      }
    });
    return () => unsubscribe();
  }, [router]);

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>, id?: string) {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    const previewUrl = URL.createObjectURL(file);

    setClients((current) =>
      current.map((c) => (c.id === id ? { ...c, imageUrl: previewUrl, file } : c)),
    );

    e.target.value = "";
  }

  function handleAddClient(name: string, file: File) {
    const previewUrl = URL.createObjectURL(file as Blob);
    setClients((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        imageUrl: previewUrl,
        file,
      },
    ]);
  }

  const getStoragePathFromUrl = (url: string) => {
    const match = /\/o\/(.*?)\?/.exec(url);
    return match ? decodeURIComponent(match[1]) : null;
  };

  function handleDelete(id: string) {
    setClients((prev) => prev.filter((c) => c.id !== id));
  }

  function handleRevert() {
    setClients(originalClients.map((c) => ({ ...c, id: `revert-${c.name}` })));
  }

  async function handlePublish() {
    setIsPublishing(true);
    const newlyUploadedRefs: StorageReference[] = [];

    try {
      const finalData = await Promise.all(
        clients.map(async (client, index) => {
          let url = client.imageUrl;
          if (client.file) {
            const firebaseRef = storageRef(storage, `clients/${Date.now()}-${client.file.name}`);
            const snapshot = await uploadBytes(firebaseRef, client.file);
            url = await getDownloadURL(snapshot.ref);
            newlyUploadedRefs.push(snapshot.ref);
          }
          return {
            _id: originalClients.find((o) => o.name === client.name)?._id,
            name: client.name,
            imageUrl: url,
            order: index,
          };
        }),
      );

      await updateClients(finalData);

      const replacedUrls = clients
        .filter((c) => c.file)
        .map((c) => originalClients.find((o) => o.name === c.name)?.imageUrl)
        .filter(Boolean) as string[];

      await Promise.all(
        replacedUrls.map(async (url) => {
          const path = getStoragePathFromUrl(url);
          if (path) {
            const fileRef = storageRef(storage, path);
            await deleteObject(fileRef).catch(() => {});
          }
        }),
      );

      router.push("/admin-portal");
    } catch (error) {
      console.error("Critical Publish Error:", error);
      await Promise.all(newlyUploadedRefs.map(async (ref) => deleteObject(ref).catch(() => {})));
      setIsPublishing(false);
    }
  }

  const hasChanges =
    clients.length !== originalClients.length ||
    clients.some(
      (c, i) => c.name !== originalClients[i]?.name || c.imageUrl !== originalClients[i]?.imageUrl,
    );

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (hasChanges) e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setClients((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === active.id);
      const newIndex = prev.findIndex((c) => c.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  if (loading) return null;

  return (
    <div className="bg-white min-h-screen">
      <HeaderSection
        title="Client Logos"
        tags={["ABOUT US"]}
        description="Replace client logos, reorder by dragging, or add/remove logos."
        onBack={() => (hasChanges ? setShowBackDialog(true) : router.push("/admin-portal"))}
      />

      <div className="px-[100px] py-[50px]">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={clients.map((c) => c.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(314px,1fr))] gap-[25px]">
              {clients.map((client) => (
                <DraggableCollegeCard
                  key={client.id}
                  id={client.id}
                  name={client.name}
                  imageUrl={client.imageUrl}
                  onDelete={handleDelete}
                  onReplace={(e) => handleImageSelect(e, client.id)}
                />
              ))}
              <div className="border border-[#C7C7C7] rounded-[10px] flex flex-col overflow-hidden p-[10px] gap-[10px] w-[314px] h-[250px]">
                <div
                  className="flex-1 min-h-0 rounded-[9px] overflow-hidden bg-[#C7C7C7] flex items-center justify-center cursor-pointer"
                  onClick={() => setShowAddDialog(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M16.25 7.5C16.25 6.80964 15.6904 6.25 15 6.25C14.3096 6.25 13.75 6.80964 13.75 7.5V13.75H7.5C6.80964 13.75 6.25 14.3096 6.25 15C6.25 15.6904 6.80964 16.25 7.5 16.25H13.75V22.5C13.75 23.1904 14.3096 23.75 15 23.75C15.6904 23.75 16.25 23.1904 16.25 22.5V16.25H22.5C23.1904 16.25 23.75 15.6904 23.75 15C23.75 14.3096 23.1904 13.75 22.5 13.75H16.25V7.5Z"
                      fill="#5D5D5D"
                    />
                  </svg>
                </div>
                <div className="flex items-center p-[10px]">
                  <p className="text-[24px] font-medium text-[#1E1E1E]">Add Client</p>
                </div>
              </div>
            </div>
          </SortableContext>
        </DndContext>

        <div className="flex gap-[25px] items-center justify-end mt-[50px]">
          <button
            type="button"
            onClick={() => setShowRevertDialog(true)}
            disabled={!hasChanges || isPublishing}
            className={`bg-[#F4F4F4] border border-[#C7C7C7] flex items-center justify-center px-[20px] py-[10px] rounded-[99px] font-dm-sans text-[16px] transition-colors ${
              hasChanges && !isPublishing
                ? "text-[#1E1E1E] cursor-pointer hover:bg-[#ECECEC]"
                : "text-[#C7C7C7] cursor-not-allowed"
            }`}
          >
            Revert Changes
          </button>
          <button
            type="button"
            onClick={() => void handlePublish()}
            disabled={isPublishing}
            className="bg-[#3bb966] flex gap-[10px] items-center justify-center px-[20px] py-[10px] rounded-[99px] font-dm-sans font-semibold text-[16px] text-white cursor-pointer hover:bg-[#309854] transition-colors"
          >
            PUBLISH
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9 19.9C7.73333 19.7667 6.55417 19.4208 5.4625 18.8625C4.37083 18.3042 3.42083 17.5792 2.6125 16.6875C1.80417 15.7958 1.16667 14.775 0.7 13.625C0.233333 12.475 0 11.25 0 9.95C0 8.43333 0.304167 7.03333 0.9125 5.75C1.52083 4.46667 2.35 3.36667 3.4 2.45H1V0.45H7V6.45H5V3.725C4.08333 4.45833 3.35417 5.3625 2.8125 6.4375C2.27083 7.5125 2 8.68333 2 9.95C2 12 2.67083 13.7708 4.0125 15.2625C5.35417 16.7542 7.01667 17.625 9 17.875V19.9ZM8.575 14.55L4.35 10.3L5.75 8.9L8.575 11.725L14.25 6.05L15.65 7.475L8.575 14.55ZM13 19.45V13.45H15V16.175C15.9167 15.425 16.6458 14.5167 17.1875 13.45C17.7292 12.3833 18 11.2167 18 9.95C18 7.9 17.3292 6.12917 15.9875 4.6375C14.6458 3.14583 12.9833 2.275 11 2.025V0C13.5333 0.25 15.6667 1.31667 17.4 3.2C19.1333 5.08333 20 7.33333 20 9.95C20 11.4667 19.6958 12.8667 19.0875 14.15C18.4792 15.4333 17.65 16.5333 16.6 17.45H19V19.45H13Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>

      <AddCardDialog
        key={Date.now()}
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={handleAddClient}
        toggleNote={false}
        title="Client"
      />

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
  );
}

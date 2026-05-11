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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { Client } from "@/api/client";
import type { StorageReference } from "firebase/storage";

import { getAllClients, updateClients } from "@/api/client";
import { AddCardDialog } from "@/components/admin-portal/AddCardDialog";
import { DraggableCollegeCard } from "@/components/admin-portal/DraggableSortableCard";
import { HeaderSection } from "@/components/admin-portal/HeaderSection";
import { PublishButton } from "@/components/admin-portal/PublishButton";
import { RevertButton } from "@/components/admin-portal/RevertButton";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { auth } from "@/firebase/firebase";
import { deleteFromStorageUrl, rollbackUploads, uploadToStorage } from "@/utils/firebaseStorage";

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
            url = await uploadToStorage(
              client.file,
              `clients/${Date.now()}-${client.file.name}`,
              newlyUploadedRefs,
            );
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

      await Promise.all(replacedUrls.map(deleteFromStorageUrl));

      router.push("/admin-portal");
    } catch (error) {
      console.error("Critical Publish Error:", error);
      await rollbackUploads(newlyUploadedRefs);
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
          <RevertButton
            handleClick={() => setShowRevertDialog(true)}
            disabled={!hasChanges || isPublishing}
          />
          <PublishButton
            handleClick={() => void handlePublish()}
            disabled={!hasChanges || isPublishing}
          />
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

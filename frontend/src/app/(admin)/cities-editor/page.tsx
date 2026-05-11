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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllCities, updateCities } from "@/api/cities";
import { DraggableSortablePill } from "@/components/admin-portal/DraggableSortablePill";
import { HeaderSection } from "@/components/admin-portal/HeaderSection";
import { PublishButton } from "@/components/admin-portal/PublishButton";
import { RevertButton } from "@/components/admin-portal/RevertButton";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { auth } from "@/firebase/firebase";

type CityItem = { id: string; name: string };

export default function CitiesEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [originalCities, setOriginalCities] = useState<string[]>([]);
  const [cities, setCities] = useState<CityItem[]>([]);
  const [addInput, setAddInput] = useState("");
  const [showRevertDialog, setShowRevertDialog] = useState(false);
  const [showBackDialog, setShowBackDialog] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        router.push("/login");
      } else {
        async function loadCities() {
          try {
            const fetched = await getAllCities();
            setOriginalCities(fetched);
            setCities(fetched.map((name) => ({ id: crypto.randomUUID(), name })));
          } catch (error) {
            console.error("Failed to fetch cities:", error);
          } finally {
            setLoading(false);
          }
        }
        void loadCities();
      }
    });
    return () => unsubscribe();
  }, [router]);

  function handleNameChange(id: string, name: string) {
    setCities((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  }

  function handleDelete(id: string) {
    setCities((prev) => prev.filter((c) => c.id !== id));
  }

  function handleAddCity() {
    const trimmed = addInput.trim();
    if (!trimmed) return;
    setCities((prev) => [...prev, { id: crypto.randomUUID(), name: trimmed }]);
    setAddInput("");
  }

  function handleRevert() {
    setCities(originalCities.map((name, i) => ({ id: `revert-${i}`, name })));
  }

  async function handlePublish() {
    setIsPublishing(true);
    try {
      await updateCities(cities.map((c) => c.name));
      router.push("/admin-portal");
    } catch (error) {
      console.error("Failed to publish cities:", error);
      setIsPublishing(false);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setCities((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === active.id);
      const newIndex = prev.findIndex((c) => c.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  const hasChanges =
    cities.length !== originalCities.length || cities.some((c, i) => c.name !== originalCities[i]);

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (hasChanges) e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  if (loading) return null;

  return (
    <div className="bg-white min-h-screen">
      <HeaderSection
        title="Rotating Cities"
        tags={["HOME"]}
        description="Edit city names by clicking into the text box, reorder by dragging, or add/delete cities."
        onBack={() => (hasChanges ? setShowBackDialog(true) : router.push("/admin-portal"))}
      />

      <div className="flex flex-col items-center px-[100px] py-[50px]">
        <div className="flex flex-col gap-[25px] w-[425px]">
          <div className="flex flex-col gap-[10px]">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={cities.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                {cities.map((city) => (
                  <DraggableSortablePill key={city.id} id={city.id} onDelete={handleDelete}>
                    <input
                      aria-label={`Item: ${city.name}`}
                      className="bg-[#F4F4F4] border border-[#C7C7C7] px-[15px] py-[10px] rounded-[8px] w-full font-dm-sans text-[16px] text-[#1e1e1e] outline-none"
                      value={city.name}
                      onChange={(e) => handleNameChange(city.id, e.target.value)}
                    />
                  </DraggableSortablePill>
                ))}
              </SortableContext>
            </DndContext>
            <div className="bg-white flex gap-[10px] items-center px-[10px] py-[5px] rounded-[10px] w-full">
              <button
                type="button"
                onClick={handleAddCity}
                className={`shrink-0 size-[24px] flex items-center justify-center text-[#C7C7C7] ${
                  addInput.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                aria-label="Add city"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-[24px]">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </button>
              <input
                aria-label="New city name"
                className="bg-[#F4F4F4] border border-[#C7C7C7] px-[15px] py-[10px] rounded-[8px] w-[337px] font-dm-sans text-[16px] text-[#5D5D5D] font-normal outline-none"
                placeholder="Add City"
                value={addInput}
                onChange={(e) => setAddInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCity();
                }}
              />
            </div>
          </div>

          <div className="flex gap-[25px] items-center justify-end">
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
      </div>

      <ConfirmationDialog
        open={showBackDialog}
        onClose={() => setShowBackDialog(false)}
        title="Are You Sure?"
        body="Are you sure you want to go back? Your changes will not be saved. This action cannot be de undone."
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

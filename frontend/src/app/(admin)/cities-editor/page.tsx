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
      <header className="border-b border-[#C7C7C7] flex flex-col gap-[10px] items-start justify-center px-[100px] py-[50px]">
        <button
          type="button"
          aria-label="Go back to admin portal"
          onClick={() => (hasChanges ? setShowBackDialog(true) : router.push("/admin-portal"))}
          className="group flex gap-[10px] items-center cursor-pointer py-[12px] pr-[15px] transition-transform duration-350 hover:-translate-x-2"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="#1e1e1e"
            className="size-[24px] transition-transform duration-350 group-hover:-translate-x-1"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <span className="font-dm-sans font-semibold text-[16px] text-[#1E1E1E]">BACK</span>
        </button>

        <div className="flex items-center justify-between w-full">
          <h1 className="font-dm-sans font-medium text-[32px] text-[#1E1E1E] tracking-[-0.64px]">
            Rotating Cities
          </h1>
          <button
            type="button"
            disabled
            className="bg-[#012060] flex gap-[10px] items-center justify-center px-[20px] py-[10px] rounded-[99px] cursor-pointer"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="white" className="size-[32px]">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span className="font-dm-sans font-semibold text-[16px] text-white">PREVIEW</span>
          </button>
        </div>

        <div className="bg-[#F4F4F4] px-[10px] py-[5px] rounded-[10px]">
          <span className="font-dm-sans font-semibold text-[12px] text-[#5d5d5d]">HOME</span>
        </div>

        <p className="font-dm-sans text-[14px] text-[#5D5D5D] leading-[20px]">
          Edit city names by clicking into the text box, reorder by dragging, or add/delete cities.
        </p>
      </header>

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

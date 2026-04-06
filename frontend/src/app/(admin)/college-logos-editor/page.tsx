"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { College } from "@/api/colleges";

import { getAllColleges, updateColleges } from "@/api/colleges";
import { HeaderSection } from "@/components/admin-portal/HeaderSection";
import { auth } from "@/firebase/firebase";

type CollegeItem = { id: string; name: string; imageUrl: string };

export default function CollegeLogosEditorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [originalColleges, setOriginalColleges] = useState<College[]>([]);
  const [colleges, setColleges] = useState<CollegeItem[]>([]);
  const [addNameInput, setAddNameInput] = useState("");
  const [addImageInput, setAddImageInput] = useState("");
  const [showRevertDialog, setShowRevertDialog] = useState(false);
  const [showBackDialog, setShowBackDialog] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        router.push("/login");
      } else {
        async function loadColleges() {
          try {
            const fetched = await getAllColleges();
            setOriginalColleges(fetched);
            setColleges(fetched.map((c) => ({ ...c, id: crypto.randomUUID() })));
          } catch (error) {
            console.error("Failed to fetch colleges:", error);
          } finally {
            setLoading(false);
          }
        }
        void loadColleges();
      }
    });
    return () => unsubscribe();
  }, [router]);

  function handleNameChange(id: string, name: string) {
    setColleges((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  }

  function handleImageChange(id: string, imageUrl: string) {
    setColleges((prev) => prev.map((c) => (c.id === id ? { ...c, imageUrl } : c)));
  }

  function handleDelete(id: string) {
    setColleges((prev) => prev.filter((c) => c.id !== id));
  }

  function handleAddCollege() {
    const trimmedName = addNameInput.trim();
    const trimmedImage = addImageInput.trim();
    if (!trimmedName || !trimmedImage) return;
    setColleges((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: trimmedName, imageUrl: trimmedImage },
    ]);
    setAddNameInput("");
    setAddImageInput("");
  }

  function handleRevert() {
    setColleges(originalColleges.map((c) => ({ ...c, id: `revert-${c.name}` })));
  }

  async function handlePublish() {
    setIsPublishing(true);
    try {
      await updateColleges(colleges.map(({ name, imageUrl }) => ({ name, imageUrl })));
      router.push("/admin-portal");
    } catch (error) {
      console.error("Failed to update colleges:", error);
      setIsPublishing(false);
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <HeaderSection
        title="College Logos"
        tags={["MEET THE TEAM"]}
        description="Replace college logos, reorder by dragging, or add/remove logos."
        onBack={() => router.push("/admin-portal")} // fix this later
      />
      <div className="flex flex-col items-start px-[100px] py-[50px]"></div>
    </div>
  );
}

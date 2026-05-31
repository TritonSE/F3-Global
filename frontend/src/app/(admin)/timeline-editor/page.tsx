"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { StorageReference } from "firebase/storage";

import { getTimelines, type TimelineItem, updateTimeline } from "@/api/timeline";
import { HeaderSection } from "@/components/admin-portal/HeaderSection";
import { PreviewMode } from "@/components/admin-portal/preview-components/PreviewMode";
import { PreviewNavBar } from "@/components/admin-portal/preview-components/PreviewNavBar";
import { PublishButton } from "@/components/admin-portal/PublishButton";
import { RevertButton } from "@/components/admin-portal/RevertButton";
import { TimelineCard } from "@/components/admin-portal/TimelineCard";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { TimelineDisplay } from "@/components/timeline-section/TimelineDisplay";
import { deleteFromStorageUrl, rollbackUploads, uploadToStorage } from "@/utils/firebaseStorage";

export default function TimelineEditorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [originalTimelines, setOriginalTimelines] = useState<TimelineItem[]>([]);
  const [timelines, setTimelines] = useState<TimelineItem[]>([]);
  const [showRevertDialog, setShowRevertDialog] = useState(false);
  const [showBackDialog, setShowBackDialog] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    async function loadTimelines() {
      try {
        const fetched = await getTimelines();
        setOriginalTimelines(fetched);
        setTimelines(fetched);
      } catch (error) {
        console.error("Failed to fetch timelines:", error);
      } finally {
        setLoading(false);
      }
    }
    void loadTimelines();
  }, []);

  const hasChanges = timelines.some(
    (t, i) =>
      t.newImage ||
      t.year !== originalTimelines[i]?.year ||
      t.description !== originalTimelines[i]?.description ||
      t.imageUrl !== originalTimelines[i]?.imageUrl,
  );

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (hasChanges) e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  function handleChange(id: string, updated: Partial<TimelineItem>) {
    setTimelines((prev) => prev.map((t) => (t._id === id ? { ...t, ...updated } : t)));
  }

  function handleRevert() {
    setTimelines(originalTimelines);
  }

  async function handlePublish() {
    setIsPublishing(true);
    const newlyUploadedRefs: StorageReference[] = [];

    try {
      const finalData = await Promise.all(
        timelines.map(async (item) => {
          let url = item.imageUrl;
          if (item.newImage) {
            url = await uploadToStorage(
              item.newImage,
              `timeline/${Date.now()}-${item.newImage.name}`,
              newlyUploadedRefs,
            );
          }
          const { newImage: _newImage, ...rest } = item;
          return { ...rest, imageUrl: url };
        }),
      );

      await updateTimeline(finalData);

      const replacedUrls = timelines
        .filter((t) => t.newImage)
        .map((t) => originalTimelines.find((o) => o._id === t._id)?.imageUrl)
        .filter(Boolean) as string[];

      await Promise.all(replacedUrls.map(deleteFromStorageUrl));

      router.push("/admin-portal");
    } catch (error) {
      console.error("Critical Publish Error:", error);
      await rollbackUploads(newlyUploadedRefs);
      setIsPublishing(false);
    }
  }

  const publishButton = (
    <PublishButton
      handleClick={() => void handlePublish()}
      disabled={!hasChanges || isPublishing}
    />
  );

  if (loading) return null;

  if (isPreview) {
    return (
      <PreviewMode onBack={() => setIsPreview(false)} publishButton={publishButton}>
        <div className="bg-white rounded-[10px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.1)] w-full">
          <PreviewNavBar activeItem="About Us" />
          <TimelineDisplay items={timelines.map(({ newImage: _newImage, ...rest }) => rest)} />
        </div>
      </PreviewMode>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <HeaderSection
        title="About Us Timeline"
        tags={["ABOUT US"]}
        description="Edit timeline information including year, description and photo."
        onBack={() => (hasChanges ? setShowBackDialog(true) : router.push("/admin-portal"))}
        onPreview={() => setIsPreview(true)}
      />

      <div className="flex flex-col px-[100px] py-[50px] justify-center items-center gap-[50px]">
        {timelines.map((item, i) => (
          <TimelineCard key={item._id} index={i} item={item} onChange={handleChange} />
        ))}
      </div>

      <div className="flex gap-[25px] items-center justify-end px-[100px] pb-[50px]">
        <RevertButton
          handleClick={() => setShowRevertDialog(true)}
          disabled={!hasChanges || isPublishing}
        />
        {publishButton}
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
  );
}

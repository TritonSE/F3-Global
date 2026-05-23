"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PreviewMode } from "@/components/admin-portal/preview-components/PreviewMode";
import { PreviewNavBar } from "@/components/admin-portal/preview-components/PreviewNavBar";
import { PublishButton } from "@/components/admin-portal/PublishButton";
import { Highlights } from "@/components/Highlights";
import { auth } from "@/firebase/firebase";

export default function ClientHighlightsPreview() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return null;

  return (
    <PreviewMode
      onBack={() => {
        router.push("/client-highlights-editor");
      }}
      publishButton={
        <PublishButton
          handleClick={() => {
            router.push("/admin-portal");
          }}
          disabled={false}
        />
      }
    >
      <div className="bg-white rounded-[10px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.1)] w-full">
        <PreviewNavBar activeItem="Get Involved" />
        <Highlights />
      </div>
    </PreviewMode>
  );
}

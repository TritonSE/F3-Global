"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getNewsletters, incrementNewsletterViews, type Newsletter } from "@/api/newsletters";

export default function NewsletterDetailPage() {
  const router = useRouter();
  const params = useParams();
  const newsletterId = params.newsletter_id as string;

  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [relatedNewsletters, setRelatedNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  // Fetch newsletters and increment view count
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setLoading(true);
        const response = await getNewsletters(1);
        const allNewsletters = response.data;

        // Find current newsletter
        const current = allNewsletters.find((n) => n._id === newsletterId);
        if (!current) {
          setError("Newsletter not found");
          setLoading(false);
          return;
        }

        setNewsletter(current);

        // Get 3 most recent (excluding current)
        const related = allNewsletters
          .filter((n) => n._id !== newsletterId)
          .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
          .slice(0, 3);

        setRelatedNewsletters(related);

        // Fire-and-forget view increment (don't block page load)
        void incrementNewsletterViews(newsletterId).catch((e) => {
          console.error("Failed to increment views:", e);
        });
      } catch (err) {
        console.error("Failed to fetch newsletter:", err);
        setError("Failed to load newsletter");
      } finally {
        setLoading(false);
      }
    };

    void fetchNewsletters();
  }, [newsletterId]);

  // Close share menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShareMenuOpen(false);
      }
    }

    if (shareMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [shareMenuOpen]);

  const handleShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = newsletter?.title || "Check out this article";

    switch (platform) {
      case "email":
        window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`);
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        );
        break;
      case "copy":
        void navigator.clipboard
          .writeText(url)
          .then(() => setCopyStatus("Link copied to clipboard"))
          .catch(() => setCopyStatus("Failed to copy link"));
        break;
    }
    setShareMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#012060] mx-auto"></div>
          <p className="mt-4 text-[#5D5D5D]">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !newsletter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#172447]">{error || "Article not found"}</h2>
          <button
            onClick={() => router.push("/newsletters")}
            className="mt-6 px-6 py-2 bg-[#012060] text-white rounded-[99px] hover:bg-[#012060]/90"
          >
            Back to Newsletters
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(newsletter.uploadDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Back Button */}
      <div className="px-[100px] pt-[40px] pb-[12px]">
        <button
          onClick={() => router.push("/newsletters")}
          className="flex items-center gap-[10px] text-[#1E1E1E] hover:text-[#012060] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm font-medium">BACK</span>
        </button>
      </div>

      {/* Article Header */}
      <div className="px-[200px] pt-[20px] pb-[28px]">
        <div className="max-w-[1120px]">
          <p className="text-sm text-[#5D5D5D] mb-4">Article</p>

          <h1
            style={{ fontFamily: '"Ethic New", sans-serif' }}
            className="font-[300] text-[64px] leading-[150%] text-[#172447]"
          >
            {newsletter.title}
          </h1>

          {/* Metadata and Share */}
          <div className="mt-[24px] flex items-center gap-6">
            <div className="flex items-center gap-2 text-[16px] font-[400] leading-[24px] text-[#5D5D5D]">
              <span>Posted on {formattedDate}</span>
              <span>•</span>
              <span>Share</span>
            </div>
            {copyStatus && <span className="text-sm text-[#5D5D5D]">{copyStatus}</span>}

            {/* Share Button */}
            <div className="relative ml-auto" ref={shareMenuRef}>
              <button
                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                className="p-2 hover:bg-[#F4F4F4] rounded-full transition-colors"
                aria-label="Share"
              >
                <svg
                  className="w-6 h-6 text-[#1E1E1E]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-2l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>

              {/* Share Menu */}
              {shareMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-[#C7C7C7] rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => handleShare("email")}
                    className="w-full text-left px-4 py-3 hover:bg-[#F4F4F4] text-sm text-[#1E1E1E] border-b border-[#E0E0E0]"
                  >
                    Email
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="w-full text-left px-4 py-3 hover:bg-[#F4F4F4] text-sm text-[#1E1E1E] border-b border-[#E0E0E0]"
                  >
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="w-full text-left px-4 py-3 hover:bg-[#F4F4F4] text-sm text-[#1E1E1E] border-b border-[#E0E0E0]"
                  >
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="w-full text-left px-4 py-3 hover:bg-[#F4F4F4] text-sm text-[#1E1E1E]"
                  >
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-[200px] pb-[32px]">
        <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src="/imgs/newsletter-placeholder.png"
            alt={newsletter.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <div className="px-[200px] pb-[32px]">
        <div className="max-w-[1120px]">
          <div className="mb-8 max-w-4xl">
            <h3 className="font-dm-sans font-[700] text-[28px] leading-[42px] tracking-[-0.56px] text-[#1E1E1E] mb-4">
              {newsletter.authorName}
            </h3>
            <p className="font-dm-sans text-[16px] font-[400] leading-[24px] text-[#1E1E1E]">
              {newsletter.blurb}
            </p>
          </div>

          {/* Read Full Article Button */}
          <a
            href={newsletter.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#012060] text-white rounded-[99px] font-dm-sans font-semibold hover:bg-[#012060]/90 transition-colors"
          >
            Read Full Article
          </a>
        </div>
      </div>

      {/* You May Also Like */}
      {relatedNewsletters.length > 0 && (
        <div className="px-[100px] pt-[50px] pb-[48px]">
          <h2 className="font-dm-sans font-[700] text-[32px] leading-[150%] tracking-[-0.64px] text-[#1E1E1E] mb-[20px]">
            You May Also Like
          </h2>

          <div className="grid grid-cols-3 gap-[24px]">
            {relatedNewsletters.map((article) => (
              <button
                key={article._id}
                onClick={() => router.push(`/newsletters/${article._id}`)}
                className="group cursor-pointer text-left transition-transform hover:scale-105"
              >
                <div className="relative w-full h-48 bg-gray-300 rounded-lg overflow-hidden mb-4">
                  <Image
                    src="/imgs/newsletter-placeholder.png"
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-dm-sans font-medium text-[16px] text-[#1E1E1E] line-clamp-2 group-hover:text-[#012060]">
                  {article.title}
                </h3>
                <p className="font-dm-sans text-[12px] text-[#5D5D5D] mt-2">
                  {new Date(article.uploadDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getNewsletters, incrementNewsletterViews, type Newsletter } from "@/api/newsletters";

type SharePlatform = "linkedin" | "facebook" | "x" | "email";

export default function NewsletterDetailPage() {
  const router = useRouter();
  const params = useParams();
  const newsletterId = params.newsletter_id as string;

  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [relatedNewsletters, setRelatedNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [pendingShareLink, setPendingShareLink] = useState<string | null>(null);

  // Fetch newsletters and increment view count
  useEffect(() => {
    let isActive = true;
    setLoading(true);

    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const response = await getNewsletters({ page: 1, limit: 100 });
          const allNewsletters = response.data;

          // Find current newsletter
          const current = allNewsletters.find((n) => n._id === newsletterId);
          if (!current) {
            if (isActive) {
              setError("Newsletter not found");
            }
            return;
          }

          if (isActive) {
            setNewsletter(current);

            // Get 3 most recent (excluding current)
            const related = allNewsletters
              .filter((n) => n._id !== newsletterId)
              .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
              .slice(0, 3);

            setRelatedNewsletters(related);
          }

          // Fire-and-forget view increment (don't block page load)
          void incrementNewsletterViews(newsletterId)
            .then((updatedNewsletter) => {
              if (isActive && updatedNewsletter) {
                setNewsletter(updatedNewsletter);
              }
            })
            .catch((e) => {
              console.error("Failed to increment views:", e);
            });
        } catch (err) {
          console.error("Failed to fetch newsletter:", err);
          if (isActive) {
            setError("Failed to load newsletter");
          }
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      })();
    }, 0);

    return () => {
      isActive = false;
      window.clearTimeout(timer);
    };
  }, [newsletterId]);

  const buildShareLink = (platform: SharePlatform) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = newsletter?.title || "Check out this article";

    switch (platform) {
      case "email":
        return `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      case "x":
        return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      default:
        return "";
    }
  };

  const handleShareClick = (platform: SharePlatform) => {
    const nextShareLink = buildShareLink(platform);
    setPendingShareLink(nextShareLink);
    setIsLeaveModalOpen(true);
  };

  const closeLeaveModal = () => {
    setPendingShareLink(null);
    setIsLeaveModalOpen(false);
  };

  const proceedToShare = () => {
    if (!pendingShareLink) return;

    if (pendingShareLink.startsWith("mailto:")) {
      window.location.href = pendingShareLink;
    } else {
      window.open(pendingShareLink, "_blank", "noopener,noreferrer");
    }

    closeLeaveModal();
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
      <div className="px-[15px] md:px-[100px] pt-[60px] md:pt-[80px] pb-[12px]">
        <button
          onClick={() => router.push("/newsletters")}
          className="group flex cursor-pointer items-center gap-[10px] px-[15px] py-[12px] text-[#1E1E1E] transition-colors"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6"
          >
            <path
              d="M10.7314 20.3313C10.4314 20.6313 10.0245 20.7998 9.6002 20.7998C9.17593 20.7998 8.76904 20.6313 8.469 20.3313L1.269 13.1313C0.969043 12.8313 0.800538 12.4244 0.800538 12.0001C0.800538 11.5759 0.969043 11.169 1.269 10.8689L8.469 3.66895C8.77076 3.3775 9.17492 3.21623 9.59444 3.21987C10.014 3.22352 10.4153 3.39179 10.7119 3.68844C11.0086 3.98509 11.1768 4.38639 11.1805 4.80591C11.1841 5.22542 11.0228 5.62958 10.7314 5.93135L6.4002 10.4001L21.6002 10.4001C22.0245 10.4001 22.4315 10.5687 22.7316 10.8688C23.0316 11.1688 23.2002 11.5758 23.2002 12.0001C23.2002 12.4245 23.0316 12.8315 22.7316 13.1315C22.4315 13.4316 22.0245 13.6001 21.6002 13.6001L6.4002 13.6001L10.7314 18.0689C11.0313 18.369 11.1999 18.7759 11.1999 19.2001C11.1999 19.6244 11.0313 20.0313 10.7314 20.3313Z"
              fill="#1E1E1E"
            />
          </svg>
          <span className="font-rubik text-[16px] leading-[24px] transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-[6px]">
            Back
          </span>
        </button>
      </div>

      {/* Article Header */}
      <div className="px-[30px] md:px-[200px] pt-[20px]">
        <div className="max-w-[1120px]">
          <p className="text-[14px] leading-[20px] md:text-sm md:leading-normal text-[#5D5D5D] mb-[20px] md:mb-4">
            Article
          </p>

          <h1
            style={{ fontFamily: '"Ethic New", sans-serif' }}
            className="font-[300] text-[36px] leading-[1.1] md:text-[64px] md:leading-[150%] text-[#172447] md:text-[#172447]"
          >
            {newsletter.title}
          </h1>

          {/* Metadata and Share */}
          <div className="mt-[20px] md:mt-[24px] flex items-center gap-6">
            <div className="flex items-center gap-2 text-[12px] leading-[16px] md:text-[16px] md:leading-[24px] font-[400] text-[#5D5D5D]">
              <span>Posted on {formattedDate}</span>
              <Image src="/imgs/Ellipse%202.svg" alt="" aria-hidden="true" width={8} height={8} />
              <div className="group/share relative inline-flex items-center">
                <button
                  type="button"
                  aria-label="Show share options"
                  className="font-rubik md:font-dm-sans inline-flex items-center gap-2 text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] text-[#1E1E1E] md:text-[#2F2F2F] no-underline underline-offset-2 group-hover/share:underline group-focus-within/share:underline"
                >
                  Share
                  <Image src="/imgs/share.svg" alt="Share" width={24} height={24} />
                </button>
                <div className="pointer-events-none absolute top-full left-0 md:left-full md:top-1/2 flex md:-translate-y-1/2 items-center gap-0 pt-3 md:pt-0 md:pl-4 opacity-0 transition-opacity duration-200 group-hover/share:pointer-events-auto group-hover/share:opacity-100 group-focus-within/share:pointer-events-auto group-focus-within/share:opacity-100 z-10">
                  <div className="relative flex items-center gap-3 rounded-full bg-[#F3F3F3] px-4 py-2">
                    <Image
                      src="/imgs/triangle.svg"
                      alt=""
                      aria-hidden="true"
                      width={16}
                      height={16}
                      className="pointer-events-none absolute left-[-10px] top-1/2 -translate-y-1/2 hidden md:block"
                    />
                    <button
                      type="button"
                      aria-label="Share on LinkedIn"
                      onClick={() => handleShareClick("linkedin")}
                      className="rounded-full p-1 transition-transform hover:scale-110"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-[#1E1E1E]"
                        fill="currentColor"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Share on Facebook"
                      onClick={() => handleShareClick("facebook")}
                      className="rounded-full p-1 transition-transform hover:scale-110"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-[#1E1E1E]"
                        fill="currentColor"
                      >
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Share on X"
                      onClick={() => handleShareClick("x")}
                      className="rounded-full p-1 transition-transform hover:scale-110"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 14 14"
                        className="h-5 w-5 text-[#1E1E1E]"
                        fill="currentColor"
                      >
                        <g fill="none">
                          <g clipPath="url(#twitterClip)">
                            <path
                              d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"
                              fill="currentColor"
                            />
                          </g>
                          <defs>
                            <clipPath id="twitterClip">
                              <path fill="#fff" d="M0 0h14v14H0z" />
                            </clipPath>
                          </defs>
                        </g>
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Share by email"
                      onClick={() => handleShareClick("email")}
                      className="rounded-full p-1 transition-transform hover:scale-110"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-[#1E1E1E]"
                        fill="currentColor"
                      >
                        <path d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-[30px] md:px-[200px] py-[50px]">
        <div className="relative w-full aspect-[342/158] md:w-[1112px] md:h-[464px] md:aspect-auto bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={newsletter.imageUrl || "/imgs/newsletter-placeholder.png"}
            alt={newsletter.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <div className="px-[30px] md:px-[200px] pb-[32px]">
        <div className="max-w-[1120px]">
          <div className="mb-[20px] md:mb-8 max-w-4xl">
            <h3 className="font-dm-sans font-bold md:font-[700] text-[18px] leading-[27px] tracking-[-0.36px] md:text-[28px] md:leading-[42px] md:tracking-[-0.56px] text-[#1E1E1E] mb-[20px] md:mb-4">
              {newsletter.authorName}
            </h3>
            <p className="font-dm-sans text-[12px] leading-[16px] md:text-[16px] md:leading-[24px] font-[400] text-[#1E1E1E]">
              {newsletter.blurb}
            </p>
          </div>

          {/* Read Full Article Button */}
          <a
            href={newsletter.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-[15px] py-[10px] md:px-6 md:py-3 bg-[#012060] text-white rounded-[99px] font-dm-sans font-semibold text-[12px] uppercase md:text-base md:normal-case hover:bg-[#1169B0] transition-colors"
          >
            Read Full Article
          </a>
        </div>
      </div>

      {/* You May Also Like */}
      {relatedNewsletters.length > 0 && (
        <div className="px-[30px] md:px-[100px] pt-[30px] md:pt-[50px] pb-[50px] md:pb-[48px]">
          <h2 className="font-dm-sans font-medium md:font-[700] text-[28px] leading-[1.5] tracking-[-0.56px] md:text-[32px] md:leading-[150%] md:tracking-[-0.64px] text-[#1E1E1E] mb-[20px] md:mb-[20px]">
            You May Also Like
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-[20px] gap-x-[24px] md:gap-[24px]">
            {relatedNewsletters.map((article) => (
              <button
                key={article._id}
                onClick={() => router.push(`/newsletters/${article._id}`)}
                className="group cursor-pointer text-left transition-transform hover:scale-105"
              >
                <div className="relative w-full aspect-[342/249] md:aspect-auto md:h-48 bg-gray-300 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={article.imageUrl || "/imgs/newsletter-placeholder.png"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between text-[12px] font-medium text-[#5D5D5D] mb-2">
                  <div className="flex items-center gap-2">
                    <span>
                      {new Date(article.uploadDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <Image
                      src="/imgs/Ellipse%202.svg"
                      alt=""
                      aria-hidden="true"
                      width={8}
                      height={8}
                      className="text-[#A5D0F2]"
                      style={{ color: "#A5D0F2" }}
                    />
                    <span>Article</span>
                  </div>
                  <span>
                    {article.views} {article.views === 1 ? "view" : "views"}
                  </span>
                </div>
                <h3 className="font-dm-sans font-normal md:font-medium text-[16px] text-[#1E1E1E] line-clamp-2 group-hover:text-[#012060]">
                  {article.title}
                </h3>
              </button>
            ))}
          </div>
        </div>
      )}

      {isLeaveModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#172447]/70 px-4"
          onClick={closeLeaveModal}
        >
          <div
            className="relative w-[250px] md:w-full md:max-w-[760px] rounded-[10px] md:rounded-[12px] bg-white px-[30px] pb-[32px] pt-[32px] md:px-8 md:pb-8 md:pt-9 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close dialog"
              onClick={closeLeaveModal}
              className="absolute right-[20px] top-[22px] md:right-6 md:top-6 text-[#1E1E1E] transition-colors hover:text-[#012060]"
            >
              <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="mx-auto mb-[20px] md:mb-8 flex h-[40px] w-[40px] md:h-[50px] md:w-[50px] items-center justify-center rounded-full bg-[#9CC8EA]">
              <svg
                aria-hidden="true"
                className="h-[24px] w-[24px] md:h-7 md:w-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M12 7v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="12" cy="17.5" r="1.2" fill="currentColor" />
              </svg>
            </div>

            <h2 className="font-dm-sans text-[16px] leading-[24px] font-normal tracking-normal md:text-[42px] md:leading-[56px] md:font-medium md:tracking-[-0.8px] text-[#1E2B59]">
              You are about to leave our website
            </h2>
            <p
              style={{ fontFamily: "'Rubik', sans-serif" }}
              className="mx-auto mt-[20px] md:mt-6 max-w-full md:max-w-[640px] text-[12px] leading-[16px] md:font-dm-sans md:text-[16px] md:leading-[150%] text-[#5D5D5D]"
            >
              You selected a link to an external site. F3 Global is not responsible for the
              third-party website&apos;s availability, content, products or services. Please refer
              to the external website&apos;s terms, privacy and security policies for details and
              applicability.
            </p>

            <div className="mt-[20px] md:mt-8 flex items-center justify-center gap-[20px] md:gap-5">
              <button
                type="button"
                onClick={closeLeaveModal}
                className="rounded-[99px] border-[1.5px] border-[#C7C7C7] md:border md:border-[#1E2B59] px-[15px] py-[10px] md:px-8 md:py-2 font-dm-sans text-[12px] font-semibold uppercase md:text-[16px] md:font-normal md:normal-case text-[#1E2B59] transition-colors hover:bg-[#F4F4F4]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={proceedToShare}
                className="rounded-[99px] bg-[#1E2B59] px-[15px] py-[10px] md:px-8 md:py-2 font-dm-sans text-[12px] font-semibold uppercase md:text-[16px] md:font-medium md:normal-case text-white transition-colors hover:bg-[#16224A]"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

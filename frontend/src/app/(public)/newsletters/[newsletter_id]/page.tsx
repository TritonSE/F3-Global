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
        return `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      case "x":
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
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
    <div className="pt-[60px] md:pt-0 bg-white min-h-screen">
      {/* Back Button */}
      <div className="px-[15px] md:px-[100px] pt-[42px] md:pt-[40px] pb-[12px]">
        <button
          onClick={() => router.push("/newsletters")}
          className="group flex cursor-pointer items-center gap-[10px] text-[#1E1E1E] transition-colors"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="hidden md:block w-6 h-6"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="md:hidden"
          >
            <path
              d="M10.7314 20.3313C10.4314 20.6313 10.0245 20.7998 9.6002 20.7998C9.17593 20.7998 8.76904 20.6313 8.469 20.3313L1.269 13.1313C0.969043 12.8313 0.800538 12.4244 0.800538 12.0001C0.800538 11.5759 0.969043 11.169 1.269 10.8689L8.469 3.66895C8.77076 3.3775 9.17492 3.21623 9.59444 3.21987C10.014 3.22352 10.4153 3.39179 10.7119 3.68844C11.0086 3.98509 11.1768 4.38639 11.1805 4.80591C11.1841 5.22542 11.0228 5.62958 10.7314 5.93135L6.4002 10.4001L21.6002 10.4001C22.0245 10.4001 22.4315 10.5687 22.7316 10.8688C23.0316 11.1688 23.2002 11.5758 23.2002 12.0001C23.2002 12.4245 23.0316 12.8315 22.7316 13.1315C22.4315 13.4316 22.0245 13.6001 21.6002 13.6001L6.4002 13.6001L10.7314 18.0689C11.0313 18.369 11.1999 18.7759 11.1999 19.2001C11.1999 19.6244 11.0313 20.0313 10.7314 20.3313Z"
              fill="#1E1E1E"
            />
          </svg>
          <span className="text-[16px] md:text-sm font-medium transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-[6px] md:uppercase">
            Back
          </span>
        </button>
      </div>

      {/* Article Header */}
      <div className="px-[30px] md:px-[200px] pt-[30px] md:pt-[20px] pb-[50px] md:pb-[28px]">
        <div className="max-w-[1120px]">
          <p className="text-sm text-[#5D5D5D] mb-[20px] md:mb-4">Article</p>

          <h1
            style={{ fontFamily: '"Ethic New", sans-serif' }}
            className="font-[300] text-[36px] md:text-[64px] leading-[1.1] md:leading-[150%] text-[#1E1E1E] md:text-[#172447]"
          >
            {newsletter.title}
          </h1>

          {/* Metadata and Share */}
          <div className="mt-[20px] md:mt-[24px] flex items-center gap-6">
            <div className="flex items-center gap-2 text-[12px] md:text-[16px] font-[400] leading-[16px] md:leading-[24px] text-[#5D5D5D]">
              <span>Posted on {formattedDate}</span>
              <Image src="/imgs/Ellipse%202.svg" alt="" aria-hidden="true" width={8} height={8} />
              <div className="group/share relative inline-flex items-center">
                <button
                  type="button"
                  aria-label="Show share options"
                  className="inline-flex items-center gap-2 text-[#2F2F2F] text-[14px] md:text-base no-underline underline-offset-2 group-hover/share:underline group-focus-within/share:underline"
                >
                  Share
                  <Image src="/imgs/share.svg" alt="Share" width={24} height={24} />
                </button>
                <div className="pointer-events-none absolute left-0 -translate-x-0.5 top-full pt-2 md:left-full md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:pl-4 md:pt-0 flex items-center gap-0 opacity-0 transition-opacity duration-200 group-hover/share:pointer-events-auto group-hover/share:opacity-100 group-focus-within/share:pointer-events-auto group-focus-within/share:opacity-100">
                  <div className="relative flex items-center gap-[10px] md:gap-3 rounded-full bg-[#F3F3F3] px-[20px] md:px-4 py-2">
                    <Image
                      src="/imgs/triangle.svg"
                      alt=""
                      aria-hidden="true"
                      width={16}
                      height={16}
                      className="pointer-events-none absolute left-[40px] top-[-9px] -translate-x-1/2 rotate-90 md:left-[-10px] md:top-1/2 md:-translate-x-0 md:-translate-y-1/2 md:rotate-0"
                    />
                    <button
                      type="button"
                      aria-label="Share on LinkedIn"
                      onClick={() => handleShareClick("linkedin")}
                      className="rounded-full md:p-1 transition-transform hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M16 0C16.5304 0 17.0391 0.210714 17.4142 0.585786C17.7893 0.960859 18 1.46957 18 2V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H16ZM15.5 15.5V10.2C15.5 9.33539 15.1565 8.5062 14.5452 7.89483C13.9338 7.28346 13.1046 6.94 12.24 6.94C11.39 6.94 10.4 7.46 9.92 8.24V7.13H7.13V15.5H9.92V10.57C9.92 9.8 10.54 9.17 11.31 9.17C11.6813 9.17 12.0374 9.3175 12.2999 9.58005C12.5625 9.8426 12.71 10.1987 12.71 10.57V15.5H15.5ZM3.88 5.56C4.32556 5.56 4.75288 5.383 5.06794 5.06794C5.383 4.75288 5.56 4.32556 5.56 3.88C5.56 2.95 4.81 2.19 3.88 2.19C3.43178 2.19 3.00193 2.36805 2.68499 2.68499C2.36805 3.00193 2.19 3.43178 2.19 3.88C2.19 4.81 2.95 5.56 3.88 5.56ZM5.27 15.5V7.13H2.5V15.5H5.27Z"
                          fill="#172447"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Share on Facebook"
                      onClick={() => handleShareClick("facebook")}
                      className="rounded-full md:p-1 transition-transform hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 14.84 3.44 18.87 8 19.8V13H6V10H8V7.5C8 5.57 9.57 4 11.5 4H14V7H12C11.45 7 11 7.45 11 8V10H14V13H11V19.95C16.05 19.45 20 15.19 20 10Z"
                          fill="#172447"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Share on X"
                      onClick={() => handleShareClick("x")}
                      className="rounded-full md:p-1 transition-transform hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                      >
                        <path
                          d="M15.3562 0H18.3467L11.8142 7.48521L19.5 17.6726H13.4829L8.76664 11.4953L3.37629 17.6726H0.383036L7.36961 9.66364L0 0.00139284H6.17036L10.4269 5.64664L15.3562 0ZM14.3046 15.8786H15.9621L5.265 1.70068H3.48771L14.3046 15.8786Z"
                          fill="#172447"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Share by email"
                      onClick={() => handleShareClick("email")}
                      className="rounded-full md:p-1 transition-transform hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="16"
                        viewBox="0 0 20 16"
                        fill="none"
                      >
                        <path
                          d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z"
                          fill="#172447"
                        />
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
      <div className="px-[30px] md:px-[200px] pb-[50px] md:pb-[32px]">
        <div className="relative w-full md:w-[1112px] h-[158px] md:h-[464px] bg-gray-200 rounded-[10px] md:rounded-lg overflow-hidden">
          <Image
            src={newsletter.imageUrl || "/imgs/newsletter-placeholder.png"}
            alt={newsletter.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <div className="px-[30px] md:px-[200px] pb-[50px] md:pb-[32px]">
        <div className="w-full md:max-w-[1120px]">
          <div className="mb-[20px] md:mb-8 max-w-4xl">
            <h3 className="font-dm-sans font-[700] text-[18px] md:text-[28px] leading-[1.5] md:leading-[42px] tracking-[-0.36px] md:tracking-[-0.56px] text-[#1E1E1E] mb-[20px] md:mb-4">
              {newsletter.authorName}
            </h3>
            <p className="font-dm-sans text-[12px] md:text-[16px] font-[400] leading-[16px] md:leading-[24px] text-[#1E1E1E]">
              {newsletter.blurb}
            </p>
          </div>

          {/* Read Full Article Button */}
          <a
            href={newsletter.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-[15px] md:px-6 py-[10px] md:py-3 bg-[#012060] text-[12px] md:text-base text-white rounded-[99px] font-dm-sans font-semibold hover:bg-[#1169B0] transition-colors"
          >
            READ FULL ARTICLE
          </a>
        </div>
      </div>

      {/* You May Also Like */}
      {relatedNewsletters.length > 0 && (
        <div className="px-[30px] md:px-[100px] pt-[20px] md:pt-[50px] pb-[50px] md:pb-[48px]">
          <h2 className="font-dm-sans font-[500] md:font-[700] text-[28px] md:text-[32px] leading-[150%] tracking-[-0.56] md:tracking-[-0.64px] text-[#1E1E1E] mb-[30px] md:mb-[20px]">
            You May Also Like
          </h2>

          <div className="flex flex-col md:grid grid-cols-3 gap-[30px] md:gap-[24px]">
            {relatedNewsletters.map((article) => (
              <button
                key={article._id}
                onClick={() => router.push(`/newsletters/${article._id}`)}
                className="group cursor-pointer text-left transition-transform hover:scale-105"
              >
                <div className="relative w-full h-[249px] md:h-48 bg-gray-300 rounded-lg overflow-hidden mb-[20px] md:mb-4">
                  <Image
                    src={article.imageUrl || "/imgs/newsletter-placeholder.png"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center w-full md:w-auto justify-between text-[12px] font-normal md:font-medium text-[#5D5D5D] mb-[10px] md:mb-2">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#172447]/70 md:px-4"
          onClick={closeLeaveModal}
        >
          <div
            className="relative md:w-full max-w-[250px] md:max-w-[760px] rounded-[12px] bg-white px-[30px] md:px-8 py-[32px] md:pb-8 md:pt-9 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close dialog"
              onClick={closeLeaveModal}
              className="absolute right-[20px] md:right-6 top-[22px] md:top-6 text-[#1E1E1E] transition-colors hover:text-[#012060]"
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

            <div className="mx-auto mb-[20px] md:mb-8 flex h-[40px] md:h-[50px] w-[40px] md:w-[50px] items-center justify-center rounded-full bg-[#9CC8EA]">
              <svg
                aria-hidden="true"
                className="h-7 w-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M12 7v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="12" cy="17.5" r="1.2" fill="currentColor" />
              </svg>
            </div>

            <h2 className="font-dm-sans text-[16px] md:text-[42px] leading-[1.5] md:leading-[56px] font-normal md:font-medium tracking-normal md:tracking-[-0.8px] text-[#1E2B59]">
              You are about to leave our website
            </h2>
            <p className="mx-auto mt-[20px] md:mt-6 max-w-[640px] font-dm-sans text-[12px] md:text-[16px] leading-[16px] md:leading-[150%] text-[#5D5D5D]">
              You selected a link to an external site. F3 Global is not responsible for the
              third-party website&apos;s availability, content, products or services. Please refer
              to the external website&apos;s terms, privacy and security policies for details and
              applicability.
            </p>

            <div className="mt-[20px] md:mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={closeLeaveModal}
                className="rounded-[99px] border border-[#1E2B59] px-[15px] md:px-8 py-[10px] md:py-2 font-dm-sans text-[12px] md:text-[16px] text-[#1E2B59] font-medium transition-colors hover:bg-[#F4F4F4]"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={proceedToShare}
                className="rounded-[99px] bg-[#1E2B59] px-[15px] md:px-8 py-[10px] md:py-2 font-dm-sans text-[12px] md:text-[16px] font-medium text-white transition-colors hover:bg-[#16224A]"
              >
                PROCEED
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

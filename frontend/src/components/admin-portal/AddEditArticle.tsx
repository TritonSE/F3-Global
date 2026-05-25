"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Newsletter, NewsletterPayload } from "@/api/newsletters";
import type { ChangeEvent, FormEvent, ReactNode } from "react";

export type ArticleFormValues = NewsletterPayload & {
  newImage?: File;
  newPdf?: File;
};

type AddEditArticleProps = {
  article?: Newsletter | null;
  saving: boolean;
  onCancel: () => void;
  onSubmit: (values: ArticleFormValues) => void;
};

type Step = "details" | "assets";

const TITLE_MAX_CHARS = 70;
const ARTICLE_DATE_TIME_ZONE = "America/New_York";
const DATE_INPUT_PATTERN = /^(\d{4})-(\d{2})-(\d{2})/;

function getArticleDateInputValue(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ARTICLE_DATE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const day = parts.find((part) => part.type === "day")?.value ?? "";
  return `${year}-${month}-${day}`;
}

function formatDateInput(value?: string) {
  if (!value) return getArticleDateInputValue();
  const dateInputMatch = DATE_INPUT_PATTERN.exec(value);
  if (dateInputMatch) return dateInputMatch[0];
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return getArticleDateInputValue(date);
}

function formatDisplayDate(value: string) {
  const dateInputMatch = DATE_INPUT_PATTERN.exec(value);
  if (dateInputMatch) {
    const [, year, month, day] = dateInputMatch;
    return `${Number(month)}/${Number(day)}/${year}`;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    timeZone: ARTICLE_DATE_TIME_ZONE,
  });
}

function fileNameFromUrl(value?: string) {
  if (!value) return "";
  try {
    const cleanUrl = value.split("?")[0] ?? value;
    const rawName = cleanUrl.split("/").pop() ?? "";
    return decodeURIComponent(rawName).split("/").pop() || "file";
  } catch {
    return "file";
  }
}

function isUploadedPdfUrl(value: string) {
  if (!value) return false;
  return (
    value.includes("firebasestorage.googleapis.com") || value.includes("storage.googleapis.com")
  );
}

function CloseIcon({ className = "size-[24px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FileIcon({ className = "size-[24px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 3h7l5 5v13H7V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 3v6h5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PublishIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[24px] shrink-0" aria-hidden="true">
      <path
        d="M12 4v13M12 4 7 9m5-5 5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FieldLabel({
  title,
  description,
  className = "",
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`flex w-[251px] shrink-0 flex-col items-start ${className}`}>
      <span className="font-dm-sans text-[16px] font-semibold leading-[24px] text-[#1E1E1E]">
        {title}
      </span>
      {description && (
        <span className="w-[210px] font-dm-sans text-[12px] leading-[16px] text-[#5D5D5D]">
          {description}
        </span>
      )}
    </div>
  );
}

function FooterButton({
  children,
  disabled,
  onClick,
  type = "button",
  variant = "secondary",
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "secondary" | "success";
}) {
  const variantClass =
    variant === "success"
      ? "bg-[#3BB966] text-white hover:bg-[#309854] disabled:bg-[#C7C7C7]"
      : "border border-[#C7C7C7] bg-[#F4F4F4] text-[#1E1E1E] hover:bg-[#ECECEC] disabled:text-[#C7C7C7]";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center gap-[10px] rounded-[99px] px-[20px] py-[10px] font-dm-sans text-[16px] leading-[24px] transition-colors disabled:cursor-not-allowed ${variantClass}`}
    >
      {children}
    </button>
  );
}

function UploadDropzone({
  label,
  helpText,
  accept,
  fileName,
  onSelect,
  onRemove,
}: {
  label: string;
  helpText: string;
  accept: string;
  fileName: string;
  onSelect: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    onSelect(file);
    event.target.value = "";
  }

  if (fileName) {
    return (
      <div className="flex w-[337px] items-center justify-between rounded-[10px] px-[15px] py-[10px]">
        <div className="flex min-w-0 items-center gap-[10px] text-[#5D5D5D]">
          <FileIcon />
          <span className="truncate font-dm-sans text-[16px] leading-[24px]">{fileName}</span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label.toLowerCase()}`}
          className="shrink-0 cursor-pointer text-[#5D5D5D] hover:text-[#1E1E1E]"
        >
          <CloseIcon />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex size-[337px] cursor-pointer items-center justify-center rounded-[10px] border border-dashed border-[#C7C7C7] bg-white px-[15px] py-[10px] text-[#5D5D5D] hover:border-[#1169B0]"
      >
        <span className="flex flex-col items-center justify-center gap-[10px]">
          <FileIcon />
          <span className="flex flex-col items-center font-dm-sans">
            <span className="text-[16px] leading-[24px]">{label}</span>
            <span className="text-[12px] leading-[16px] text-[#C7C7C7]">{helpText}</span>
          </span>
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}

export function AddEditArticle({ article, saving, onCancel, onSubmit }: AddEditArticleProps) {
  const initialValues = useMemo(
    () => ({
      title: article?.title ?? "",
      blurb: article?.blurb ?? "",
      uploadDate: formatDateInput(article?.uploadDate),
      views: article?.views ?? 0,
      featured: article?.featured ?? false,
      pdfUrl: article?.pdfUrl ?? "",
      imageUrl: article?.imageUrl ?? "",
    }),
    [article],
  );

  const [step, setStep] = useState<Step>("details");
  const [title, setTitle] = useState(initialValues.title);
  const [blurb, setBlurb] = useState(initialValues.blurb);
  const [uploadDate, setUploadDate] = useState(initialValues.uploadDate);
  const [views, setViews] = useState(initialValues.views);
  const [featured, setFeatured] = useState(initialValues.featured);
  const [pdfUrl, setPdfUrl] = useState(initialValues.pdfUrl);
  const [imageUrl, setImageUrl] = useState(initialValues.imageUrl);
  const [newImage, setNewImage] = useState<File | undefined>();
  const [newPdf, setNewPdf] = useState<File | undefined>();

  useEffect(() => {
    setTitle(initialValues.title);
    setBlurb(initialValues.blurb);
    setUploadDate(initialValues.uploadDate);
    setViews(initialValues.views);
    setFeatured(initialValues.featured);
    setPdfUrl(initialValues.pdfUrl);
    setImageUrl(initialValues.imageUrl);
    setNewImage(undefined);
    setNewPdf(undefined);
    setStep("details");
  }, [initialValues]);

  useEffect(() => {
    if (!newImage) return undefined;
    const previewUrl = URL.createObjectURL(newImage);
    setImageUrl(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [newImage]);

  const imageFileName = newImage?.name ?? fileNameFromUrl(imageUrl);
  const hasUploadedPdf = newPdf !== undefined || isUploadedPdfUrl(pdfUrl);
  const hasExternalLink = pdfUrl.trim() !== "" && !hasUploadedPdf;
  const pdfFileName = hasUploadedPdf ? (newPdf?.name ?? fileNameFromUrl(pdfUrl)) : "";
  const hasChanges =
    newImage !== undefined ||
    newPdf !== undefined ||
    title !== initialValues.title ||
    blurb !== initialValues.blurb ||
    uploadDate !== initialValues.uploadDate ||
    views !== initialValues.views ||
    featured !== initialValues.featured ||
    pdfUrl !== initialValues.pdfUrl ||
    imageUrl !== initialValues.imageUrl;
  const canPublish =
    title.trim() !== "" &&
    blurb.trim() !== "" &&
    (imageUrl.trim() !== "" || newImage !== undefined) &&
    (hasExternalLink || hasUploadedPdf) &&
    !saving;

  function handleRevert() {
    if (saving) return;
    setTitle(initialValues.title);
    setBlurb(initialValues.blurb);
    setUploadDate(initialValues.uploadDate);
    setViews(initialValues.views);
    setFeatured(initialValues.featured);
    setPdfUrl(initialValues.pdfUrl);
    setImageUrl(initialValues.imageUrl);
    setNewImage(undefined);
    setNewPdf(undefined);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canPublish) return;

    onSubmit({
      title: title.trim(),
      uploadDate,
      views,
      blurb: blurb.trim(),
      pdfUrl: pdfUrl.trim(),
      imageUrl,
      featured,
      newImage,
      newPdf,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-[24px]"
      onClick={() => {
        if (!saving) onCancel();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-[1024px] flex-col gap-[20px] rounded-[10px] bg-white px-[50px] py-[40px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-[44px] w-full items-center justify-between">
          <h2 className="font-dm-sans text-[24px] font-medium leading-[36px] tracking-[-0.48px] text-[#1E1E1E]">
            {article ? "Edit Article" : "Add New Article"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            aria-label="Close article editor"
            className="cursor-pointer text-[#5D5D5D] hover:text-[#1E1E1E] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CloseIcon className="size-[32px]" />
          </button>
        </div>

        {step === "details" ? (
          <>
            <div className="flex w-full items-center justify-between">
              <FieldLabel title="Article Title:" className="h-[70px]" />
              <div className="flex flex-col items-end gap-[10px]">
                <input
                  value={title}
                  maxLength={TITLE_MAX_CHARS}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Enter name"
                  className="w-[677px] rounded-[10px] border border-[#C7C7C7] bg-[#F4F4F4] px-[15px] py-[10px] font-dm-sans text-[16px] leading-[24px] text-[#1E1E1E] outline-none placeholder:text-[#5D5D5D] focus:border-[#1169B0]"
                />
                <span className="font-dm-sans text-[12px] leading-[16px] text-[#5D5D5D]">
                  Characters: {title.length}/{TITLE_MAX_CHARS}
                </span>
              </div>
            </div>

            <div className="flex w-full items-start justify-between">
              <FieldLabel
                title="Article Summary Text:"
                description="A brief blurb introducing the article. Less than 120 words recommended."
              />
              <textarea
                value={blurb}
                onChange={(event) => setBlurb(event.target.value)}
                placeholder="Enter text"
                className="h-[280px] w-[677px] resize-none rounded-[10px] border border-[#C7C7C7] bg-[#F4F4F4] px-[15px] py-[10px] font-dm-sans text-[16px] leading-[24px] text-[#1E1E1E] outline-none placeholder:text-[#5D5D5D] focus:border-[#1169B0]"
              />
            </div>

            <div className="flex w-full items-start gap-[25px]">
              <FieldLabel
                title="Featured Article:"
                description="Featured article will be shown first on the Newsletter page of the website and given a larger tile."
                className="flex-1 py-[10px]"
              />
              <button
                type="button"
                onClick={() => setFeatured((value) => !value)}
                aria-pressed={featured}
                className="flex w-[337px] cursor-pointer items-start gap-[5px] px-[15px] py-[10px] text-left"
              >
                <span className="flex size-[24px] shrink-0 items-center justify-center">
                  <span
                    className={`flex size-[16px] items-center justify-center rounded-full border ${
                      featured ? "border-[#1169B0]" : "border-[#C7C7C7]"
                    }`}
                  >
                    {featured && <span className="size-[8px] rounded-full bg-[#1169B0]" />}
                  </span>
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-dm-sans text-[16px] leading-[24px] text-[#1E1E1E]">
                    Featured
                  </span>
                  <span className="font-dm-sans text-[12px] leading-[16px] text-[#5D5D5D]">
                    Selecting will deselect any other article that is currently featured on the
                    website.
                  </span>
                </span>
              </button>
            </div>

            <div className="h-px w-full bg-[#C7C7C7]" />

            <div className="flex w-full items-center justify-end gap-[25px]">
              <FooterButton disabled={!hasChanges || saving} onClick={handleRevert}>
                Revert Changes
              </FooterButton>
              <FooterButton disabled={saving} onClick={() => setStep("assets")}>
                Next
              </FooterButton>
            </div>
          </>
        ) : (
          <>
            <div className="flex w-[928px] items-center justify-between">
              <FieldLabel
                title="Article Link:"
                description="Link to an external PDF or upload PDF below."
              />
              <input
                value={hasUploadedPdf ? "" : pdfUrl}
                disabled={hasUploadedPdf}
                onChange={(event) => {
                  setPdfUrl(event.target.value);
                  setNewPdf(undefined);
                }}
                placeholder="Enter link"
                className="w-[677px] rounded-[10px] border border-[#C7C7C7] bg-[#F4F4F4] px-[15px] py-[10px] font-dm-sans text-[16px] leading-[24px] text-[#1E1E1E] outline-none placeholder:text-[#5D5D5D] focus:border-[#1169B0] disabled:text-[#C7C7C7] disabled:placeholder:text-[#C7C7C7]"
              />
            </div>

            <div className="flex w-full flex-col gap-[30px]">
              <div className="flex items-start gap-[50px]">
                <div className="flex items-start gap-[50px]">
                  <span className="py-[10px] font-dm-sans text-[16px] font-bold leading-[24px] text-[#1E1E1E]">
                    Image:
                  </span>
                  <UploadDropzone
                    label="Upload Image"
                    helpText=".png, .jpg, .jpeg"
                    accept="image/png,image/jpeg"
                    fileName={imageFileName}
                    onSelect={(file) => setNewImage(file)}
                    onRemove={() => {
                      setNewImage(undefined);
                      setImageUrl("");
                    }}
                  />
                </div>
                <div className="flex items-start gap-[50px]">
                  <span className="py-[10px] font-dm-sans text-[16px] font-bold leading-[24px] text-[#1E1E1E]">
                    PDF:
                  </span>
                  {hasExternalLink ? (
                    <div className="flex w-[337px] items-center justify-center rounded-[10px] px-[15px] py-[10px]">
                      <span className="w-full font-dm-sans text-[16px] leading-[24px] text-[#5D5D5D]">
                        To upload a PDF file, please remove the link.
                      </span>
                    </div>
                  ) : (
                    <UploadDropzone
                      label="Upload PDF File"
                      helpText=".pdf"
                      accept="application/pdf"
                      fileName={pdfFileName}
                      onSelect={(file) => {
                        setNewPdf(file);
                        setPdfUrl("");
                      }}
                      onRemove={() => {
                        setNewPdf(undefined);
                        setPdfUrl("");
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col items-end">
                <div className="flex w-[147px] flex-col items-start gap-[7px] text-right font-dm-sans text-[16px] leading-[24px] text-[#5D5D5D]">
                  <p className="w-full">
                    Published <span className="font-bold">{formatDisplayDate(uploadDate)}</span>
                  </p>
                  <p className="w-full">
                    Viewcount: <span className="font-bold">{views}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-[#C7C7C7]" />

            <div className="flex w-full items-center justify-between">
              <FooterButton disabled={saving} onClick={() => setStep("details")}>
                Back
              </FooterButton>
              <div className="flex items-center gap-[25px]">
                <FooterButton disabled={!hasChanges || saving} onClick={handleRevert}>
                  Revert Changes
                </FooterButton>
                <FooterButton type="submit" variant="success" disabled={!canPublish}>
                  {saving ? "PUBLISHING..." : "PUBLISH"}
                  <PublishIcon />
                </FooterButton>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

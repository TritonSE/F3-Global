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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { type FaqItem, type FaqPage, getFaq, putFaqs } from "@/api/faq";
import { ConfirmationNotification } from "@/components/admin-portal/ConfirmationNotification";
import { DraggableSortablePill } from "@/components/admin-portal/DraggableSortablePill";
import { FaqCard } from "@/components/admin-portal/FaqCard";
import { PreviewMode } from "@/components/admin-portal/PreviewMode";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { auth } from "@/firebase/firebase";

const PAGE_OPTIONS: { key: FaqPage; label: string }[] = [
  { key: "donors", label: "Donors" },
  { key: "clients", label: "Clients" },
  { key: "members", label: "Members" },
];

const PAGES: FaqPage[] = ["donors", "clients", "members"];

type FaqWithLocalId = FaqItem & { localId: string };
type FaqsRecord = Record<FaqPage, FaqWithLocalId[]>;
type OriginalsRecord = Record<FaqPage, FaqItem[]>;

const EMPTY_FAQS: FaqsRecord = { donors: [], members: [], clients: [] };
const EMPTY_ORIGINALS: OriginalsRecord = { donors: [], members: [], clients: [] };

function withLocalIds(items: FaqItem[]): FaqWithLocalId[] {
  return items.map((f) => ({ ...f, localId: f._id ?? crypto.randomUUID() }));
}

export default function FaqsEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<FaqPage>("donors");
  const [allFaqs, setAllFaqs] = useState<FaqsRecord>(EMPTY_FAQS);
  const [originalFaqs, setOriginalFaqs] = useState<OriginalsRecord>(EMPTY_ORIGINALS);
  const [isPublishing, setIsPublishing] = useState(false);
  const [notification, setNotification] = useState<"published" | "added" | null>(null);
  const [notificationFading, setNotificationFading] = useState(false);
  const [activeDialog, setActiveDialog] = useState<"back" | "revert" | "delete" | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [addForm, setAddForm] = useState({ question: "", answer: "" });
  const [isPreview, setIsPreview] = useState(false);
  const [expandedPreviewId, setExpandedPreviewId] = useState<string | null>(null);

  const addQuestionRef = useRef<HTMLTextAreaElement>(null);
  const addAnswerRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = addQuestionRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [addForm.question]);
  useEffect(() => {
    const el = addAnswerRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [addForm.answer]);

  const faqs = allFaqs[selectedPage];
  const originals = originalFaqs[selectedPage];

  const hasChanges =
    faqs.length !== originals.length ||
    faqs.some((f, i) => {
      const orig = originals[i];
      return (
        orig && (f.question !== orig.question || f.answer !== orig.answer || f._id !== orig._id)
      );
    });

  const anyPageHasChanges = PAGES.some((page) => {
    const p = allFaqs[page];
    const o = originalFaqs[page];
    return (
      p.length !== o.length ||
      p.some((f, i) => {
        const orig = o[i];
        return (
          orig && (f.question !== orig.question || f.answer !== orig.answer || f._id !== orig._id)
        );
      })
    );
  });

  async function loadAllFaqs() {
    setLoading(true);
    try {
      const results = await Promise.all(PAGES.map(getFaq));
      const newFaqs: FaqsRecord = { donors: [], members: [], clients: [] };
      const newOriginals: OriginalsRecord = { donors: [], members: [], clients: [] };
      PAGES.forEach((page, i) => {
        const sorted = [...results[i]].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        newOriginals[page] = sorted;
        newFaqs[page] = withLocalIds(sorted);
      });
      setAllFaqs(newFaqs);
      setOriginalFaqs(newOriginals);
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        router.push("/login");
        return;
      }
      void loadAllFaqs();
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (anyPageHasChanges) e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [anyPageHasChanges]);

  useEffect(() => {
    if (!notification) {
      setNotificationFading(false);
      return;
    }
    setNotificationFading(false);
    const fadeId = setTimeout(() => setNotificationFading(true), 5000);
    const hideId = setTimeout(() => setNotification(null), 6500);
    return () => {
      clearTimeout(fadeId);
      clearTimeout(hideId);
    };
  }, [notification]);

  function handleDismissNotification() {
    if (notificationFading) return;
    setNotificationFading(true);
    setTimeout(() => setNotification(null), 1500);
  }

  function updateCurrentFaqs(updater: (prev: FaqWithLocalId[]) => FaqWithLocalId[]) {
    setAllFaqs((prev) => ({ ...prev, [selectedPage]: updater(prev[selectedPage]) }));
  }

  function handleFieldChange(localId: string, field: "question" | "answer", value: string) {
    updateCurrentFaqs((prev) =>
      prev.map((f) => (f.localId === localId ? { ...f, [field]: value } : f)),
    );
  }

  function handleDeleteRequest(localId: string) {
    setPendingDeleteId(localId);
    setActiveDialog("delete");
  }

  function confirmDelete() {
    if (pendingDeleteId) {
      updateCurrentFaqs((prev) => prev.filter((f) => f.localId !== pendingDeleteId));
    }
    setPendingDeleteId(null);
    setActiveDialog(null);
  }

  function handleAddFaq() {
    if (!addForm.question.trim() || !addForm.answer.trim()) return;
    const newFaq: FaqWithLocalId = {
      localId: crypto.randomUUID(),
      question: addForm.question.trim(),
      answer: addForm.answer.trim(),
      order: 0,
    };
    updateCurrentFaqs((prev) => [...prev, newFaq]);
    setAddForm({ question: "", answer: "" });
    setNotification("added");
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    updateCurrentFaqs((prev) => {
      const oldIndex = prev.findIndex((f) => f.localId === active.id);
      const newIndex = prev.findIndex((f) => f.localId === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  async function handlePublish() {
    setIsPublishing(true);
    try {
      const current = allFaqs[selectedPage];
      const payload = current.map((f, i) => ({
        ...(f._id ? { _id: f._id } : {}),
        question: f.question,
        answer: f.answer,
        order: i + 1,
      }));
      await putFaqs(selectedPage, payload);
      const refreshed = current.map((f, i) => ({ ...f, order: i + 1 }));
      setAllFaqs((prev) => ({ ...prev, [selectedPage]: refreshed }));
      setOriginalFaqs((prev) => ({
        ...prev,
        [selectedPage]: refreshed.map(({ question, answer, _id, order }) => ({
          question,
          answer,
          _id,
          order,
        })),
      }));
      setNotification("published");
    } catch (error) {
      console.error("Failed to publish FAQs:", error);
    } finally {
      setIsPublishing(false);
    }
  }

  function handleRevert() {
    setAllFaqs((prev) => ({ ...prev, [selectedPage]: withLocalIds(originalFaqs[selectedPage]) }));
    setActiveDialog(null);
  }

  const publishButton = (
    <button
      type="button"
      onClick={() => void handlePublish()}
      disabled={!hasChanges || isPublishing}
      className="bg-[#3BB966] flex gap-[10px] items-center justify-center px-[20px] py-[10px] rounded-[99px] font-dm-sans font-semibold text-[16px] text-white hover:bg-[#309854] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
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
          d="M9 19.9C7.73333 19.7667 6.55417 19.4208 5.4625 18.8625C4.37083 18.3042 3.42083 17.5792 2.6125 16.6875C1.80417 15.7958 1.16667 14.775 0.7 13.625C0.233333 12.475 0 11.25 0 9.95C0 8.43333 0.304167 7.03333 0.9125 5.75C1.52083 4.46667 2.35 3.36667 3.4 2.45H1V0.45H7V6.45H5V3.725C4.08333 4.45833 3.35417 5.3625 2.8125 6.4375C2.27083 7.5125 2 8.68333 2 9.95C2 12 2.67083 13.7708 4.0125 15.2625C5.35417 16.7542 7.01667 17.625 9 17.875V19.9Z M13 19.45V13.45H15V16.175C15.9167 15.425 16.6458 14.5167 17.1875 13.45C17.7292 12.3833 18 11.2167 18 9.95C18 7.9 17.3292 6.12917 15.9875 4.6375C14.6458 3.14583 12.9833 2.275 11 2.025V0C13.5333 0.25 15.6667 1.31667 17.4 3.2C19.1333 5.08333 20 7.33333 20 9.95C20 11.4667 19.6958 12.8667 19.0875 14.15C18.4792 15.4333 17.65 16.5333 16.6 17.45H19V19.45H13Z"
          fill="white"
        />
        <path
          d="M8.575 14.55L4.35 10.3L5.75 8.9L8.575 11.725L14.25 6.05L15.65 7.475L8.575 14.55Z"
          fill="white"
        />
      </svg>
    </button>
  );

  const notificationMessage =
    notification === "published"
      ? "Successfully Published"
      : notification === "added"
        ? "New FAQ has been added successfully"
        : null;

  const notificationLink =
    notification === "published"
      ? { href: `/${selectedPage}`, label: "View Live Site" }
      : undefined;

  if (loading) return null;

  if (isPreview) {
    return (
      <PreviewMode
        onBack={() => {
          setIsPreview(false);
          setExpandedPreviewId(null);
        }}
        notificationMessage={notificationMessage}
        notificationLink={notificationLink}
        notificationFading={notificationFading}
        onDismissNotification={handleDismissNotification}
        publishButton={publishButton}
      >
        <div className="bg-white rounded-[10px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.1)] w-full">
          <div className="bg-[rgba(244,244,244,0.7)] backdrop-blur-sm flex items-center justify-between px-[24px] py-[16px]">
            <div className="flex items-center gap-[12px]">
              <Image
                src="/imgs/f3-logo.svg"
                alt="F3 Global Logo"
                width={44}
                height={44}
                className="size-[44px] object-contain"
              />
              <span className="font-dm-sans font-black text-[10px] text-[#172447] tracking-[2px] leading-[1.1] whitespace-pre-line">
                {"FUTURE\nFORWARD\nFOUNDATION"}
              </span>
            </div>
            <div className="flex items-center gap-[8px]">
              {["Home", "About Us", "Meet the Team"].map((item) => (
                <span
                  key={item}
                  className="px-[12px] py-[8px] font-dm-sans text-[16px] text-[#5D5D5D]"
                >
                  {item}
                </span>
              ))}
              <span className="px-[12px] py-[8px] bg-[#E6E6E6] rounded-[99px] font-dm-sans text-[16px] text-[#172447]">
                Get Involved ↓
              </span>
              <span className="px-[12px] py-[8px] font-dm-sans text-[16px] text-[#5D5D5D]">
                Newsletter
              </span>
              <div className="border border-[#C7C7C7] rounded-[99px] px-[16px] py-[8px] font-dm-sans font-semibold text-[16px] text-[#012060] flex items-center gap-[8px]">
                DONATE
                <Image
                  src="/imgs/ic_arrowforward.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="size-[20px]"
                />
              </div>
            </div>
          </div>

          <div className="px-[80px] py-[40px] flex flex-col gap-[32px]">
            <h2 className="font-dm-sans font-medium text-[39px] text-[#172447] tracking-[-0.78px]">
              Questions?
            </h2>
            <div className="bg-[#F4F4F4] rounded-[10px] p-[16px] flex flex-col gap-[20px]">
              {faqs.length === 0 && (
                <p className="font-dm-sans text-[16px] text-[#5D5D5D] py-[8px]">
                  No FAQs added yet.
                </p>
              )}
              {faqs.map((faq, index) => {
                const isExpanded = expandedPreviewId === faq.localId;
                return (
                  <div key={faq.localId}>
                    {index > 0 && <div className="h-px bg-[#E0E0E0] mb-[20px]" />}
                    <button
                      type="button"
                      onClick={() => setExpandedPreviewId(isExpanded ? null : faq.localId)}
                      className="w-full flex items-center justify-between text-left cursor-pointer"
                    >
                      <span className="font-dm-sans font-medium text-[19px] text-[#1E1E1E] tracking-[-0.39px] flex-1 min-w-0 pr-[16px]">
                        {faq.question}
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="#1E1E1E"
                        className={`size-[24px] shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-45" : ""}`}
                        aria-hidden="true"
                      >
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                    </button>
                    {isExpanded && (
                      <p className="font-dm-sans text-[16px] text-[#5D5D5D] leading-[1.6] mt-[12px]">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PreviewMode>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <header className="relative sticky top-0 z-40 bg-white border-b border-[#C7C7C7] flex flex-col gap-[10px] items-start justify-center px-[100px] py-[50px]">
        <button
          type="button"
          aria-label="Go back to admin portal"
          onClick={() =>
            anyPageHasChanges ? setActiveDialog("back") : router.push("/admin-portal")
          }
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
            Frequently Asked Questions
          </h1>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className="bg-[#012060] flex gap-[10px] items-center justify-center px-[20px] py-[10px] rounded-[99px] cursor-pointer hover:bg-[#012060]/90 transition-colors"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="white" className="size-[32px]">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span className="font-dm-sans font-semibold text-[16px] text-white">PREVIEW</span>
          </button>
        </div>

        <div className="flex gap-[10px] items-center">
          {["DONORS", "CLIENTS", "MEMBERS"].map((tag) => (
            <div key={tag} className="bg-[#F4F4F4] px-[10px] py-[5px] rounded-[10px]">
              <span className="font-dm-sans font-semibold text-[12px] text-[#5D5D5D]">{tag}</span>
            </div>
          ))}
        </div>

        <p className="font-dm-sans text-[14px] text-[#5D5D5D] leading-[20px]">
          Reorder FAQs by dragging, or easily add, edit, or remove questions and answers.
        </p>

        <ConfirmationNotification
          message={notificationMessage}
          link={notificationLink}
          fading={notificationFading}
          onDismiss={handleDismissNotification}
        />
      </header>

      <div className="flex gap-[100px] px-[100px] py-[50px]">
        <div className="flex flex-col gap-[10px] shrink-0">
          <span className="font-dm-sans font-bold text-[12px] text-[#5D5D5D]">PAGE</span>
          <div className="flex flex-col gap-[15px]">
            {PAGE_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                aria-pressed={selectedPage === key}
                onClick={() => setSelectedPage(key)}
                className={`flex items-center justify-between w-[185px] px-[15px] py-[10px] rounded-[10px] bg-[#F4F4F4] border transition-colors font-dm-sans text-[16px] text-[#1E1E1E] cursor-pointer ${
                  selectedPage === key
                    ? "border-[#1169B0] font-semibold"
                    : "border-[#C7C7C7] font-normal hover:border-[#1169B0]"
                }`}
              >
                {label}
                {selectedPage === key && (
                  <svg viewBox="0 0 16 16" fill="none" className="size-[16px] shrink-0">
                    <circle cx="8" cy="8" r="7.5" stroke="#C7C7C7" />
                    <circle cx="8" cy="8" r="5" fill="#1169B0" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[50px] flex-1 min-w-0 pb-[100px]">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={faqs.map((f) => f.localId)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-[50px]">
                {faqs.map((faq) => (
                  <DraggableSortablePill
                    key={faq.localId}
                    id={faq.localId}
                    onDelete={handleDeleteRequest}
                    className="bg-white border border-[#C7C7C7] flex gap-[20px] items-start p-[20px] rounded-[10px]"
                  >
                    <FaqCard
                      id={faq.localId}
                      question={faq.question}
                      answer={faq.answer}
                      onChange={handleFieldChange}
                    />
                  </DraggableSortablePill>
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <div className="flex gap-[20px] items-start pl-[20px] pr-[64px] py-[20px]">
            <button
              type="button"
              onClick={handleAddFaq}
              disabled={!addForm.question.trim() || !addForm.answer.trim()}
              className="shrink-0 size-[24px] flex items-center justify-center mt-[22px] text-[#5D5D5D] disabled:text-[#C7C7C7] disabled:cursor-not-allowed cursor-pointer transition-colors hover:text-[#1169B0]"
              aria-label="Add FAQ"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-[24px]">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
            <div className="flex flex-col gap-[10px] flex-1 min-w-0">
              <div className="flex flex-col gap-[10px]">
                <label
                  htmlFor="add-faq-question"
                  className="font-dm-sans text-[12px] text-[#5D5D5D]"
                >
                  Question
                </label>
                <textarea
                  ref={addQuestionRef}
                  id="add-faq-question"
                  value={addForm.question}
                  onChange={(e) => setAddForm((f) => ({ ...f, question: e.target.value }))}
                  placeholder="Add Question"
                  rows={1}
                  className="bg-[#F4F4F4] border border-[#C7C7C7] rounded-[8px] px-[15px] py-[10px] font-dm-sans text-[16px] text-[#1E1E1E] placeholder:text-[#5D5D5D] w-full resize-none overflow-hidden focus:outline-none focus:border-[#1169B0]"
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <label htmlFor="add-faq-answer" className="font-dm-sans text-[12px] text-[#5D5D5D]">
                  Answer
                </label>
                <textarea
                  ref={addAnswerRef}
                  id="add-faq-answer"
                  value={addForm.answer}
                  onChange={(e) => setAddForm((f) => ({ ...f, answer: e.target.value }))}
                  placeholder="Add Answer"
                  rows={1}
                  className="bg-[#F4F4F4] border border-[#C7C7C7] rounded-[8px] px-[15px] py-[10px] font-dm-sans text-[16px] text-[#1E1E1E] placeholder:text-[#5D5D5D] w-full resize-none overflow-hidden focus:outline-none focus:border-[#1169B0]"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-[10px] items-center justify-end">
            <button
              type="button"
              disabled={!hasChanges}
              onClick={() => setActiveDialog("revert")}
              className="bg-[#F4F4F4] border border-[#C7C7C7] px-[20px] py-[10px] rounded-[99px] font-dm-sans font-normal text-[16px] transition-colors disabled:text-[#C7C7C7] disabled:cursor-not-allowed enabled:text-[#1E1E1E] enabled:hover:border-[#5D5D5D] enabled:cursor-pointer"
            >
              Revert Changes
            </button>
            {publishButton}
          </div>
        </div>
      </div>

      <ConfirmationDialog
        open={activeDialog === "back"}
        onClose={() => setActiveDialog(null)}
        title="Are You Sure?"
        body="Your changes will not be saved. This action cannot be undone."
        cancelLabel="Cancel"
        confirmLabel="YES, GO BACK"
        onConfirm={() => router.push("/admin-portal")}
      />
      <ConfirmationDialog
        open={activeDialog === "revert"}
        onClose={() => setActiveDialog(null)}
        title="Are You Sure?"
        body="Are you sure you want to revert all changes? This action cannot be undone."
        cancelLabel="Cancel"
        confirmLabel="YES, REVERT"
        onConfirm={handleRevert}
      />
      <ConfirmationDialog
        open={activeDialog === "delete"}
        onClose={() => {
          setPendingDeleteId(null);
          setActiveDialog(null);
        }}
        title="Delete FAQ?"
        body="Are you sure you want to delete this FAQ? This action cannot be undone."
        cancelLabel="Cancel"
        confirmLabel="YES, DELETE"
        onConfirm={confirmDelete}
      />
    </div>
  );
}

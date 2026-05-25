"use client";

import countriesInfo from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useMemo, useRef, useState } from "react";

import { IconFile, IconPublishAdd, IconPublishEdit } from "./MemberIcons";

import type { Member } from "@/api/members";

countriesInfo.registerLocale(enLocale);

export type MemberFormData = {
  name: string;
  memberPosition: string;
  country: string;
  email: string;
  linkedinUrl: string;
  headshotUrl: string;
  newImage?: File;
};

type MemberFormModalProps = {
  mode: "add" | "edit";
  initialMember?: Member;
  isPublishing?: boolean;
  onClose: () => void;
  onPublish: (data: MemberFormData) => void;
};

const EMPTY: MemberFormData = {
  name: "",
  memberPosition: "",
  country: "",
  email: "",
  linkedinUrl: "",
  headshotUrl: "",
};

function fileNameFromUrl(url: string): string {
  if (!url) return "";
  try {
    const path = decodeURIComponent(new URL(url).pathname);
    return (path.split("/").pop() ?? url).replace(/^\d+-/, "");
  } catch {
    return url;
  }
}

// Mirrors the backend `isEmail()` rule: requires a local part, "@", and a TLD.
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(value.trim());
}

// Mirrors the backend `isURL()` rule: parseable URL with a dotted host.
// A missing protocol is allowed (assumed https), matching express-validator.
function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value.includes("://") ? value : `https://${value.trim()}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-[20px]">
      <label className="w-[150px] shrink-0 pt-[12px] font-dm-sans text-[16px] font-semibold text-[#1E1E1E]">
        {label}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export function MemberFormModal({
  mode,
  initialMember,
  isPublishing = false,
  onClose,
  onPublish,
}: MemberFormModalProps) {
  const initial: MemberFormData = useMemo(
    () =>
      initialMember
        ? {
            name: initialMember.name,
            memberPosition: initialMember.memberPosition,
            country: initialMember.country,
            email: initialMember.email,
            linkedinUrl: initialMember.linkedinUrl,
            headshotUrl: initialMember.headshotUrl ?? "",
          }
        : EMPTY,
    [initialMember],
  );

  const [form, setForm] = useState<MemberFormData>(initial);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const countryOptions = useMemo(() => {
    const names = countriesInfo.getNames("en");
    return Object.entries(names).sort((a, b) => a[1].localeCompare(b[1]));
  }, []);

  const set = (patch: Partial<MemberFormData>) => setForm((prev) => ({ ...prev, ...patch }));

  const hasChanges =
    form.name !== initial.name ||
    form.memberPosition !== initial.memberPosition ||
    form.country !== initial.country ||
    form.email !== initial.email ||
    form.linkedinUrl !== initial.linkedinUrl ||
    form.headshotUrl !== initial.headshotUrl ||
    form.newImage !== undefined;

  const isValid =
    form.name.trim() !== "" &&
    form.memberPosition.trim() !== "" &&
    form.country !== "" &&
    isValidEmail(form.email) &&
    isValidUrl(form.linkedinUrl);

  const imageName = form.newImage?.name ?? fileNameFromUrl(form.headshotUrl);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) set({ newImage: file });
  };

  const inputClass =
    "w-full rounded-[8px] border border-[#C7C7C7] bg-[#F4F4F4] px-[15px] py-[12px] font-dm-sans text-[16px] text-[#1E1E1E] outline-none focus:ring-1 focus:ring-blue-300";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-[20px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[685px] rounded-[16px] bg-white p-[50px] shadow-[0_15px_35px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-[30px] flex items-center justify-between">
          <h2 className="font-dm-sans text-[24px] font-medium tracking-[-0.48px] text-[#1E1E1E]">
            {mode === "add" ? "Add Team Member" : "Edit Member Details"}
          </h2>
          <button type="button" aria-label="Close" onClick={onClose} className="cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#1E1E1E" aria-hidden="true">
              <path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-[20px]">
          <Field label="Member Name:">
            <input
              className={inputClass}
              placeholder="Enter name"
              value={form.name}
              onChange={(e) => set({ name: e.target.value })}
            />
          </Field>

          <Field label="Location:">
            <select
              className={`${inputClass} ${form.country === "" ? "text-[#5D5D5D]" : ""}`}
              value={form.country}
              onChange={(e) => set({ country: e.target.value })}
            >
              <option value="" disabled>
                Select country
              </option>
              {countryOptions.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Position:">
            <input
              className={inputClass}
              placeholder="Enter position"
              value={form.memberPosition}
              onChange={(e) => set({ memberPosition: e.target.value })}
            />
          </Field>

          <Field label="Email:">
            <input
              className={inputClass}
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => set({ email: e.target.value })}
            />
          </Field>

          <Field label="LinkedIn:">
            <input
              className={inputClass}
              placeholder="Enter LinkedIn"
              value={form.linkedinUrl}
              onChange={(e) => set({ linkedinUrl: e.target.value })}
            />
          </Field>

          <Field label="Image:">
            {imageName ? (
              <div className="flex items-center gap-[10px] px-[15px] py-[12px]">
                <IconFile />
                <span className="flex-1 truncate font-dm-sans text-[16px] text-[#5D5D5D]">
                  {imageName}
                </span>
                <button
                  type="button"
                  aria-label="Remove image"
                  onClick={() => set({ newImage: undefined, headshotUrl: "" })}
                  className="cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#5D5D5D" aria-hidden="true">
                    <path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4z" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-[200px] w-full flex-col items-center justify-center gap-[8px] rounded-[8px] border-2 border-dashed border-[#C7C7C7] cursor-pointer"
              >
                <IconFile className="size-[32px]" />
                <span className="font-dm-sans text-[16px] text-[#5D5D5D]">Upload Image</span>
                <span className="font-dm-sans text-[12px] text-[#C7C7C7]">.png, .jpg, .jpeg</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,image/png,image/jpeg"
              className="hidden"
              onChange={handleFile}
            />
          </Field>
        </div>

        <div className="mt-[30px] border-t border-[#C7C7C7] pt-[25px]" />

        <div className="flex justify-end gap-[15px]">
          <button
            type="button"
            disabled={!hasChanges || isPublishing}
            onClick={() => setForm(initial)}
            className="rounded-[99px] border border-[#C7C7C7] bg-white px-[20px] py-[10px] font-dm-sans text-[16px] text-[#1E1E1E] cursor-pointer disabled:cursor-default disabled:opacity-40"
          >
            Revert Changes
          </button>
          <button
            type="button"
            disabled={!isValid || !hasChanges || isPublishing}
            onClick={() => onPublish(form)}
            className="flex items-center gap-[10px] rounded-[99px] bg-[#3BB966] px-[20px] py-[10px] font-dm-sans text-[16px] font-semibold text-white cursor-pointer disabled:cursor-default disabled:opacity-50"
          >
            PUBLISH
            {mode === "add" ? <IconPublishAdd /> : <IconPublishEdit />}
          </button>
        </div>
      </div>
    </div>
  );
}

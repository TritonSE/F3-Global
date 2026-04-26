"use client";

import { ConfirmationNotification } from "@/components/admin-portal/ConfirmationNotification";

export function PreviewMode({
  onBack,
  notificationMessage,
  notificationLink,
  notificationFading,
  onDismissNotification,
  publishButton,
  children,
}: {
  onBack: () => void;
  notificationMessage: string | null;
  notificationLink?: { href: string; label: string };
  notificationFading: boolean;
  onDismissNotification: () => void;
  publishButton: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen">
      <header className="relative sticky top-0 z-40 bg-white px-[100px] py-[20px]">
        <button
          type="button"
          onClick={onBack}
          className="group flex gap-[10px] items-center cursor-pointer py-[12px] pr-[15px] mt-15"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="#1e1e1e"
            className="size-[32px] shrink-0"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <span className="font-rubik font-normal text-[24px] text-[#1E1E1E] transition-transform duration-350 group-hover:translate-x-2">
            Back to Edit
          </span>
        </button>
        <ConfirmationNotification
          message={notificationMessage}
          link={notificationLink}
          fading={notificationFading}
          onDismiss={onDismissNotification}
        />
      </header>

      <div className="px-[100px] py-[50px] flex flex-col gap-[50px] items-end">
        {children}
        {publishButton}
      </div>
    </div>
  );
}

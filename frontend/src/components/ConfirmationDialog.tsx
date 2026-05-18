export function ConfirmationDialog({
  open,
  onClose,
  title,
  body,
  cancelLabel,
  confirmLabel,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  body: string;
  cancelLabel: string;
  confirmLabel: string;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#C7C7C7] flex flex-col gap-[25px] p-[25px] rounded-[10px] w-[450px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-dm-sans font-medium text-[24px] text-[#1E1E1E] tracking-[-0.48px]">
          {title}
        </h2>
        <p className="font-dm-sans text-[16px] text-[#5D5D5D] leading-[24px]">{body}</p>
        <div className="flex gap-[25px] items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#F4F4F4] border border-[#C7C7C7] flex items-center justify-center px-[20px] py-[10px] rounded-[99px] font-dm-sans text-[16px] text-[#1E1E1E] hover:bg-[#ECECEC] transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-[#B93B3B] flex items-center justify-center px-[20px] py-[10px] rounded-[99px] font-dm-sans font-semibold text-[16px] text-white hover:bg-[#A03030] transition-colors cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

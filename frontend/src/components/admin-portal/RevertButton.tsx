type RevertButtonProps = {
  handleClick: () => void;
  disabled?: boolean;
};

export function RevertButton({ handleClick, disabled }: RevertButtonProps) {
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`bg-[#F4F4F4] border border-[#C7C7C7] flex items-center justify-center px-[20px] py-[10px] rounded-[99px] font-dm-sans text-[16px] transition-colors ${
        !disabled
          ? "text-[#1E1E1E] cursor-pointer hover:bg-[#ECECEC]"
          : "text-[#C7C7C7] cursor-not-allowed"
      }`}
    >
      Revert Changes
    </button>
  );
}

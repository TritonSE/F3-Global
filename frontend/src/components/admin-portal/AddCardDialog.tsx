import { useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, file: File) => void;
  toggleNote: true | false;
  title: string;
};

export function AddCardDialog({ open, onClose, onAdd, toggleNote, title }: Props) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleAdd = () => {
    if (name && file) {
      onAdd(name, file);
      setName("");
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onClose();
    }
  };

  const handleClose = () => {
    setName("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/25 flex items-center justify-center z-[100]"
      onClick={handleClose}
    >
      <div
        className="flex flex-col bg-white border border-solid border-[#C7C7C7] rounded-[10px] p-[25px] w-[614px] gap-[25px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[24px] text-[#1E1E1E] font-medium -tracking-[0.48px]">
          Add {title} Logo
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-[#1E1E1E] text-[16px]">{title} Name:</p>
            {toggleNote && (
              <p className="font-normal text-[#5D5D5D] text-[12px] leading-[16px]">
                Abbreviations okay
              </p>
            )}
          </div>
          <input
            className="border border-[#C7C7C7] rounded-[10px] px-[15px] py-[10px] w-[350px] bg-[#F4F4F4] text-[#5D5D5D] text-[16px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-[#1E1E1E] text-[16px]">Image:</p>
            <p className="font-normal text-[#5D5D5D] text-[12px] leading-[16px]">
              Square images preferred
            </p>
          </div>

          <div className="w-[350px] flex items-center">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setFile(selectedFile);
                }
              }}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-[15px] flex-1 cursor-pointer flex justify-between items-start text-[#5D5D5D] min-w-0"
            >
              <div className="flex items-center min-w-0 flex-1">
                {file && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0 mr-[10px]"
                  >
                    <mask
                      id="mask0_1779_2635"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_1779_2635)">
                      <path
                        d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z"
                        fill="#5D5D5D"
                      />
                    </g>
                  </svg>
                )}

                <span className="truncate text-left font-normal">
                  {file ? file.name : "Select image..."}
                </span>
              </div>

              {file && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0 cursor-pointer"
                  >
                    <path
                      d="M8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L10.5858 12L7.29289 15.2929C6.90237 15.6834 6.90237 16.3166 7.29289 16.7071C7.68342 17.0976 8.31658 17.0976 8.70711 16.7071L12 13.4142L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L13.4142 12L16.7071 8.70711C17.0976 8.31658 17.0976 7.68342 16.7071 7.29289C16.3166 6.90237 15.6834 6.90237 15.2929 7.29289L12 10.5858L8.70711 7.29289Z"
                      fill="#5D5D5D"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-[25px]">
          <button
            onClick={handleClose}
            className="px-[20px] py-[10px] border border-[#C7C7C7] rounded-[99px] bg-[#F4F4F4] text-[16px] text-[#1E1E1E] cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={!name || !file}
            onClick={handleAdd}
            className="px-[20px] py-[10px] bg-[#1169B0] text-white rounded-[99px] text-[16px] font-semibold disabled:opacity-50 cursor-pointer"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

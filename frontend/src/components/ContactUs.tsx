import EmailValidatorImport from "email-validator";
import Image from "next/image";
import React, { useRef, useState } from "react";

import { Button } from "@/components/button";

type EmailValidatorType = {
  validate: (email: string) => boolean;
};

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    interestedRole: "",
    fullName: "",
    email: "",
    message: "",
  });

  const [roleError, setRoleError] = useState<string>("");
  const [fullNameError, setFullNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const fadeTimeout = useRef<NodeJS.Timeout | null>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const EmailValidator = EmailValidatorImport as EmailValidatorType;

  const handleRoleSelect = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      interestedRole: prev.interestedRole === role ? "" : role,
    }));
    setRoleError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "fullName") setFullNameError("");
    if (name === "email") setEmailError("");
    if (name === "message") setMessageError("");
  };

  const validateFullName = (name: string): boolean => {
    const fullNameRegex = /^[a-z]{2,}\s+[a-z]{2,}(?:\s+[a-z]{2,})*$/i;
    return fullNameRegex.test(name.trim());
  };

  const handleSubmit = () => {
    let valid = true;

    if (!formData.interestedRole) {
      setRoleError("Please select a role");
      valid = false;
    } else {
      setRoleError("");
    }

    if (!formData.fullName.trim()) {
      setFullNameError("Please enter a valid full name.");
      valid = false;
    } else if (!validateFullName(formData.fullName)) {
      setFullNameError("Please enter a valid full name.");
      valid = false;
    } else {
      setFullNameError("");
    }

    if (!formData.email.trim()) {
      setEmailError("Please enter a valid email.");
      valid = false;
    } else if (!EmailValidator.validate(formData.email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!formData.message.trim()) {
      setMessageError("Please enter your message.");
      valid = false;
    } else {
      setMessageError("");
    }

    if (!valid) return;

    setFormData({
      interestedRole: "",
      fullName: "",
      email: "",
      message: "",
    });

    setShowConfirm(true);
    setFadeOut(false);

    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);

    fadeTimeout.current = setTimeout(() => {
      setFadeOut(true);
      hideTimeout.current = setTimeout(() => {
        setShowConfirm(false);
        setFadeOut(false);
      }, 450);
    }, 5000);
  };

  return (
    <>
      <div className="flex w-full py-[50px] flex-col align-center gap-[10px]">
        <div
          className="relative flex flex-col items-end gap-[20px] w-[1312px] px-[100px] py-[40px] rounded-[10px] bg-white"
          style={{
            boxShadow: "10px 6px 60px 0 rgba(1, 32, 96, 0.20)",
          }}
        >
          <div className="flex flex-col items-start gap-[30px] self-stretch">
            <h2 className="self-stretch text-black font-ethic text-[68px] mb-[-24px]">
              Contact Us
            </h2>
            <p className="font-dm-sans font-normal text-[22px] leading-[32px]">
              Want to learn more? Fill out the form below to contact one of our representatives!
            </p>
            <div className="flex flex-col content-center items-start gap-[30px] content-between">
              <div className="flex flex-row gap-[20px]">
                <div className="flex flex-col content-center items-start gap-[10px] self-stretch">
                  <p className="text-black font-dm-sans text-[14px] font-normal leading-[24px]">
                    I’m interested in becoming...
                    <span
                      className={`ml-2 text-[12px] ${roleError ? "text-[#B93B3B]" : "text-[#888]"}`}
                    >
                      (choose one)
                    </span>
                  </p>
                  <div className="flex items-center gap-[12px]">
                    <Button
                      text="Donor"
                      className={
                        formData.interestedRole === "donor"
                          ? "w-[88px] p-[4px] bg-[#172447] content-center items-center gap-[10px] rounded-[99px]"
                          : "w-[88px] p-[4px] content-center items-center gap-[10px] rounded-[99px] border transition-colors hover:duration-450 hover:ease-in-out hover:bg-[#A5D0F2]"
                      }
                      textClassName={
                        formData.interestedRole === "donor"
                          ? "font-dm-sans text-[14px] text-white"
                          : "font-dm-sans text-[14px] text-black"
                      }
                      onClick={() => handleRoleSelect("donor")}
                    />
                    <Button
                      text="Member"
                      className={
                        formData.interestedRole === "member"
                          ? "w-[88px] p-[4px] bg-[#172447] content-center items-center gap-[10px] rounded-[99px]"
                          : "w-[88px] p-[4px] content-center items-center gap-[10px] rounded-[99px] border transition-colors hover:duration-450 hover:ease-in-out hover:bg-[#A5D0F2]"
                      }
                      textClassName={
                        formData.interestedRole === "member"
                          ? "font-dm-sans text-[14px] text-white"
                          : "font-dm-sans text-[14px] text-black"
                      }
                      onClick={() => handleRoleSelect("member")}
                    />
                    <Button
                      text="Client"
                      className={
                        formData.interestedRole === "client"
                          ? "w-[88px] p-[4px] bg-[#172447] content-center items-center gap-[10px] rounded-[99px]"
                          : "w-[88px] p-[4px] content-center items-center gap-[10px] rounded-[99px] border transition-colors hover:duration-450 hover:ease-in-out hover:bg-[#A5D0F2]"
                      }
                      textClassName={
                        formData.interestedRole === "client"
                          ? "font-dm-sans text-[14px] text-white"
                          : "font-dm-sans text-[14px] text-black"
                      }
                      onClick={() => handleRoleSelect("client")}
                    />
                    <Button
                      text="Other"
                      className={
                        formData.interestedRole === "other"
                          ? "w-[88px] p-[4px] bg-[#172447] content-center items-center gap-[10px] rounded-[99px]"
                          : "w-[88px] p-[4px] content-center items-center gap-[10px] rounded-[99px] border transition-colors hover:duration-450 hover:ease-in-out hover:bg-[#A5D0F2]"
                      }
                      textClassName={
                        formData.interestedRole === "other"
                          ? "font-dm-sans text-[14px] text-white"
                          : "font-dm-sans text-[14px] text-black"
                      }
                      onClick={() => handleRoleSelect("other")}
                    />
                  </div>
                  <div
                    className={`flex w-[487px] px-[20px] py-[10px] items-center gap-[10px] rounded-[10px] mt-4 mb-[-1px]
                      ${fullNameError ? "bg-[#FFDEDE] border border-[#B93B3B] mb-[-2px]" : "bg-[#F4F4F4]"}
                    `}
                  >
                    <input
                      className="font-dm-sans text-[14px] text-normal leading-[24px] text-[#5D5D5D] bg-transparent outline-none w-full"
                      type="text"
                      name="fullName"
                      placeholder="Full name *"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="relative left-0 top-[-6px] w-full pointer-events-none h-[8px]">
                    {fullNameError ? (
                      <p className="m-0 p-0 text-[11px] font-dm-sans text-[#B93B3B]">
                        {fullNameError}
                      </p>
                    ) : null}
                  </div>
                  <div
                    className={`"flex w-[487px] px-[20px] py-[10px] items-center gap-[10px] rounded-[10px] mt-[-4px]"
                      ${emailError ? "bg-[#FFDEDE] border border-[#B93B3B]" : "bg-[#F4F4F4]"}
                    `}
                  >
                    <input
                      className="font-dm-sans text-[14px] text-normal leading-[24px] text-[#5D5D5D] bg-transparent outline-none w-full"
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    {emailError ? (
                      <p className="m-0 mt-[-7px] p-0 text-[11px] font-dm-sans text-[#B93B3B]">
                        {emailError}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col item-end gap-[20px]">
                  <div
                    className={`"flex w-[605px] h-[208px] px-[20px] py-[14px] items-start gap-[10px] rounded-[10px] "
                      ${messageError ? "bg-[#FFDEDE] border border-[#B93B3B]" : "bg-[#F4F4F4]"}
                    `}
                  >
                    <textarea
                      className="font-dm-sans text-[14px] text-normal leading-[24px] text-[#5D5D5D] bg-transparent outline-none w-full h-full resize-none"
                      name="message"
                      placeholder="Message *"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    {messageError ? (
                      <p className="pos-absolute m-0 mt-[-16px] mb-[-10px] p-0 text-[11px] font-dm-sans text-[#B93B3B]">
                        {messageError}
                      </p>
                    ) : null}
                  </div>
                  <Button
                    text="Send"
                    className="flex px-[14px] py-[4px] content-center items-center rounded-[99px] bg-[#172447] self-end transition-colors duration-450 ease-in-out hover:bg-[#1169B0]"
                    textClassName="text-white text-center font-dm-sans font-normal text-[12px] leading-[24px]"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showConfirm && (
          <div
            className={`absolute inset-0 z-50 top-250 flex items-center justify-center transition-opacity duration-450 ${fadeOut ? "opacity-0" : "opacity-100"}`}
          >
            <div
              className="flex flex-col justify-center items-center gap-[20px] py-[50px] px-[100px] bg-white rounded-[16px] border border-[#F4F4F4]"
              style={{ boxShadow: "0 4px 20px 0 rgba(0,0,0,0.10" }}
            >
              <Image
                src="/imgs/confirmation_check_icon.svg"
                alt="Confirmation Check Icon"
                width={118}
                height={118}
              />
              <h3 className="font-dm-sans text-[48px] text-[#1E1E1E] font-normal font-xl font-bold mb-2 leading-[-1px]">
                Thank You!
              </h3>
              <p className="font-dm-sans text-[24px] text-[#5D5D5D] font-normal leading-[32px]">
                We’ve received your message and will be in touch soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

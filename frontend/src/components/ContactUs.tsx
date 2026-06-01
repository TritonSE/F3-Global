"use client";

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
    }, 2000);
  };

  return (
    <>
      <div className="flex w-full flex-col items-center gap-[10px] px-[30px] py-[50px] min-[1312px]:px-0">
        <div className="relative flex w-full max-w-[1312px] flex-col items-end gap-[20px] rounded-[10px] bg-white px-[30px] py-[30px] shadow-[2.721px_1.633px_6.803px_rgba(1,32,96,0.2)] min-[1312px]:px-[100px] min-[1312px]:py-[40px] min-[1312px]:shadow-[10px_6px_60px_0_rgba(1,32,96,0.20)]">
          <div className="flex w-full flex-col items-start gap-[20px] self-stretch min-[1312px]:gap-[30px]">
            <h2 className="self-stretch mb-[-8px] font-ethic text-[48px] text-black min-[1312px]:mb-[-24px] min-[1312px]:text-[80px]">
              Contact Us
            </h2>
            <p className="max-w-[290px] font-dm-sans text-[14px] font-normal leading-[20px] min-[1312px]:max-w-none min-[1312px]:text-[20px] min-[1312px]:leading-[32px]">
              Want to learn more? Fill out the form below to contact one of our representatives!
            </p>
            <div className="flex w-full flex-col gap-[20px] min-[1312px]:gap-[30px]">
              <div className="flex w-full flex-col gap-[0px] min-[1312px]:flex-row min-[1312px]:gap-[20px]">
                <div className="flex w-full flex-col items-start gap-[10px] self-stretch min-[1312px]:w-auto">
                  <p className="font-dm-sans text-[12px] font-normal leading-[20px] text-black min-[1312px]:text-[16px] min-[1312px]:leading-[24px] min-[1312px]:!font-[400]">
                    I’m interested in becoming... (choose one)
                  </p>
                  {/* role selection buttons */}
                  <div className="flex flex-wrap items-center gap-[8px] min-[1312px]:gap-[12px]">
                    <Button
                      text="Donor"
                      className={
                        formData.interestedRole === "donor"
                          ? "rounded-[99px] border bg-[#172447] px-[16px] py-[8px] w-auto min-[1312px]:py-[4px] min-[1312px]:w-[88px]"
                          : "rounded-[99px] border px-[16px] py-[8px] w-auto min-[1312px]:py-[4px] min-[1312px]:w-[88px] transition-colors hover:duration-450 hover:ease-in-out hover:bg-[#A5D0F2] cursor-pointer"
                      }
                      textClassName={
                        formData.interestedRole === "donor"
                          ? "font-dm-sans text-[12px] text-white !font-[400] min-[1312px]:text-[14px]"
                          : "font-dm-sans text-[12px] text-black !font-[400] min-[1312px]:text-[14px]"
                      }
                      onClick={() => handleRoleSelect("donor")}
                    />
                    <Button
                      text="Member"
                      className={
                        formData.interestedRole === "member"
                          ? "rounded-[99px] border bg-[#172447] px-[16px] py-[8px] w-auto min-[1312px]:py-[4px] min-[1312px]:w-[88px]"
                          : "rounded-[99px] border px-[16px] py-[8px] w-auto min-[1312px]:py-[4px] min-[1312px]:w-[88px] transition-colors hover:duration-450 hover:ease-in-out hover:bg-[#A5D0F2] cursor-pointer"
                      }
                      textClassName={
                        formData.interestedRole === "member"
                          ? "font-dm-sans text-[12px] text-white !font-[400] min-[1312px]:text-[14px]"
                          : "font-dm-sans text-[12px] text-black !font-[400] min-[1312px]:text-[14px]"
                      }
                      onClick={() => handleRoleSelect("member")}
                    />
                    <Button
                      text="Client"
                      className={
                        formData.interestedRole === "client"
                          ? "rounded-[99px] border bg-[#172447] px-[16px] py-[8px] w-auto min-[1312px]:py-[4px] min-[1312px]:w-[88px]"
                          : "rounded-[99px] border px-[16px] py-[8px] w-auto min-[1312px]:py-[4px] min-[1312px]:w-[88px] transition-colors hover:duration-450 hover:ease-in-out hover:bg-[#A5D0F2] cursor-pointer"
                      }
                      textClassName={
                        formData.interestedRole === "client"
                          ? "font-dm-sans text-[12px] text-white !font-[400] min-[1312px]:text-[14px]"
                          : "font-dm-sans text-[12px] text-black !font-[400] min-[1312px]:text-[14px]"
                      }
                      onClick={() => handleRoleSelect("client")}
                    />
                    <Button
                      text="Other"
                      className={
                        formData.interestedRole === "other"
                          ? "rounded-[99px] border bg-[#172447] px-[16px] py-[8px] w-auto min-[1312px]:py-[4px] min-[1312px]:w-[88px]"
                          : "rounded-[99px] border px-[16px] py-[8px] w-auto min-[1312px]:py-[4px] min-[1312px]:w-[88px] transition-colors hover:duration-450 hover:ease-in-out hover:bg-[#A5D0F2] cursor-pointer"
                      }
                      textClassName={
                        formData.interestedRole === "other"
                          ? "font-dm-sans text-[12px] text-white !font-[400] min-[1312px]:text-[14px]"
                          : "font-dm-sans text-[12px] text-black !font-[400] min-[1312px]:text-[14px]"
                      }
                      onClick={() => handleRoleSelect("other")}
                    />
                  </div>
                  {/* full name input */}
                  <div
                    className={`mt-[10px] flex w-full items-center gap-[10px] rounded-[10px] px-[15px] py-[10px] min-[1312px]:w-[487px] min-[1312px]:px-[20px]
                      ${fullNameError ? "mb-[-2px] border border-[#B93B3B] bg-[#FFDEDE]" : "bg-[#F4F4F4]"}
                    `}
                  >
                    <input
                      className="w-full bg-transparent font-dm-sans text-[14px] leading-[20px] text-[#1E1E1E] outline-none min-[1312px]:text-[16px] min-[1312px]:leading-[24px]"
                      type="text"
                      name="fullName"
                      placeholder="Full Name *"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* full name error message */}

                  {fullNameError ? (
                    <div className="relative left-0 top-[-4px] w-full pointer-events-none h-[8px]">
                      <p className="m-0 p-0 font-dm-sans text-[12px] text-[#B93B3B]">
                        {fullNameError}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-[-10px] min-[1312px]:mt-[8px]"></div>
                  )}

                  {/* email input */}
                  <div
                    className={`flex w-full items-center gap-[10px] rounded-[10px] px-[15px] py-[10px] min-[1312px]:w-[487px] min-[1312px]:px-[20px]
                      ${emailError ? "border border-[#B93B3B] bg-[#FFDEDE]" : "bg-[#F4F4F4]"}
                    `}
                  >
                    <input
                      className="w-full bg-transparent font-dm-sans text-[14px] leading-[20px] text-[#1E1E1E] outline-none min-[1312px]:text-[16px] min-[1312px]:leading-[24px]"
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* email error message */}

                  {emailError ? (
                    <div className="relative left-0 top-[-4px] w-full pointer-events-none h-[8px] mb-[10px] min-[1312px]:mb-0 ">
                      <p className="m-0 p-0 font-dm-sans text-[12px] text-[#B93B3B]">
                        {emailError}
                      </p>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="flex flex-col gap-[20px] min-[1312px]:items-end">
                  {/* message input */}
                  <div
                    className={`flex h-[208px] w-full items-start gap-[10px] rounded-[10px] px-[15px] py-[10px] min-[1312px]:w-[605px] min-[1312px]:px-[20px] min-[1312px]:py-[14px]
                      ${messageError ? "border border-[#B93B3B] bg-[#FFDEDE]" : "bg-[#F4F4F4]"}
                    `}
                  >
                    <textarea
                      className="h-full w-full resize-none bg-transparent font-dm-sans text-[14px] leading-[20px] text-[#1E1E1E] outline-none min-[1312px]:text-[16px] min-[1312px]:leading-[24px]"
                      name="message"
                      placeholder="Message *"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* message error message */}
                  <div>
                    {messageError ? (
                      <p className="m-0 mt-[-16px] mb-[-10px] p-0 font-dm-sans text-[12px] text-[#B93B3B]">
                        {messageError}
                      </p>
                    ) : null}
                  </div>
                  <Button
                    text="SEND"
                    className="mt-[-12px] flex self-end rounded-[99px] bg-[#172447] px-[14px] py-[10px] transition-colors duration-450 ease-in-out hover:bg-[#1169B0] hover:border-[#1169B0] cursor-pointer"
                    textClassName="font-dm-sans text-[14px] font-light leading-[20px] text-center text-white min-[1312px]:text-[16px] min-[1312px]:leading-[24px]"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showConfirm && (
          <div
            className={`absolute inset-0 z-50 flex items-center justify-center transition-opacity duration-450 ${fadeOut ? "opacity-0" : "opacity-100"}`}
          >
            <div
              className="flex flex-col items-center justify-center gap-[10px] min-[1312px]:gap-[20px] rounded-[16px] border border-[#F4F4F4] bg-white py-[30px] px-[30px] min-[1312px]:py-[50px] min-[1312px]:px-[100px]"
              style={{ boxShadow: "0 4px 10px 0 rgba(0,0,0,0.10)" }}
            >
              <Image
                src="/imgs/confirmation_check_icon.svg"
                alt="Confirmation Check Icon"
                width={118}
                height={118}
                className="size-[60px] md:size-[118px]"
              />
              <h3 className="font-dm-sans text-center text-[24px] md:text-[48px] text-[#1E1E1E] font-medium leading-[1.5] tracking-[-0.48px] md:tracking-[-0.96px]">
                Thank You!
              </h3>
              <p className="w-[202px] md:w-auto text-center font-dm-sans text-[14px] md:text-[20px] text-[#5D5D5D] font-normal leading-[20px] md:leading-[32px] md:whitespace-nowrap">
                We’ve received your message and will be in touch soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

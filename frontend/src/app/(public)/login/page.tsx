"use client";

import EmailValidatorImport from "email-validator";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/button";
import { auth } from "@/firebase/firebase";

type EmailValidatorType = {
  validate: (email: string) => boolean;
};

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isForgot, setForgot] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetInitiated, setResetInitiated] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/admin-portal");
    });
    return () => unsubscribe();
  }, [router]);

  const EmailValidator = EmailValidatorImport as EmailValidatorType;

  const toggleForgot = (state: boolean) => {
    setForgot(state);
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
    setFirebaseError("");
    setResetSent(false);
    setResetInitiated(false);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!email.trim()) {
      setEmailError("Please enter your email.");
      valid = false;
    } else if (!EmailValidator.validate(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin-portal");
    } catch {
      setFirebaseError("Your email and password combination is incorrect.");
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetSent) return;

    let valid = true;

    if (!email.trim()) {
      setEmailError("Please enter your email.");
      valid = false;
    } else if (!EmailValidator.validate(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!valid) return;

    void sendPasswordResetEmail(auth, email).catch(() => {});

    setResetSent(true);
    setResetInitiated(true);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setResetSent(false);
    }, 60000);
  };

  return (
    <>
      <div
        className="h-[100vh] relative overflow-hidden flex justify-center items-center"
        style={{
          backgroundImage: "url('/imgs/login.png')",
          backgroundSize: "100% auto",
          backgroundPosition: "left 30%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Link
          href="/"
          className="absolute -top-[10px] -left-[10px] group z-0 inline-flex px-[20px] py-[10px] justify-end items-center gap-[10px] pl-[50px] pt-[50px] cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="12"
            viewBox="0 0 11 11"
            fill="none"
          >
            <path
              d="M1.00001 2.931e-07C0.447722 -3.81249e-07 6.54983e-06 0.447715 7.22418e-06 1L5.47509e-06 8.07107C5.13791e-06 8.62335 0.447721 9.07107 1.00001 9.07107C1.55229 9.07107 2.00001 8.62335 2.00001 8.07107L2.00001 3.41421L8.77818 10.1924C9.1687 10.5829 9.80187 10.5829 10.1924 10.1924C10.5829 9.80186 10.5829 9.1687 10.1924 8.77817L3.41422 2L8.07107 2C8.62336 2 9.07107 1.55228 9.07107 1C9.07107 0.447715 8.62336 -1.0556e-06 8.07107 -3.81249e-07L1.00001 2.931e-07Z"
              fill="white"
            />
          </svg>
          <p className="text-white font-dm-sans text-[16px] font-[600] leading-[1.5] transition-all duration-300 ease-in-out group-hover:translate-x-[10px] underline decoration-transparent group-hover:decoration-white decoration-[7%] decoration-solid underline-offset-2">
            F3GLOBAL.ORG
          </p>
        </Link>

        {/* dialog */}
        <div className="z-10 flex flex-col items-center gap-[40px] w-[614px] p-[50px] rounded-[10px] bg-[#FFF] border border-[#C7C7C7] mt-[-150px]">
          {isForgot ? (
            <>
              <form
                onSubmit={(e) => void handleForgot(e)}
                noValidate
                className="flex flex-col items-center gap-[25px] self-stretch"
              >
                <div className="self-stretch">
                  <h2 className="text-[#172447] font-dm-sans text-[32px] font-[500] leading-[1.5] tracking-[-0.64px]">
                    Forgot Password?
                  </h2>
                  <p className="mt-[10px] text-[#5D5D5D] font-dm-sans font-[12px] font-[400] leading-[16px]">
                    {resetInitiated
                      ? "A reset link has been sent. It expires in 1 hour. After that, you’ll have to request another one"
                      : "Enter your email and we’ll send you a link to reset."}
                  </p>
                </div>
                <div className="flex flex-col w-full items-center">
                  <div
                    className={`flex w-[514px] px-[20px] py-[10px] items-center gap-[10px] rounded-[99px] border transition-colors
                  ${emailError ? "border-[#B93B3B] bg-[#FFDEDE]" : "border-[#C7C7C7] bg-white"}
                `}
                  >
                    <input
                      className={`bg-transparent outline-none w-full font-dm-sans text-[24px] font-[500] leading-[1.5] tracking-[-0.48px]
                    ${email.length > 0 ? "text-black" : "text-[#C7C7C7]"}
                  `}
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                    />
                  </div>
                  <div className="relative w-[514px] h-[8px] mt-[5px]">
                    {emailError && (
                      <p className="absolute left-4 top-0 m-0 p-0 text-[12px] font-dm-sans text-[#B93B3B] leading-[16px]">
                        {emailError}
                      </p>
                    )}
                  </div>
                </div>
                <hr className="w-[514px] bg-[#C7C7C7]" />
                {resetSent ? (
                  <Button
                    text="Reset Link Sent"
                    type="button"
                    disabled
                    className="flex w-full py-[10px] px-[20px] justify-center items-center gap-[10px] rounded-[99px] bg-[#3BB966] cursor-not-allowed"
                    textClassName="text-white font-dm-sans text-[24px] font-[500] leading-[1.5] tracking-[-0.48px]"
                    trailingIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <mask
                          id="mask0_1451_725"
                          style={{ maskType: "luminance" }}
                          maskUnits="userSpaceOnUse"
                          x="1"
                          y="1"
                          width="28"
                          height="28"
                        >
                          <path
                            d="M15 27.4999C16.6418 27.5019 18.2679 27.1795 19.7847 26.5512C21.3015 25.9229 22.6793 25.001 23.8388 23.8386C25.0012 22.6792 25.923 21.3014 26.5513 19.7846C27.1796 18.2677 27.502 16.6417 27.5 14.9999C27.502 13.3581 27.1796 11.732 26.5513 10.2152C25.923 8.69836 25.0012 7.32062 23.8388 6.16114C22.6793 4.99874 21.3015 4.0769 19.7847 3.44858C18.2679 2.82027 16.6418 2.49786 15 2.49989C13.3582 2.49786 11.7322 2.82027 10.2153 3.44858C8.69848 4.0769 7.32074 4.99874 6.16126 6.16114C4.99886 7.32062 4.07702 8.69836 3.44871 10.2152C2.82039 11.732 2.49798 13.3581 2.50001 14.9999C2.49798 16.6417 2.82039 18.2677 3.44871 19.7846C4.07702 21.3014 4.99886 22.6792 6.16126 23.8386C7.32074 25.001 8.69848 25.9229 10.2153 26.5512C11.7322 27.1795 13.3582 27.5019 15 27.4999Z"
                            fill="white"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 15L13.75 18.75L21.25 11.25"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </mask>
                        <g mask="url(#mask0_1451_725)">
                          <path d="M0 0H30V30H0V0Z" fill="white" />
                        </g>
                      </svg>
                    }
                  />
                ) : (
                  <Button
                    text="Send Reset Link"
                    type="submit"
                    className="flex w-full py-[10px] px-[20px] justify-center items-center gap-[10px] rounded-[99px] bg-[#172447] cursor-pointer hover:bg-[#1169B0] transition-colors"
                    textClassName="text-white font-dm-sans text-[24px] font-[500] leading-[1.5] tracking-[-0.48px]"
                  />
                )}
                <Button
                  text="Cancel"
                  type="button"
                  className="flex w-full py-[10px] px-[20px] justify-center items-center gap-[10px] rounded-[99px] bg-[#F4F4F4] cursor-pointer hover:bg-[#C7C7C7] hover:border-black transition-colors border border-[#C7C7C7] mt-[-10px]"
                  textClassName="text-black font-dm-sans text-[24px] font-[500] leading-[1.5] tracking-[-0.48px]"
                  onClick={() => toggleForgot(false)}
                />
                <p className="w-[335px] text-[#5D5D5D] text-center font-dm-sans text-[12px] font-[400] leading-[16px] mt-[15px]">
                  Don’t know the login? Contact info@f3global.org if you think this is a mistake.
                </p>
              </form>
            </>
          ) : (
            <>
              <h2 className="self-stretch text-[#172447] font-dm-sans text-[32px] font-[500] leading-[1.5] tracking-[-0.64px]">
                Welcome Back, F3 Global
              </h2>

              <form
                onSubmit={(e) => void handleLogin(e)}
                noValidate
                className="flex flex-col items-center gap-[12.5px] self-stretch w-full"
              >
                <div className="flex flex-col w-full items-center">
                  <div
                    className={`flex w-[514px] px-[20px] py-[10px] items-center gap-[10px] rounded-[99px] border transition-colors
                  ${emailError || firebaseError ? "border-[#B93B3B] bg-[#FFDEDE]" : "border-[#C7C7C7] bg-white"}
                `}
                  >
                    <input
                      className={`bg-transparent outline-none w-full font-dm-sans text-[24px] font-[500] leading-[1.5] tracking-[-0.48px]
                    ${email.length > 0 ? "text-black" : "text-[#C7C7C7]"}
                  `}
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                        if (firebaseError) setFirebaseError("");
                      }}
                    />
                  </div>
                  <div className="relative w-[514px] h-[8px] mt-[5px]">
                    {emailError && (
                      <p className="absolute left-4 top-0 m-0 p-0 text-[12px] font-dm-sans text-[#B93B3B] leading-[16px]">
                        {emailError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-[15px] self-stretch">
                  <div
                    className={`flex w-[514px] px-[20px] py-[10px] items-center gap-[10px] rounded-[99px] border transition-colors
                  ${passwordError || firebaseError ? "border-[#B93B3B] bg-[#FFDEDE]" : "border-[#C7C7C7] bg-white"}
                `}
                  >
                    <input
                      className={`bg-transparent outline-none w-full font-dm-sans text-[24px] font-[500] leading-[1.5] tracking-[-0.48px]
                    ${password.length > 0 ? "text-black" : "text-[#C7C7C7]"}
                  `}
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError("");
                        if (firebaseError) setFirebaseError("");
                      }}
                    />
                  </div>
                  <div className="relative w-[514px] h-[8px]">
                    {(passwordError || firebaseError) && (
                      <p className="absolute left-4 top-[-6px] m-0 p-0 text-[12px] font-dm-sans text-[#B93B3B]">
                        {passwordError || firebaseError}
                      </p>
                    )}
                  </div>

                  <div className="flex w-[514px] height-[16px] justify-center items-center mt-[-20px]">
                    <p
                      className="flex-[1_0_0] text-[#5D5D5D] text-right font-dm-sans text-[12px] font-[400] leading-[16px] cursor-pointer hover:text-[#A5D0F2] transition-colors"
                      onClick={() => toggleForgot(true)}
                    >
                      Forgot password?
                    </p>
                  </div>
                  <hr className="w-[514px] bg-[#C7C7C7]" />
                </div>

                <Button
                  text="Log In"
                  type="submit"
                  className="flex w-full py-[10px] px-[20px] justify-center items-center gap-[10px] rounded-[99px] bg-[#172447] cursor-pointer hover:bg-[#1169B0] transition-colors"
                  textClassName="text-white font-dm-sans text-[24px] font-[500] leading-[1.5] tracking-[-0.48px]"
                />
              </form>

              <p className="w-[335px] text-[#5D5D5D] text-center font-dm-sans text-[12px] font-[400] leading-[16px]">
                Don’t know the login? Contact info@f3global.org if you think this is a mistake.
              </p>
            </>
          )}
        </div>

        {/* F3GLOBAL */}
        <div
          className="absolute -bottom-[80px] left-[35px] w-[2000px] h-[400px] bg-white/10 backdrop-blur-[10px] z-0 pointer-events-none"
          style={{ clipPath: "url(#text-clip)" }}
        ></div>

        <svg className="absolute -bottom-[80px] left-[35px] z-0 select-none pointer-events-none w-full h-[400px] overflow-visible">
          <defs>
            <clipPath id="text-clip">
              <text x="0" y="300" className="font-['Ethic_New'] text-[305px] font-light">
                <tspan fontStyle="italic">F3</tspan>
                <tspan fontStyle="normal">GLOBAL</tspan>
              </text>
            </clipPath>
          </defs>

          <text
            x="0"
            y="300"
            className="font-['Ethic_New'] text-[305px] font-light"
            fill="transparent"
            stroke="#FFF"
            strokeWidth="2"
          >
            <tspan fontStyle="italic">F3</tspan>
            <tspan fontStyle="normal">GLOBAL</tspan>
          </text>
        </svg>
      </div>
    </>
  );
}

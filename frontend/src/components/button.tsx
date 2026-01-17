"use client";

import { useRouter } from "next/navigation";
import React from "react";

import styles from "./button.module.css";

type ButtonProps = {
    text: string;
    onClick_link?: string;
} & React.ComponentProps<"button">

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ text, onClick_link, ...props }, ref) => {
        const router = useRouter();

        return (
            <button
                ref={ref}
                onClick={() => router.push(onClick_link || "/")}
                className={styles.button}
                {...props}
            >
                <p className={styles.buttonText}>{text}</p>
            </button>
        );
    }
);
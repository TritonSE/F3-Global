import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";

import { ProtectedLayout } from "@/components/admin-portal/ProtectedLayout";

import "./globals.css";

import { AdminProvider } from "@/components/admin-portal/AdminContext";
import { AdminSidebar } from "@/components/admin-portal/AdminSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F3 Global Admin Portal",
  description: "F3 Global's Admin Portal",
  icons: {
    icon: "/f3logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProtectedLayout>
          <AdminProvider>
            <AdminSidebar />
            <div className="ml-[203px]">{children}</div>
          </AdminProvider>
        </ProtectedLayout>
      </body>
    </html>
  );
}

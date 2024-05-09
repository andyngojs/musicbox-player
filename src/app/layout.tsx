import React from "react";
import { Figtree } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "./globals.scss";

import StoreProvider from "@/app/StoreProvider";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";

const font = Figtree({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Music Player",
  description: "Listen to Music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <StoreProvider>
          <Toaster position="top-center" />

          <Sidebar>{children}</Sidebar>
          <Player />
        </StoreProvider>
      </body>
    </html>
  );
}

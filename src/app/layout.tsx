import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import StoreProvider from "@/app/StoreProvider";
import Sidebar from "@/components/Sidebar";
import "./globals.scss";

const font = Figtree({ subsets: ["latin"] });

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
          <Sidebar>{children}</Sidebar>
        </StoreProvider>
      </body>
    </html>
  );
}

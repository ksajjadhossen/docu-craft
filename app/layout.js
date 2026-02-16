import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { getDocuments } from "@/lib/doc";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Docu-craft - A documentary website by Protocol",
  description: "Docu-craft - A documentary website by Protocol",
};

export default function RootLayout({ children }) {
  const allDocuments = getDocuments();
  console.log(allDocuments);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

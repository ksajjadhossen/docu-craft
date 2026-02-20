import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { getDocuments } from "@/lib/doc";
import { Suspense } from "react";

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

  return (
    <html lang="en">
      {/* এখানে inter এর বদলে geistSans ব্যবহার করা হয়েছে */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="h-full lg:ml-72 xl:ml-80">
          <Suspense fallback={<Loading />}>
            <Header docs={allDocuments} />
            <div className="relative px-4 pt-14 sm:px-6 lg:px-8">
              <main className="flex-auto py-16">
                <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
                  <div className="absolute left-1/2 top-0 ml-152 h-100 w-325 dark:mask-[linear-gradient(white,transparent)]">
                    <div className="absolute inset-0 bg-linear-to-r from-[#36b49f] to-[#DBFF75] opacity-40 mask-[radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100"></div>
                  </div>
                </div>
                {children}
              </main>
            </div>
          </Suspense>
        </div>
      </body>
    </html>
  );
}

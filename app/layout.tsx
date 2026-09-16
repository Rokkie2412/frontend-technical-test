import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { TopbarNavigation } from "@/components";

import Providers from './providers'
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movies DB",
  description: "Movies DB For Technical Test",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} flex flex-1 flex-col h-full antialiased`}
    >
      <body className="flex flex-1 flex-col">
        <Providers>
          <Suspense>
            <TopbarNavigation/> 
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}

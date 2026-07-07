import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Drone Club One",
  description: "Drone Club is a student led community of drone enthusiasts at Full Sail University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background h-full flow-root">
        <NavBar />
        <Toaster richColors position="top-right" />
        <main className="h-full mx-auto px-4 sm:px-12 lg:px-24 pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}

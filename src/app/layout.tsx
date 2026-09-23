import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Md. Shadikur Rahman Shadik | AI / Software Engineer",
  description: "Portfolio of Md. Shadikur Rahman Shadik, an AI / Software Engineer from Sylhet, Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // suppressHydrationWarning: extensions (password managers, Foxified, dark-mode
  // add-ons) stamp attributes onto <html> before React hydrates, which React
  // otherwise reports as a mismatch. It only covers this element's own attributes.
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-ink text-fg flex flex-col relative overflow-x-hidden">
        <ScrollProgress />
        <CustomCursor />
        <AnimatedBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

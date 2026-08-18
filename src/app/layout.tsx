import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import "@/styles/effects.css";
import "@/styles/effects-extra.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSSHUB — 64+ Curated CSS Effects with Live Studio",
  description:
    "CSSHUB: A modern library of 64+ beautiful, production-ready CSS effects with 8-way resizable Live Studio, real-time code editing, and 1-click export. Browse, customize, and copy code instantly.",
  keywords: [
    "CSS effects",
    "CSS animations",
    "CSS transitions",
    "hover effects",
    "loading spinners",
    "text effects",
    "3D CSS",
    "CSS shadows",
    "CSS borders",
    "CSS code",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

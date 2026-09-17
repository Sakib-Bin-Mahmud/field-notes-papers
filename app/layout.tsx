import type { Metadata } from "next";
import { Playfair_Display, Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Toaster from "@/components/Toaster";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});
const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Field Notes — Daily Paper Discovery",
  description: "One outstanding paper a day, auto-discovered from arXiv and Semantic Scholar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${mono.variable} ${heading.variable} font-body bg-paper text-ink antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 w-full max-w-5xl mx-auto px-5 sm:px-8 py-8">{children}</main>
          <footer className="border-t border-brass/25 bg-midnight py-6 text-center text-xs font-mono text-paper/50">
            Field Notes <span className="text-brass/70">✦</span> refreshed daily from arXiv &amp; Semantic Scholar
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

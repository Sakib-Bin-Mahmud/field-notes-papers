import type { Metadata } from "next";
import { Source_Serif_4, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Toaster from "@/components/Toaster";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700"],
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Field Notes — Daily Paper Discovery",
  description: "One outstanding paper a day, auto-discovered from arXiv and Semantic Scholar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${sans.variable} ${mono.variable} font-body bg-paper text-ink antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 w-full max-w-5xl mx-auto px-5 sm:px-8 py-8">{children}</main>
          <footer className="border-t border-paper-line py-6 text-center text-xs font-mono text-ink-soft/70">
            Field Notes — refreshed daily from arXiv &amp; Semantic Scholar
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

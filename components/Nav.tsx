"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, NotebookPen, SlidersHorizontal } from "lucide-react";
import CompassMark from "./illustrations/CompassMark";

const LINKS = [
  { href: "/", label: "Today", icon: CalendarDays },
  { href: "/log", label: "Log", icon: NotebookPen },
  { href: "/settings", label: "Settings", icon: SlidersHorizontal },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`border-b bg-paper/95 backdrop-blur sticky top-0 z-20 transition-shadow duration-200 ease-out-soft ${
        scrolled ? "border-paper-line shadow-panel" : "border-paper-line/70"
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <CompassMark className="shrink-0 transition-transform duration-300 ease-spring group-hover:rotate-45" />
          <span className="font-heading font-semibold text-lg tracking-tight text-ink whitespace-nowrap">
            Field Notes
          </span>
        </Link>
        <nav className="flex items-center gap-1 font-mono text-xs uppercase tracking-wide shrink-0">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 px-2.5 sm:px-3 rounded-sm transition-all duration-200 ease-spring ${
                  active
                    ? "bg-ink text-paper shadow-sm"
                    : "text-ink-soft hover:text-ink hover:bg-paper-line/60"
                }`}
              >
                <link.icon size={13} strokeWidth={2.25} aria-hidden />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

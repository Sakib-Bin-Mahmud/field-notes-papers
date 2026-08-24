"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Info, XCircle } from "lucide-react";

type ToastKind = "success" | "info" | "error";
interface ToastItem {
  id: number;
  kind: ToastKind;
  message: string;
}

type Listener = (toast: ToastItem) => void;
const listeners = new Set<Listener>();
let nextId = 1;

export function toast(message: string, kind: ToastKind = "success") {
  const item: ToastItem = { id: nextId++, kind, message };
  listeners.forEach((l) => l(item));
}

const ICONS: Record<ToastKind, typeof CheckCircle2> = {
  success: CheckCircle2,
  info: Info,
  error: XCircle,
};

const TONE: Record<ToastKind, string> = {
  success: "border-core/25 bg-core-bg text-core",
  info: "border-ink/15 bg-white text-ink",
  error: "border-broaden/25 bg-broaden-bg text-broaden",
};

export default function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener: Listener = (item) => {
      setItems((prev) => [...prev, item]);
      setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== item.id));
      }, 3200);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-6"
      role="status"
      aria-live="polite"
    >
      {items.map((item) => {
        const Icon = ICONS[item.kind];
        return (
          <div
            key={item.id}
            className={`flex items-center gap-2 rounded-sm border px-4 py-2.5 shadow-popover animate-toast-in font-mono text-xs uppercase tracking-wide ${TONE[item.kind]}`}
          >
            <Icon size={15} strokeWidth={2} aria-hidden />
            {item.message}
          </div>
        );
      })}
    </div>
  );
}

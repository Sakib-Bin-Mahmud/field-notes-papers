import { LogEntry } from "./types";

const LOG_KEY = "paper-tracker:log";
const SKIPPED_KEY = "paper-tracker:skipped";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getLogEntries(): LogEntry[] {
  if (typeof window === "undefined") return [];
  return safeParse<LogEntry[]>(localStorage.getItem(LOG_KEY), []);
}

export function saveLogEntry(entry: LogEntry) {
  if (typeof window === "undefined") return;
  const entries = getLogEntries();
  const idx = entries.findIndex((e) => e.id === entry.id && e.date === entry.date);
  if (idx >= 0) {
    entries[idx] = entry;
  } else {
    entries.unshift(entry);
  }
  localStorage.setItem(LOG_KEY, JSON.stringify(entries));
}

export function deleteLogEntry(id: string, date: string) {
  if (typeof window === "undefined") return;
  const entries = getLogEntries().filter((e) => !(e.id === id && e.date === date));
  localStorage.setItem(LOG_KEY, JSON.stringify(entries));
}

export function getSkippedIds(): string[] {
  if (typeof window === "undefined") return [];
  return safeParse<string[]>(localStorage.getItem(SKIPPED_KEY), []);
}

export function skipPaper(id: string) {
  if (typeof window === "undefined") return;
  const skipped = new Set(getSkippedIds());
  skipped.add(id);
  localStorage.setItem(SKIPPED_KEY, JSON.stringify(Array.from(skipped)));
}

export function logEntriesToCsv(entries: LogEntry[]): string {
  const headers = [
    "Date",
    "Title",
    "URL",
    "One-Sentence Contribution",
    "Method (My Own Words)",
    "Relevance Tag",
    "Follow-Up Flag",
    "Time Spent (min)",
  ];
  const escape = (v: string | number | null) => {
    const s = v === null || v === undefined ? "" : String(v);
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };
  const rows = entries.map((e) =>
    [
      e.date,
      e.title,
      e.url,
      e.contribution,
      e.method,
      e.relevanceTag,
      e.followUpFlag,
      e.timeSpentMinutes,
    ]
      .map(escape)
      .join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

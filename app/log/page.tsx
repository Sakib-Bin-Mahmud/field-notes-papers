"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LogEntry } from "@/lib/types";
import { deleteLogEntry, getLogEntries, logEntriesToCsv, saveLogEntry } from "@/lib/storage";

const RELEVANCE_TAGS = [
  "Core Research",
  "Method to Learn",
  "Advisor Fit Evidence",
  "Background Reading",
  "Broaden Thinking",
];

const EMPTY_FORM = {
  contribution: "",
  method: "",
  relevanceTag: RELEVANCE_TAGS[0],
  followUpFlag: "",
  timeSpentMinutes: "" as string | number,
};

function LogPageInner() {
  const params = useSearchParams();
  const paperId = params.get("paperId");
  const prefTitle = params.get("title") ?? "";
  const prefUrl = params.get("url") ?? "";

  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [title, setTitle] = useState(prefTitle);
  const [url, setUrl] = useState(prefUrl);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setEntries(getLogEntries());
  }, []);

  useEffect(() => {
    if (prefTitle) setTitle(prefTitle);
    if (prefUrl) setUrl(prefUrl);
  }, [prefTitle, prefUrl]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const entry: LogEntry = {
      id: paperId ?? `manual:${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      title: title.trim(),
      url: url.trim(),
      contribution: form.contribution.trim(),
      method: form.method.trim(),
      relevanceTag: form.relevanceTag,
      followUpFlag: form.followUpFlag.trim(),
      timeSpentMinutes: form.timeSpentMinutes === "" ? null : Number(form.timeSpentMinutes),
    };
    saveLogEntry(entry);
    setEntries(getLogEntries());
    setForm(EMPTY_FORM);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleDelete(id: string, date: string) {
    deleteLogEntry(id, date);
    setEntries(getLogEntries());
  }

  function handleExport() {
    const csv = logEntriesToCsv(entries);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `paper-reading-log-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-2">
          Reading log
        </h1>
        <p className="text-ink-soft max-w-2xl">
          20–30 minutes, four fields, same structure as your spreadsheet tracker. Export to CSV
          any time to fold entries back into it.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="border border-paper-line bg-white/60 rounded-sm p-5 mb-10 space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Paper title"
              className="w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm"
              required
            />
          </div>
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
              URL
            </label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://arxiv.org/abs/..."
              className="w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
            One-sentence contribution
          </label>
          <input
            value={form.contribution}
            onChange={(e) => setForm({ ...form, contribution: e.target.value })}
            placeholder="What's actually new here"
            className="w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
            Method, in your own words
          </label>
          <textarea
            value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value })}
            rows={2}
            className="w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
              Relevance tag
            </label>
            <select
              value={form.relevanceTag}
              onChange={(e) => setForm({ ...form, relevanceTag: e.target.value })}
              className="w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm"
            >
              {RELEVANCE_TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
              Follow-up flag
            </label>
            <input
              value={form.followUpFlag}
              onChange={(e) => setForm({ ...form, followUpFlag: e.target.value })}
              placeholder="Cite later? Email author?"
              className="w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm"
            />
          </div>
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
              Time spent (min)
            </label>
            <input
              type="number"
              min={0}
              value={form.timeSpentMinutes}
              onChange={(e) => setForm({ ...form, timeSpentMinutes: e.target.value })}
              className="w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="px-4 py-2 rounded-sm bg-ink text-paper font-mono text-xs uppercase tracking-wide hover:bg-ink/85 transition-colors"
          >
            Save entry
          </button>
          {saved && <span className="text-sm text-core">Saved.</span>}
        </div>
      </form>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-semibold text-ink">History ({entries.length})</h2>
        {entries.length > 0 && (
          <button
            onClick={handleExport}
            className="px-3 py-1.5 rounded-sm border border-ink/30 font-mono text-xs uppercase tracking-wide hover:bg-ink/5 transition-colors"
          >
            Export CSV ↓
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="text-ink-soft text-sm">Nothing logged yet — your first entry lands here.</p>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <div
              key={`${e.id}-${e.date}`}
              className="border border-paper-line bg-white/50 rounded-sm px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] text-ink-soft/70 mb-0.5">{e.date}</p>
                  <p className="font-display font-semibold text-ink">{e.title}</p>
                  {e.contribution && (
                    <p className="text-sm text-ink-soft mt-1">{e.contribution}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2 font-mono text-[11px] text-ink-soft/70">
                    <span>{e.relevanceTag}</span>
                    {e.timeSpentMinutes !== null && <span>· {e.timeSpentMinutes} min</span>}
                    {e.followUpFlag && <span>· follow-up: {e.followUpFlag}</span>}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(e.id, e.date)}
                  className="font-mono text-[11px] text-ink-soft/60 hover:text-accent shrink-0"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LogPage() {
  return (
    <Suspense fallback={<div className="text-ink-soft text-sm">Loading…</div>}>
      <LogPageInner />
    </Suspense>
  );
}

"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Download, NotebookPen, Search, Trash2 } from "lucide-react";
import { LogEntry } from "@/lib/types";
import { deleteLogEntry, getLogEntries, logEntriesToCsv, saveLogEntry } from "@/lib/storage";
import EmptyState from "@/components/EmptyState";
import HeaderMotif from "@/components/illustrations/HeaderMotif";
import EmptyLog from "@/components/illustrations/EmptyLog";
import { toast } from "@/components/Toaster";

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

const inputClass =
  "w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm transition-colors duration-150";
const labelClass = "block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1";

function LogPageInner() {
  const params = useSearchParams();
  const paperId = params.get("paperId");
  const prefTitle = params.get("title") ?? "";
  const prefUrl = params.get("url") ?? "";

  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [title, setTitle] = useState(prefTitle);
  const [url, setUrl] = useState(prefUrl);

  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("All");

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
    toast("Entry saved to your log", "success");
  }

  function handleDelete(id: string, date: string) {
    deleteLogEntry(id, date);
    setEntries(getLogEntries());
    toast("Entry removed", "info");
  }

  function handleExport() {
    const csv = logEntriesToCsv(entries);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `paper-reading-log-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast(`Exported ${entries.length} ${entries.length === 1 ? "entry" : "entries"} to CSV`, "success");
  }

  const filteredEntries = useMemo(() => {
    let list = entries;
    if (tagFilter !== "All") {
      list = list.filter((e) => e.relevanceTag === tagFilter);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.contribution.toLowerCase().includes(q) ||
          e.method.toLowerCase().includes(q)
      );
    }
    return list;
  }, [entries, search, tagFilter]);

  return (
    <div>
      <div className="relative mb-8 bg-hero-wash -mx-5 sm:-mx-8 px-5 sm:px-8 pt-2 pb-1 rounded-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-ink mb-2 tracking-tight">
              Reading log
            </h1>
            <p className="text-ink-soft max-w-2xl leading-relaxed">
              20–30 minutes, four fields, same structure as your spreadsheet tracker. Export to CSV
              any time to fold entries back into it.
            </p>
          </div>
          <HeaderMotif variant="log" className="hidden sm:block shrink-0 mt-1" />
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="border border-paper-line bg-white/60 rounded-sm shadow-panel p-5 mb-10 space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Paper title"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://arxiv.org/abs/..."
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>One-sentence contribution</label>
          <input
            value={form.contribution}
            onChange={(e) => setForm({ ...form, contribution: e.target.value })}
            placeholder="What's actually new here"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Method, in your own words</label>
          <textarea
            value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value })}
            rows={2}
            className={inputClass}
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Relevance tag</label>
            <select
              value={form.relevanceTag}
              onChange={(e) => setForm({ ...form, relevanceTag: e.target.value })}
              className={inputClass}
            >
              {RELEVANCE_TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Follow-up flag</label>
            <input
              value={form.followUpFlag}
              onChange={(e) => setForm({ ...form, followUpFlag: e.target.value })}
              placeholder="Cite later? Email author?"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Time spent (min)</label>
            <input
              type="number"
              min={0}
              value={form.timeSpentMinutes}
              onChange={(e) => setForm({ ...form, timeSpentMinutes: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-cta-ember text-white font-mono text-xs uppercase tracking-wide shadow-card transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:shadow-card-hover active:translate-y-0"
          >
            <NotebookPen size={13} strokeWidth={2.25} aria-hidden />
            Save entry
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="font-display text-xl font-semibold text-ink">History ({entries.length})</h2>
        {entries.length > 0 && (
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-ink/30 font-mono text-xs uppercase tracking-wide transition-colors hover:bg-ink/5"
          >
            <Download size={13} strokeWidth={2.25} aria-hidden />
            Export CSV
          </button>
        )}
      </div>

      {entries.length > 3 && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search
              size={15}
              strokeWidth={2}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/60"
              aria-hidden
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search logged entries…"
              className="w-full rounded-sm border border-paper-line bg-white/60 py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft/50 transition-colors focus:bg-white"
            />
          </div>
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="rounded-sm border border-paper-line bg-white/50 px-2.5 py-2 font-mono text-[11px] uppercase tracking-wide text-ink-soft transition-colors hover:text-ink sm:w-56"
          >
            <option value="All">All relevance tags</option>
            {RELEVANCE_TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      )}

      {entries.length === 0 ? (
        <EmptyState
          illustration={<EmptyLog />}
          title="Your reading log starts here"
          description="Log a paper from Today's shortlist, or add one manually above — your first entry lands here."
        />
      ) : filteredEntries.length === 0 ? (
        <p className="text-ink-soft text-sm">No entries match your search or filter.</p>
      ) : (
        <div key={`${search}|${tagFilter}`} className="stagger-in space-y-3">
          {filteredEntries.map((e) => (
            <div
              key={`${e.id}-${e.date}`}
              className="group border border-paper-line bg-white/50 rounded-sm px-4 py-3 shadow-card transition-all duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-card-hover hover:border-ink/20"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-ink-soft/70 mb-0.5">{e.date}</p>
                  <p className="font-display font-semibold text-ink">{e.title}</p>
                  {e.contribution && (
                    <p className="text-sm text-ink-soft mt-1 leading-relaxed">{e.contribution}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2 font-mono text-[11px] text-ink-soft/70">
                    <span>{e.relevanceTag}</span>
                    {e.timeSpentMinutes !== null && <span>· {e.timeSpentMinutes} min</span>}
                    {e.followUpFlag && <span>· follow-up: {e.followUpFlag}</span>}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(e.id, e.date)}
                  className="inline-flex min-h-11 items-center gap-1 shrink-0 font-mono text-[11px] text-ink-soft/60 transition-colors hover:text-accent"
                >
                  <Trash2 size={12} strokeWidth={2.25} aria-hidden />
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

"use client";

import { useEffect, useState } from "react";
import { DEFAULT_INTERESTS, INTERESTS_STORAGE_KEY } from "@/lib/interests";
import { InterestGroup, Tier } from "@/lib/types";

const TIERS: Tier[] = ["Core", "Adjacent", "Broaden"];

function emptyGroup(): InterestGroup {
  return {
    id: `custom-${Date.now()}`,
    label: "",
    tier: "Adjacent",
    keywords: [],
    arxivCategories: [],
  };
}

export default function SettingsPage() {
  const [groups, setGroups] = useState<InterestGroup[]>(DEFAULT_INTERESTS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(INTERESTS_STORAGE_KEY);
    if (raw) {
      try {
        setGroups(JSON.parse(raw));
      } catch {
        setGroups(DEFAULT_INTERESTS);
      }
    }
  }, []);

  function updateGroup(id: string, patch: Partial<InterestGroup>) {
    setGroups((gs) => gs.map((g) => (g.id === id ? { ...g, ...patch } : g)));
  }

  function removeGroup(id: string) {
    setGroups((gs) => gs.filter((g) => g.id !== id));
  }

  function addGroup() {
    setGroups((gs) => [...gs, emptyGroup()]);
  }

  function handleSave() {
    const cleaned = groups.filter((g) => g.label.trim() && g.keywords.length > 0);
    localStorage.setItem(INTERESTS_STORAGE_KEY, JSON.stringify(cleaned));
    setGroups(cleaned);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    localStorage.removeItem(INTERESTS_STORAGE_KEY);
    setGroups(DEFAULT_INTERESTS);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-2">
          Research interests
        </h1>
        <p className="text-ink-soft max-w-2xl">
          These groups drive what gets discovered and how it&apos;s tiered on the Today page.
          Keywords are matched against arXiv categories/abstracts and Semantic Scholar search.
        </p>
      </div>

      <div className="space-y-5 mb-8">
        {groups.map((group) => (
          <div key={group.id} className="border border-paper-line bg-white/60 rounded-sm p-5">
            <div className="grid sm:grid-cols-[1fr_140px] gap-4 mb-3">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
                  Label
                </label>
                <input
                  value={group.label}
                  onChange={(e) => updateGroup(group.id, { label: e.target.value })}
                  className="w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
                  Tier
                </label>
                <select
                  value={group.tier}
                  onChange={(e) => updateGroup(group.id, { tier: e.target.value as Tier })}
                  className="w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm"
                >
                  {TIERS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
                  Keywords (comma-separated)
                </label>
                <input
                  value={group.keywords.join(", ")}
                  onChange={(e) =>
                    updateGroup(group.id, {
                      keywords: e.target.value
                        .split(",")
                        .map((k) => k.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
                  arXiv categories (comma-separated, e.g. cs.CV)
                </label>
                <input
                  value={group.arxivCategories.join(", ")}
                  onChange={(e) =>
                    updateGroup(group.id, {
                      arxivCategories: e.target.value
                        .split(",")
                        .map((k) => k.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm"
                />
              </div>
            </div>

            <button
              onClick={() => removeGroup(group.id)}
              className="font-mono text-[11px] text-ink-soft/60 hover:text-accent"
            >
              Remove group
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={addGroup}
          className="px-4 py-2 rounded-sm border border-ink/30 font-mono text-xs uppercase tracking-wide hover:bg-ink/5 transition-colors"
        >
          + Add group
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-sm bg-ink text-paper font-mono text-xs uppercase tracking-wide hover:bg-ink/85 transition-colors"
        >
          Save
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-accent transition-colors"
        >
          Reset to defaults
        </button>
        {saved && <span className="text-sm text-core">Saved. Today&apos;s page will use this next load.</span>}
      </div>
    </div>
  );
}

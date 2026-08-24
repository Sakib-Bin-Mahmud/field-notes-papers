"use client";

import { useEffect, useState } from "react";
import { Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { DEFAULT_INTERESTS, INTERESTS_STORAGE_KEY } from "@/lib/interests";
import { InterestGroup, Tier } from "@/lib/types";
import { toast } from "@/components/Toaster";
import HeaderMotif from "@/components/illustrations/HeaderMotif";

const TIERS: Tier[] = ["Core", "Adjacent", "Broaden"];

const TIER_HOVER_SHADOW: Record<Tier, string> = {
  Core: "hover:shadow-card-core",
  Adjacent: "hover:shadow-card-adjacent",
  Broaden: "hover:shadow-card-broaden",
};

const inputClass =
  "w-full border border-paper-line rounded-sm px-3 py-2 bg-paper focus:bg-white text-sm transition-colors duration-150";
const labelClass = "block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1";

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
    toast("Group removed", "info");
  }

  function addGroup() {
    setGroups((gs) => [...gs, emptyGroup()]);
  }

  function handleSave() {
    const cleaned = groups.filter((g) => g.label.trim() && g.keywords.length > 0);
    localStorage.setItem(INTERESTS_STORAGE_KEY, JSON.stringify(cleaned));
    setGroups(cleaned);
    toast("Saved — Today's page will use this next load", "success");
  }

  function handleReset() {
    localStorage.removeItem(INTERESTS_STORAGE_KEY);
    setGroups(DEFAULT_INTERESTS);
    toast("Reset to default interests", "info");
  }

  return (
    <div>
      <div className="relative mb-8 bg-hero-wash -mx-5 sm:-mx-8 px-5 sm:px-8 pt-2 pb-1 rounded-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-ink mb-2 tracking-tight">
              Research interests
            </h1>
            <p className="text-ink-soft max-w-2xl leading-relaxed">
              These groups drive what gets discovered and how it&apos;s tiered on the Today page.
              Keywords are matched against arXiv categories/abstracts and Semantic Scholar search.
            </p>
          </div>
          <HeaderMotif variant="settings" className="hidden sm:block shrink-0 mt-1" />
        </div>
      </div>

      <div className="stagger-in space-y-5 mb-8">
        {groups.map((group) => (
          <div
            key={group.id}
            className={`border border-paper-line bg-white/60 rounded-sm shadow-panel ${TIER_HOVER_SHADOW[group.tier]} p-5 transition-shadow duration-200 ease-out-soft`}
          >
            <div className="grid sm:grid-cols-[1fr_140px] gap-4 mb-3">
              <div>
                <label className={labelClass}>Label</label>
                <input
                  value={group.label}
                  onChange={(e) => updateGroup(group.id, { label: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Tier</label>
                <select
                  value={group.tier}
                  onChange={(e) => updateGroup(group.id, { tier: e.target.value as Tier })}
                  className={inputClass}
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
                <label className={labelClass}>Keywords (comma-separated)</label>
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
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>arXiv categories (comma-separated, e.g. cs.CV)</label>
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
                  className={inputClass}
                />
              </div>
            </div>

            <button
              onClick={() => removeGroup(group.id)}
              className="inline-flex min-h-11 items-center gap-1.5 font-mono text-[11px] text-ink-soft/60 transition-colors hover:text-accent"
            >
              <Trash2 size={12} strokeWidth={2.25} aria-hidden />
              Remove group
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={addGroup}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-ink/30 font-mono text-xs uppercase tracking-wide transition-colors hover:bg-ink/5"
        >
          <Plus size={13} strokeWidth={2.25} aria-hidden />
          Add group
        </button>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-cta-ember text-white font-mono text-xs uppercase tracking-wide shadow-card transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:shadow-card-hover active:translate-y-0"
        >
          <Save size={13} strokeWidth={2.25} aria-hidden />
          Save
        </button>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:text-accent"
        >
          <RotateCcw size={13} strokeWidth={2.25} aria-hidden />
          Reset to defaults
        </button>
      </div>
    </div>
  );
}

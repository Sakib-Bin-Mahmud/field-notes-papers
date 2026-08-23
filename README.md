# Field Notes — Daily Paper Discovery

Automates the "discovery" half of your reading habit. Every day it pulls fresh
papers from **arXiv** and **Semantic Scholar** for your interest profile, scores
them by recency + keyword match + tier, and shows you a shortlist of ~10. You
pick, log, or skip — no manual searching.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS — same as your portfolio site.
No database: the reading log and skip list live in the browser's `localStorage`,
and the discovery route caches its own response for 24h (`revalidate: 86400`) so
it doesn't hammer the APIs on every visit.

## How it works

- `lib/interests.ts` — your default research interest profile (Core / Adjacent /
  Broaden groups, each with keywords + arXiv categories). Editable at runtime via
  the **Settings** page, which overrides this default in `localStorage`.
- `lib/sources.ts` — server-side fetchers for arXiv's Atom API and Semantic
  Scholar's search API.
- `lib/scoring.ts` — ranks and dedupes results, caps papers per group so one
  topic doesn't crowd out the rest.
- `app/api/discover/route.ts` — orchestrates the above, returns today's shortlist.
- `app/page.tsx` — **Today**: the shortlist, with "Log this one" and "Skip".
- `app/log/page.tsx` — **Log**: the same four fields as your spreadsheet tracker
  (contribution, method, relevance tag, follow-up flag), plus CSV export so you
  can fold entries back into your existing Excel tracker.
- `app/settings/page.tsx` — **Settings**: edit interest groups without touching code.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. (Google Fonts and the arXiv/Semantic Scholar APIs
need real internet access — this won't fully render in a sandboxed environment
with no outbound network.)

### Optional: keep the daily cache warm

The discover route re-fetches automatically the first time someone hits it
after the 24h cache expires — fine for a single-user site you check once a day.
If you want it pre-warmed before you wake up, add a [Vercel Cron
Job](https://vercel.com/docs/cron-jobs) that pings `/api/discover` once daily,
e.g. in `vercel.json`:

```json
{
  "crons": [{ "path": "/api/discover", "schedule": "0 1 * * *" }]
}
```

(1:00 UTC ≈ 7:00 AM Dhaka time.) Cron Jobs are available on Vercel's free Hobby
tier for one run/day.

## Tuning discovery

- Semantic Scholar's public search API is unauthenticated and modestly
  rate-limited. If you see `failedSources > 0` often in the footer note on the
  Today page, it's usually a transient 429 — a [free API
  key](https://www.semanticscholar.org/product/api#api-key) raises the limit;
  add it as `x-api-key` header in `lib/sources.ts` if needed.
- Adjust `maxTotal` / `maxPerGroup` in `buildShortlist()` (`lib/scoring.ts`) to
  make the shortlist longer/shorter or more/less diverse across groups.
- Recency decay and tier weighting live in `lib/scoring.ts` — tune if Core
  papers aren't consistently floating to the top.

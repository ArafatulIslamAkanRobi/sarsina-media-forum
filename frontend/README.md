# Frontend — ছারছীনা দরবার শরীফ (Next.js)

Public website + member portal UI. Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 (tokens + design-system CSS in `src/app/globals.css`) · lucide-react icons · Hind Siliguri + Inter via `next/font`.

## Run locally

```bash
cd frontend
npm install
npm run dev          # http://localhost:3000
```

Production check: `npm run build && npm start`.

## Where things live

| Path | What |
|---|---|
| `src/content/site.ts` | Site settings, navigation, hero slides, quick-access links, **homepage section order & visibility**, footer links |
| `src/content/data.ts` | News, mahfil, donation projects/funds/payment methods, institutions, organizations, publications, articles & authors, team |
| `src/content/types.ts` | Content types (mirror `backend/prisma/schema.prisma`) |
| `src/lib/content.ts` | Data-access functions — swap these bodies for API `fetch()` calls when the backend exists |
| `src/lib/rbac.ts` | Role → permission map for the member portal (backend must enforce the same) |
| `src/lib/seo.ts` | Organization / Article / NewsArticle / Person JSON-LD |
| `src/components/home/Sections.tsx` | All homepage sections |
| `src/components/ui/*` | Cards, media frame/placeholder, section heading, page hero |

## Content rules

- `null` targets/collected amounts → the card shows "তথ্য শীঘ্রই প্রকাশ করা হবে" instead of a progress bar. No invented figures.
- Team members with `name: null` show a "নাম শীঘ্রই যুক্ত হবে" placeholder and get no profile page.
- Items with `sample: true` display a **নমুনা** badge. `site.previewMode` shows a site-wide preview notice — turn it off once real content is in.
- Payment methods are all `enabled: false` until a gateway is integrated; the form then shows a clear "not connected" notice and never fakes a transaction.
- Images: when an `ImageRef` is `null`, an on-brand placeholder is rendered. Drop real photos into `public/` and set `{ src, alt }`.

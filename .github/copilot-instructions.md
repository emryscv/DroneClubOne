# Copilot instructions for DroneClubOne

## Scope and repo layout
- The active app is in `drone-club-one/` (Next.js App Router, TypeScript, React 19, Next 16).
- Root-level `DBCreationFiles/createTables.sql` appears legacy and does **not** match current queried columns/tables. Treat runtime queries as source of truth.

## Architecture (follow existing data flow)
- UI routes/components live under `drone-club-one/app/**`.
- DB access is centralized in server-only query modules:
  - `app/data/queries/pilots.ts`
  - `app/data/queries/races.ts`
  - `app/data/queries/pilotRace.ts`
- Mutations are centralized in server actions in `app/data/actions.ts`; client components submit `FormData` to these actions.
- Auth is NextAuth v5 credentials-based:
  - `auth.ts` (provider + password check with `bcrypt`)
  - `auth.config.ts` + `proxy.ts` (protect `/dashboard`, redirect logged-in users away from `/login`).

## Integration points
- PostgreSQL is accessed via `postgres` using `process.env.POSTGRES_URL` with SSL required.
- Image uploads use `@vercel/blob` (`put(...)`) inside server actions; resulting URLs are stored in DB.
- Remote image rendering depends on `next.config.ts` remote pattern `*.blob.vercel-storage.com`.

## Project patterns to preserve
- Prefer adding DB logic to existing query modules, not directly in components.
- Keep write operations in `app/data/actions.ts`; return simple status strings (`'success' | 'duplicate' | 'error'`) where applicable.
- Time handling convention: race times are stored as integer milliseconds and formatted in `pilotRace.ts` (`msToTime` / `timeToMS`).
- Dashboard is client-heavy (`app/dashboard/page.tsx`) and refreshes pilot/race lists through API routes (`app/api/refreshPilots/route.ts`, `app/api/refreshRaces/route.ts`). Keep that contract stable when modifying dashboard modals.
- Existing pages mix server and client components; preserve current boundaries and `Suspense` usage (e.g., `app/components/Leaderboard.tsx`, `app/pilots/[id]/page.tsx`).

## Dev workflow
- Work from `drone-club-one/`.
- Core scripts (`package.json`):
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run lint`
- There is no established automated test suite in this repo; lint + focused manual verification is the current workflow.

## Next.js version note
- `AGENTS.md` states this project targets a newer/changed Next.js. Before framework-level refactors, check docs bundled in `node_modules/next/dist/docs/` for current behavior.

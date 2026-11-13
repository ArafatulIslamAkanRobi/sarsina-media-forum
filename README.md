# Sarsina Media Forum — Official Digital Platform

Official digital platform for Charchhina Darbar Sharif (ছারছীনা দরবার শরীফ), built and operated by Sarsina Media Forum.

## Monorepo structure

- `/frontend` — Next.js public website + admin panel UI (React, TypeScript, Tailwind CSS)
- `/backend` — Express REST API (TypeScript, Prisma ORM, role-based access control)
- `/docs` — architecture notes, database schema reference, module specs

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend API | Express.js, TypeScript |
| ORM / DB | Prisma — SQLite in development, MySQL in production |
| Auth | JWT-based sessions, role & permission middleware |
| Admin panel | `/admin` routes inside the Next.js app, protected by role |

## Local development

```bash
# Backend
cd backend
npm install
npx prisma migrate dev
npm run dev        # http://localhost:4000

# Frontend
cd frontend
npm install
npm run dev        # http://localhost:3000
```

## Status

Early scaffolding in progress. See `/docs/architecture.md` for the full plan.

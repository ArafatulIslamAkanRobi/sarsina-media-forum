# Sarsina Media Forum — Official Digital Platform

Official digital platform for Charchhina Darbar Sharif (ছারছীনা দরবার শরীফ), built and operated by Sarsina Media Forum.

## Monorepo structure

- `/frontend` — Next.js public website + admin panel UI (React, TypeScript, Tailwind CSS)
- `/backend` — Laravel REST API + Filament admin panel (MySQL, Sanctum, role-based access control)
- `/docs` — architecture notes, database schema reference, module specs

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend API | Laravel 12 (PHP 8.2+) |
| Database | MySQL in production, SQLite for local development |
| Auth | Laravel Sanctum tokens, spatie/laravel-permission roles |
| Admin panel | Filament 4 at `/admin` on the Laravel app |

## Local development

```bash
# Backend (see backend/README.md)
cd backend
composer install
cp .env.example .env && php artisan key:generate
php artisan migrate --seed
php artisan serve  # http://localhost:8000 (admin: /admin)

# Frontend
cd frontend
npm install
npm run dev        # http://localhost:3000
```

## Status

- **Frontend (`/frontend`)** — public homepage and core pages built from the approved design direction (see `frontend/README.md`). Content is static/typed for now and marked as sample where unverified.
- **Backend (`/backend`)** — Laravel API, RBAC, review workflow and Filament admin panel built and tested (see `backend/README.md`). Payment gateway and email delivery not connected yet.

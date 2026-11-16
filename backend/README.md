# Backend — Laravel API + Admin Panel

Laravel 12 · PHP 8.2+ · MySQL in production (SQLite works for local development) · Sanctum (API tokens) · spatie/laravel-permission (RBAC) · Filament 4 (admin panel at `/admin`).

## Run locally

```bash
cd backend
composer install
cp .env.example .env          # then edit DB_*, APP_URL, FRONTEND_URLS
php artisan key:generate
touch database/database.sqlite   # only when DB_CONNECTION=sqlite
php artisan migrate --seed
php artisan storage:link
php artisan serve             # http://localhost:8000  ·  admin: http://localhost:8000/admin
```

The seeder prints the first **Super Admin** login once (`admin@example.com` + a random password). To choose them yourself, set `SUPER_ADMIN_EMAIL`, `SUPER_ADMIN_NAME` and `SUPER_ADMIN_PASSWORD` in `.env` before seeding. Change the password after the first login.

Tests: `php artisan test` (uses an in-memory SQLite database).

### MySQL (production)

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sarsina
DB_USERNAME=...
DB_PASSWORD=...
```

## What is where

| Path | What |
|---|---|
| `app/Support/Rbac.php` | Roles → permissions (`{module}.{action}`), mirrors `frontend/src/lib/rbac.ts`. Re-seed with `php artisan db:seed --class=RolesAndPermissionsSeeder` after editing. |
| `app/Policies/*` | Every model maps to a permission module; News/Articles use `SubmittablePolicy` (reporters/writers may only edit their own unpublished items). |
| `app/Models/Concerns/HasReviewWorkflow.php` | Server-side rule: without `*.publish`, anything saved as "published" is downgraded to "pending". |
| `app/Http/Controllers/Api/*` | REST API (`routes/api.php`). |
| `app/Http/Resources/*` | JSON shapes — field names match `frontend/src/content/types.ts`. |
| `app/Filament/Resources/*` | Admin panel screens (Bengali labels). |
| `database/seeders/SiteContentSeeder.php` | Settings, homepage layout, funds, projects (no amounts), institutions, organizations, annual mahfils, 5 empty team slots. |
| `config/donations.php` | Which online payment methods are really integrated (`DONATION_METHODS`, empty by default). |

## API (v1)

Public, read-only:

| Method & path | Returns |
|---|---|
| `GET /api/v1/site` | settings, hero slides, homepage section order/visibility, donation funds, payment methods, institutions, organizations |
| `GET /api/v1/news` · `/news/{slug}` | published news (paginated; `?category=`) |
| `GET /api/v1/articles` · `/articles/{slug}` | published articles with sections + reading time (`?category=`, `?author=`) |
| `GET /api/v1/authors/{slug}` | author profile + their articles |
| `GET /api/v1/mahfils` | featured ("today's") mahfil, annual mahfils, upcoming |
| `GET /api/v1/donation-projects` · `/{slug}` | projects; `targetAmount`/`collectedAmount` are `null` unless approved figures were entered |
| `GET /api/v1/team` · `/team/{slug}` | media forum members |

Forms (rate-limited 10/min per IP): `POST /api/v1/newsletter`, `POST /api/v1/donations` (validates, then **503 `payment_unavailable`** until a gateway is integrated — never creates a fake transaction).

Member portal (Bearer token from login; 5 attempts/min):

| Method & path | Notes |
|---|---|
| `POST /api/v1/auth/login` | `{ login: email or member ID, password, remember? }` → `{ token, expiresAt, user }`. Unapproved/inactive accounts are refused. |
| `GET /api/v1/auth/me` · `POST /api/v1/auth/logout` | current user with roles & permissions / revoke token |
| `GET/POST /api/v1/member/news` | own news; new submissions are `pending` (multipart, optional `cover` image ≤4 MB) |
| `GET/POST /api/v1/member/articles` | own articles; filed under the writer's own author profile |

## Roles

Super Admin · Admin · News Editor · News Reporter · Blog Writer · Blog Editor · Gallery Manager · Event Manager · Donation Manager · Member. Staff accounts must be approved (`is_approved`) before they can log in; only a Super Admin can grant Super Admin/Admin. Plain *Member* accounts cannot open the admin panel.

## Not done yet

- Online payment gateway (bKash/Nagad/card), receipts by email/SMS, refunds via gateway — the data model (`donations` table, statuses, receipt number) is ready; offline donations can already be recorded in the admin panel, and exported as CSV.
- Email delivery (password reset, newsletter confirmation) — needs SMTP settings.
- Gallery & publications (books) modules.
- The Next.js frontend still reads its static content files; connecting it to this API is the next step.

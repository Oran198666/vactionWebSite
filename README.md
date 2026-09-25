# Project overview

**Repo:** https://github.com/Oran198666/vactionWebSite

A vacations app: users browse and like vacations, admins manage them. React + Redux frontend, Express + TypeScript backend, MySQL database, plus AI and MCP features.


## Stack

| Layer    | Tech |
|----------|------|
| Frontend | React 19, Vite, Redux Toolkit, React Router, React Hook Form, Axios, Recharts |
| Backend  | Express 5, TypeScript, mysql2, JWT auth, Zod validation, OpenAI SDK, MCP SDK |
| Database | MySQL 8 |
| Infra    | Docker Compose (mysql + backend + frontend) |

## Folder structure

```
Backend/
  src/
    app.ts                  # entry point — wires up Express, middleware, routes
    controllers/             # one per feature: auth, vacations, likes, reports, ai, mcp
    services/                 # business logic behind each controller
    models/                   # TS types/interfaces + enums
    middleware/                # error handling, request logging, security (helmet/cors/rate-limit)
    utils/                      # app-config (env loading), dal (data access layer / db pool), cyber (hashing)
    mcp/                         # Model Context Protocol client/server/tools — powers the AI feature
Frontend/
  src/
    components/
      admin-area/       # add/edit vacation, admin dashboard, reports
      ai-area/          # AI recommendation page + MCP question page
      auth-area/        # login, register, auth-guard (route protection)
      layout-area/      # header, menu, routing, copyrights
      pages-area/       # home, about, 404
      vacations-area/   # vacation list, card, filters
      shared-area/      # spinner etc.
    redux/              # store, auth-slice, vacations-slice
    services/           # *-service-front.ts — one Axios wrapper per backend feature
    models/             # TS types mirroring the backend's models
    utils/               # app-config, interceptor (attaches JWT to requests), notify, form-util
Database/
  vacations.sql          # schema + seed data, auto-loaded into MySQL on first container start
```

The frontend/backend folder split (`*-area/`, `controllers` vs `services`) is a
consistent pattern: **controller/route layer** → **service (business logic)** →
**models (types)**, and on the frontend, **component** → **service-front (API
calls)** → **redux slice (state)**.

## Core features

- **Auth** — register/login, JWT stored client-side, `auth-guard.tsx` gates
  protected routes, `interceptor.ts` attaches the token to outgoing requests.
- **Vacations** — CRUD (admin) + browse/filter (all users), image upload via
  `express-fileupload` + `uploaded-file-saver`.
- **Likes** — per-user like/unlike on vacations.
- **Reports** — admin-only chart of likes per destination (Recharts), plus a CSV download of the same data.
- **AI / MCP** — `ai-service` calls OpenAI for a travel recommendation for any destination. The `mcp/` folder runs an MCP server inside the backend with four tools: active vacations, average price, all vacations, and future vacations by continent. The model calls these tools to answer plain-English questions with real database data.

## Environment variables

### Backend (`Backend/.env`, git-ignored)
`PORT`, `ENVIRONMENT`, `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`,
`MYSQL_DATABASE`, `JWT_SECRET`, `HASH_SALT`, `OPENAI_MODEL`, `OPENAI_API_KEY`.

### Frontend (`Frontend/.env`, git-ignored)
`VITE_API_URL` — base URL the frontend calls the backend on.

## Running locally (without Docker)

**Prerequisites:** Node.js 24, MySQL 8.

1. Import `Database/vacations.sql` into your local MySQL.
2. Create `Backend/.env` and `Frontend/.env` (see Environment variables above).
3. Backend: `cd Backend && npm install && npm run dev`
4. Frontend: `cd Frontend && npm install && npm run dev`

The site runs on http://localhost:5173 and the API on http://localhost:4000.

The AI recommendation and MCP pages require a valid `OPENAI_API_KEY` in `Backend/.env`.

## Running with Docker

**Prerequisites:** Docker Desktop.

From the project root:

```
docker compose up -d --build
```

This starts three containers:

| Container | Image | Port (host → container) |
|-----------|-------|-------------------------|
| `mysql-container` | mysql:8 | 3307 → 3306 |
| `vacation-backend-container` | built from `Backend/Dockerfile` | 4000 → 4000 |
| `vacation-frontend-container` | built from `Frontend/Dockerfile` | 80 → 5173 |

Open the site at http://localhost

`Database/vacations.sql` is imported automatically the first time MySQL starts. The backend waits for a MySQL healthcheck before it boots, and uploaded images are stored on the host through a volume, so they survive a restart.

To reset the database and re-import the SQL file:

```
docker compose down -v
docker compose up -d --build
```

`Backend/.env` is required for the backend container (compose overrides `MYSQL_HOST` and `MYSQL_PORT` so it reaches the MySQL container).

## Other references

- `Backend/*.postman_collection.json` — Postman collection for the API (54 requests, 80 tests).
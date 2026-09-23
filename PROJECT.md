# Project overview

A vacations app: users browse/like vacations, admins manage them. React + Redux
frontend, Express + TypeScript backend, MySQL database, plus an AI/MCP feature.
Written as a learning reference — read the "why", not just the "what".

## Stack

| Layer    | Tech |
|----------|------|
| Frontend | React 19, Vite, Redux Toolkit, React Router, React Hook Form, Axios, Recharts |
| Backend  | Express 5, TypeScript, mysql2, JWT auth, Zod validation, OpenAI SDK, MCP SDK |
| Database | MySQL 8 |
| Infra    | Docker (in progress — see [DOCKER.md](DOCKER.md)) |

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
      ai-area/          # chat-style AI page + MCP page
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
- **Reports** — admin-only, likely aggregating likes per vacation (see
  `reports-service.ts` / `reports.tsx` + `recharts` on the frontend for charts).
- **AI / MCP** — `ai-controller`/`ai-service` talk to OpenAI; the `mcp/` folder
  implements the Model Context Protocol so the AI can call tools against this
  app's own data (`mcp-tools.ts`, `mcp-register.ts`).

## Environment variables

### Backend (`Backend/.env`, git-ignored)
`PORT`, `ENVIRONMENT`, `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`,
`MYSQL_DATABASE`, `JWT_SECRET`, `HASH_SALT`, `RECAPTCHA_SECRET_KEY`,
`OPENAI_MODEL`, `OPENAI_API_KEY`.

### Frontend (`Frontend/.env`, git-ignored)
`VITE_API_URL` — base URL the frontend calls the backend on.

## Running locally (without Docker)

1. `Database/vacations.sql` needs to be loaded into a local MySQL instance.
2. `cd Backend && npm install && npm run build && npm start` (or a dev/watch
   script if one exists — check `Backend/package.json` scripts).
3. `cd Frontend && npm install && npm run dev`.

## Running with Docker

See [DOCKER.md](DOCKER.md) — MySQL service is done; backend/frontend services
are in progress.

## Other references

- `Backend/*.postman_collection.json` — Postman collection for the API (54
  requests, 80 tests per the commit history).

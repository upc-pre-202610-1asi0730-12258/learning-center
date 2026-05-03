# ACME Learning Center (`learning-center`)

## Overview
ACME Learning Center is a Vue 3 + Vite application organized with a domain-driven design (DDD) style. The project demonstrates how to model features by bounded context and keep business concepts separated from UI and infrastructure concerns.

The current implementation actively uses the Publishing context and includes an IAM context that is partially wired at router level.

## Goals
- Show a practical front-end architecture with DDD-inspired layering.
- Keep domain concepts explicit (`entity`, `command`, `resource`, `assembler`, `store`).
- Provide a clean learning base for CRUD use cases, localization, and routing.

## Tech Stack
- Vue 3
- Vite
- Pinia
- Vue Router
- Vue I18n
- PrimeVue + PrimeFlex + PrimeIcons
- Axios
- `json-server` for local mock API

## Project Structure (DDD-Oriented)
```text
src/
  iam/                         # IAM bounded context
	domain/                    # Domain model (entities, commands)
	application/               # Use-case orchestration (Pinia store)
	infrastructure/            # API, assemblers, guards, interceptors
	presentation/              # Views and route declarations

  publishing/                  # Publishing bounded context
	domain/model/              # Core entities (Category, Tutorial)
	application/               # Publishing store and use cases
	infrastructure/            # API gateway and assemblers
	presentation/              # Views and route declarations

  shared/                      # Shared cross-context concerns
	infrastructure/            # BaseApi, BaseEndpoint
	presentation/              # Layout and shared views/components
```

## Bounded Contexts

### Publishing Context
Primary active context in the router.

- Manages categories and tutorials.
- Uses `Category` and `Tutorial` entities in the domain layer.
- Uses `usePublishingStore` to orchestrate fetch/create/update/delete use cases.

### IAM Context
Implemented in code but not fully enabled in global routing by default.

- Includes `SignInCommand`, `SignUpCommand`, and `User` entity.
- Includes auth-oriented infrastructure (`IamApi`, `iamInterceptor`, `authenticationGuard`).
- Route module exists in `src/iam/presentation/iam-routes.js`; `src/router.js` currently keeps IAM route integration commented.

### Shared Context
Provides reusable infrastructure and presentation utilities.

- `BaseApi` centralizes Axios configuration.
- `BaseEndpoint` centralizes CRUD endpoint behavior.
- Shared UI structure and common views live under `shared/presentation`.

## Layer Responsibilities

### Domain Layer
- Defines business concepts and invariants as plain JavaScript classes.
- Should stay framework-agnostic (no Vue/HTTP code).

### Application Layer
- Coordinates behavior and state transitions through Pinia stores.
- Uses domain objects plus infrastructure services to execute workflows.

### Infrastructure Layer
- Talks to external services/APIs.
- Maps external payloads to internal models via assemblers.

### Presentation Layer
- Renders UI and handles user interactions.
- Calls store actions and reacts to state.

## Running the Project

### Prerequisites
- Node.js + npm installed (use versions compatible with Vite 8).

### 1) Install dependencies
```bash
npm install
```

### 2) Start mock API server (`json-server`)
From the project root:
```bash
cd server
sh start.sh
```

The server reads:
- `server/db.json`
- `server/routes.json` (maps `/api/v1/*` to root resources)

Default local API base used by development env:
- `http://localhost:3000/api/v1`

### 3) Start the Vue app
In a separate terminal, from the project root:
```bash
npm run dev
```

### 4) Build for production
```bash
npm run build
```

### 5) Preview production build
```bash
npm run preview
```

## Environment Variables
Environment files included:
- `.env.development`
- `.env.production`

Main variables:
- `VITE_LEARNING_PLATFORM_API_URL`
- `VITE_CATEGORIES_ENDPOINT_PATH`
- `VITE_TUTORIALS_ENDPOINT_PATH`
- `VITE_SIGNUP_ENDPOINT_PATH`
- `VITE_SIGNIN_ENDPOINT_PATH`
- `VITE_USERS_ENDPOINT_PATH`

Tip: if your API is running on a different port, update `VITE_LEARNING_PLATFORM_API_URL` in `.env.development`.

## Routing Notes
- Current router exposes `/home`, `/about`, `/publishing/*`, and fallback not-found.
- IAM routes are present but not enabled by default in `src/router.js`.
- Global `beforeEach` sets the document title from route metadata.

## API and Data Notes
- Local mock data currently includes `categories` and `tutorials` collections.
- IAM endpoints are configured via env variables and infrastructure classes, but your runtime backend must provide those routes for full authentication flows.

## Documentation
- Domain and architecture references:
  - `docs/class-diagram.puml`
  - `docs/user-stories.md`

## Recommended Development Practices
- Keep each feature inside its bounded context first; move to `shared` only when truly cross-context.
- Preserve layer boundaries (presentation does not call raw HTTP clients directly).
- Prefer explicit domain language in naming and docs.
- Add or update docs when introducing new entities, commands, or use cases.

## License
See `LICENSE.md`.

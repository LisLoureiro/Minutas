# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Scripta — Gerador de Minutas Jurídicas (`artifacts/scripta`)

- **Type**: react-vite, frontend-only (no backend — all data is mocked)
- **Preview path**: `/`
- **Port**: 26073
- **Tech**: React + Vite + TailwindCSS + Wouter + shadcn/ui
- **Auth**: localStorage session simulation
- **Pages**:
  - `/login` — Login + SSO placeholder + password recovery flow
  - `/dashboard` — List of minutas with search and status filter
  - `/modelos` — Grid of contract models by category
  - `/questionario` — 5-step multi-step form to generate a minuta
  - `/editor` — contentEditable editor with clause panel
  - `/preview` — Final document preview with Scripta branding
  - `/versoes` — Version history with visual diff
  - `/biblioteca` — Searchable clause library
  - `/compartilhar` — Invite modal with role selection
  - `/planos` — Pricing cards
  - `/configuracoes` — User profile and subscription settings
- **Brand**:
  - Primary: `#0B4F6C` (azul-petróleo)
  - Accent: `#4A90C4` (azul royal)
  - Background: `#E8F1F2` (gelo)
  - Destructive: `#523A34` (terra)
  - Fonts: Georgia (titles), Inter (interface)
- **Mock data**: `src/data/mock.ts` — minutas, modelos, cláusulas, versões, planos

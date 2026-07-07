# AirWatch AI

Neighborhood Pollution Intelligence Platform

## Phase 1 Scope

This repository contains the production-ready project foundation for AirWatch AI. It includes architecture, route skeletons, reusable component scaffolding, API placeholders, Firebase and Google integration placeholders, and strict TypeScript-first structure.

Business logic, model training, and end-to-end workflows are intentionally deferred to Phase 2.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- Framer Motion
- Firebase Auth / Firestore / Storage / FCM placeholders
- Google Gemini / ADK / Maps placeholders
- TanStack Query
- React Hook Form + Zod
- i18next
- Drizzle ORM + PostgreSQL

## Core Commands

```bash
npm install
npm run build
npm run dev
```

## Environment Variables

Use `.env` for local runtime and copy required keys from `src/config/env.ts`.

## Architecture

Detailed architecture documentation is available in `docs/ARCHITECTURE.md`.

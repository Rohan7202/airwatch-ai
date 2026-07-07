# AirWatch AI Architecture (Phase 1)

## 1) Folder Structure

```text
src/
  app/
    (public)/
    (auth)/
    (app)/
    (municipal)/
    (admin)/
    api/
  components/
    layout/
    navigation/
    cards/
    charts/
    forms/
    map/
    upload/
    ai/
    dashboard/
    ui/
  config/
  features/
    auth/
    reports/
    hotspots/
    sensors/
    predictions/
    notifications/
    municipal/
    settings/
    i18n/
  hooks/
  lib/
    firebase/
    google/
    i18n/
  providers/
  server/
    services/
    repositories/
    validators/
  types/
  db/
```

## 2) Clean Architecture

- **Presentation layer**: App Router pages and reusable components.
- **Application layer**: feature-level hooks and orchestration.
- **Domain layer**: shared types and validation schemas.
- **Infrastructure layer**: Firebase, Google APIs, DB repositories, and API route handlers.

## 3) Data Model (Drizzle/PostgreSQL)

Tables:
- users
- reports
- hotspots
- sensors
- predictions
- notifications
- municipal_tasks
- settings
- languages

Relations are keyed by IDs and geospatial data is stored as latitude/longitude + optional GeoJSON.

## 4) API Architecture (REST v1)

Base: `/api/v1`

- `GET /health`
- `POST /auth/session`
- `DELETE /auth/session`

Resources (all include `GET/POST` on collection and `GET/PATCH/DELETE` on item):
- `/users`
- `/reports`
- `/hotspots`
- `/sensors`
- `/predictions`
- `/notifications`
- `/municipal-tasks`
- `/settings`
- `/languages`

Auxiliary endpoints:
- `POST /reports/:id/analyze`
- `POST /predictions/run`
- `POST /notifications/dispatch`

All Phase 1 endpoints return placeholder JSON contracts.

## 5) Google ADK Multi-Agent Architecture

Agents:
1. **Citizen Report Agent**
   - Extracts visual/semantic signals from uploaded citizen media.
   - Produces structured report enrichment (type, severity, confidence).

2. **Satellite Analysis Agent**
   - Correlates report geolocation with recent satellite and weather layers.
   - Detects smoke/dust/thermal anomalies.

3. **Prediction Agent**
   - Ingests enriched reports + IoT + weather history.
   - Produces 24-hour AQI hotspot forecasts.

4. **Municipal Planning Agent**
   - Converts hotspot risk into operational task plans.
   - Prioritizes cleanup routing and resource assignment.

5. **Notification Agent**
   - Routes targeted alerts to citizens, officers, and admins.
   - Applies channel and urgency policies (in-app, FCM, email future).

Flow:
`Citizen Upload -> Citizen Report Agent -> Satellite Analysis Agent -> Prediction Agent -> Municipal Planning Agent -> Notification Agent`

## 6) Routing Map

Public:
- `/` landing

Auth:
- `/login`
- `/register`

Citizen App:
- `/dashboard`
- `/map`
- `/upload`
- `/analytics`
- `/notifications`
- `/settings`
- `/profile`

Municipal:
- `/municipal-dashboard`

Admin:
- `/admin`

## 7) Component Hierarchy

- Layout: `AppShell`, `PageHeader`, `SectionShell`
- Navigation: `Navbar`, `Sidebar`, `MobileNav`, `RoleGate`
- UI primitives: `Button`, `Card`, `Input`, `Badge`
- Cards: pollution summary, hotspot card, sensor card, alert card
- Charts: AQI trend chart, source contribution chart placeholders
- Forms: login/register/profile/report forms
- Map: map shell, marker layer, hotspot legend
- Upload: upload dropzone, image preview, metadata form
- AI: agent status panel, inference timeline
- Dashboard widgets: KPI grid, timeline feed, task queue

## 8) Theme Architecture

- `next-themes` with strategy: `light | dark | system`
- Global design tokens in CSS custom properties
- `ThemeToggle` component in navbar

## 9) Internationalization (i18next)

- `lib/i18n` bootstraps i18next.
- Translation namespaces per feature.
- Language metadata sourced from `languages` table and static fallbacks.

## 10) State Management

- Server state: TanStack Query.
- Auth/session: `AuthProvider` + context.
- UI local state: component-local hooks.
- Form state: React Hook Form + Zod schemas.

## 11) Authentication Flow

1. User signs in via Firebase Auth.
2. ID token exchanged at `/api/v1/auth/session`.
3. Server sets secure session cookie (Phase 2 logic).
4. Middleware protects route groups.

## 12) RBAC

Roles:
- citizen
- municipal_officer
- administrator

Route guards and API guards enforce minimum role by route/policy matrix.

## 13) Security Architecture

- Firebase authentication validation (placeholder in Phase 1).
- RBAC policy utility.
- Protected routes via `middleware.ts`.
- Input validation with Zod on API boundaries.
- Rate limiting middleware placeholder.
- Secure upload policy placeholders.
- Secrets loaded via environment variables only.

## 14) Performance Strategy

- Dynamic imports and route-based code splitting.
- Next Image optimization pipeline.
- Query caching and stale-while-revalidate policies.
- Skeleton loading states.
- PWA-ready manifest included.

## 15) SEO Strategy

- Global + per-route metadata API.
- `robots.ts` and `sitemap.ts`.
- Open Graph and Twitter metadata.
- JSON-LD utility hook placeholders.
- Semantic HTML and canonical URL support.

## 16) Accessibility Strategy

- WCAG 2.2 baseline.
- Keyboard-first navigation.
- ARIA landmarks in shells.
- Focus-visible states and sufficient contrast tokens.
- Reduced motion support integrated with animation wrappers.

## 17) Deployment

- Vercel target runtime.
- Environment-driven configuration.
- Health endpoint retained for platform checks.

## 18) Phase Boundary

Phase 1 delivers architecture and scaffolding only.
Phase 2 implements domain logic, integrations, workflows, and AI orchestration.

# Music Auditions Platform

A cross-platform product for musicians to discover opportunities, register with organizations, and submit one or more auditions from web or mobile.

## Apps

- `apps/web` — Next.js web front end for musicians and organizations
- `apps/mobile` — Expo React Native app for iPhone and Android
- `packages/shared` — shared TypeScript types, seed content, and workflow helpers
- `Planning` — requirements and implementation plan

## Product surfaces

### Musician experience
- Browse organizations and published submission requirements
- Create musician profile
- Save draft applications
- Submit one or more audition pieces per organization
- Track submission status

### Organization experience
- Register organization accounts
- Publish audition programs and eligibility requirements
- Review applicants and their uploaded auditions
- Update statuses and contact applicants

## Tech direction
- Monorepo managed with pnpm workspaces
- Next.js 15 + React 19 for web
- Expo Router + React Native for mobile
- Shared TypeScript models in `packages/shared`

## Getting started

```bash
pnpm install
pnpm --filter web dev
pnpm --filter mobile start
```

## Status

Initial scaffold generated with product planning docs and front-end starter flows.

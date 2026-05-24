# Music Auditions Platform

A cross-platform product for musicians to discover opportunities, register with organizations, and submit one or more auditions from web or mobile.

## Live demo

After GitHub Pages deployment is enabled, the initial web app is published from this repository's `main` branch workflow.

Expected URL:
- `https://tamclaw1000.github.io/music-auditions-platform/`

## Apps

- `apps/web` — Next.js web front end for musicians and organizations
- `apps/mobile` — Expo React Native app for iPhone and Android
- `packages/shared` — shared TypeScript types and demo content
- `Planning` — requirements and implementation plan

## What the first version includes

### Musician experience
- Browse published opportunities
- Inspect submission requirements
- Fill out a musician profile
- Add one or more audition submissions
- Validate whether an application is ready

### Organization experience
- Draft organization registration details
- Draft submission requirement details for a program/opportunity
- Preview what a published requirement could look like

### Mobile direction
- Initial Expo app shell with mirrored product framing for iPhone and Android
- Ready for expansion into full mobile submission and review flows

## Local development

```bash
pnpm install
pnpm dev:web
pnpm dev:mobile
```

## Deployment

A GitHub Actions workflow in `.github/workflows/deploy-pages.yml` builds the static Next.js app and deploys it to GitHub Pages.

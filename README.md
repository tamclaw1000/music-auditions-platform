# Music Auditions Platform

A cross-platform product for musicians to discover opportunities, register with organizations, and submit one or more auditions from web or mobile.

## Live demo

- Website: `https://tamclaw1000.github.io/music-auditions-platform/`

## Apps

- `apps/web` — Next.js web front end for musicians and organizations
- `apps/mobile` — Expo React Native app for iPhone and Android
- `packages/shared` — shared TypeScript types and demo content
- `Planning` — requirements and implementation plan

## What is live now

### Web
- Published on GitHub Pages
- Includes musician browse/application demo flow
- Includes organization requirement draft flow
- Includes a downloads section for web/mobile distribution status

### Mobile
- Shared Expo React Native application
- Dedicated screens for:
  - home
  - musicians
  - organizations
- Prepared for future video recording/upload flows

## Mobile distribution status

### Ready now
- Mobile source code download:
  - `https://github.com/tamclaw1000/music-auditions-platform/archive/refs/heads/main.zip`

### Prepared but not yet built in this environment
- `eas.json` added for Expo Application Services builds
- iOS bundle identifier configured
- Android package identifier configured

### Current blockers for installable iOS/Android builds
- Expo/EAS CLI not installed/authenticated here
- No `EXPO_TOKEN` configured
- No Apple signing/TestFlight credentials configured
- No Android signing/build execution configured yet

## Local development

```bash
pnpm install
pnpm dev:web
pnpm dev:mobile
```

## Next mobile publish steps

```bash
npm install -g eas-cli
expo login
cd apps/mobile
# or from repo root with proper app ownership configured

eas build --platform android --profile preview
eas build --platform ios --profile preview
```

## Deployment

- Web deploys automatically through GitHub Actions to GitHub Pages
- Mobile build pipeline is prepared for Expo EAS once credentials are available

# Quasr Todo Project (quasar-todo-project)

A Quasar Framework (v2) app, using Vue 3, Pinia, and Firebase (Auth + Realtime Database).

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and fill in your Firebase web app config (Firebase console -> Project settings -> Your apps -> SDK setup and configuration):

```bash
cp .env.example .env
```

Without real values here, the app builds and runs, but login/register and task sync will fail.

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm run dev
```

### Build the app for production
```bash
npm run build
```
This outputs a static SPA to `dist/spa`.

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket and import it in the [Vercel dashboard](https://vercel.com/new).
2. Vercel picks up `vercel.json` automatically (`npm run build`, output `dist/spa`) — no extra build configuration needed.
3. Under Project Settings -> Environment Variables, add the same keys from `.env.example`:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_DATABASE_URL`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`
4. Deploy. Routing uses hash mode (`#/...`), so no server-side rewrite rules are required for a static host.

Also make sure your Firebase project's Authentication settings allow your Vercel domain under "Authorized domains".

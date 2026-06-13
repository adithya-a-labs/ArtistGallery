# Deployment

## Detected Stack

- Package manager: npm (`package-lock.json`)
- Frontend: React + Vite
- Backend/API: Express + Node.js, bundled with esbuild
- Database: PostgreSQL via Drizzle/Neon (`DATABASE_URL`)
- Repository shape: single package full-stack app with `client`, `server`, and `shared`

## Paths

- Frontend path: `client`
- Backend path: `server`
- Shared code path: `shared`
- Build output directory: `dist/public` for frontend static files, `dist/index.js` for backend

## Vercel

- Root directory: repository root
- Framework preset: Other
- Install command: `npm ci`
- Build command: `npm run build:client`
- Output directory: `dist/public`

Required Vercel environment variables:

- `VITE_API_URL`: Railway API origin, for example `https://your-railway-api.up.railway.app`

## Railway

- Root directory: repository root
- Build command: `npm run build`
- Start command: `npm run start`
- Health check path: `/health`

Required Railway environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `CORS_ORIGIN`: Vercel frontend origin, for example `https://your-vercel-app.vercel.app`
- `FRONTEND_URL`: same frontend origin; used as a fallback if `CORS_ORIGIN` is not set
- `PORT`: provided automatically by Railway; do not set manually unless needed

## Local Development

Install dependencies:

```sh
npm ci
```

Run the full-stack dev server:

```sh
npm run dev
```

Build everything:

```sh
npm run build
```

Run the production server locally after building:

```sh
npm run start
```

For local same-origin development, leave `client/.env` unset or keep `VITE_API_URL` blank. For a deployed Vercel frontend, set `VITE_API_URL` to the Railway API URL.

## Production Checklist

- Create a PostgreSQL database and set `DATABASE_URL` on Railway.
- Deploy Railway from the repository root.
- Confirm Railway reports `/health` as healthy.
- Set `CORS_ORIGIN` and `FRONTEND_URL` on Railway to the final Vercel URL.
- Deploy Vercel from the repository root using `npm run build:client` and `dist/public`.
- Set `VITE_API_URL` on Vercel to the final Railway API URL.
- Redeploy both services after final URLs are known so CORS and API routing are in sync.

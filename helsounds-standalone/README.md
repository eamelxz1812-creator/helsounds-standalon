# Helsounds

Music streaming app built with vanilla HTML5, CSS3 and JavaScript, served by Vite.

## Requirements

- Node.js 18+
- npm or pnpm

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at http://localhost:5173

## Build for production

```bash
npm run build
```

Output goes to `dist/`.

## Deploy on Vercel

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Framework preset: **Other** (or Vite)
4. Build command: `npm run build`
5. Output directory: `dist`
6. No environment variables required

> `vercel.json` is already configured for client-side routing.

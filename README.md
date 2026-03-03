# Vite Convex Scaffold

[![CI](https://github.com/mxn2020/vite-convex/actions/workflows/ci.yml/badge.svg)](https://github.com/mxn2020/vite-convex/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/node-22-green.svg)](./.nvmrc)

Minimal Vite + React + Convex project scaffold template for rapid app creation.

## Features

- **React 19** — Latest React with concurrent features
- **Vite** — Lightning-fast dev server and build
- **Convex** — Real-time backend with type-safe API
- **Convex Auth** — Built-in authentication
- **TypeScript** — Full type safety
- **Vercel Analytics** — Usage tracking out of the box
- **Error Boundaries** — Graceful error handling
- **Testing** — Vitest test scaffold

## Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your Convex deployment URL

# Start development
pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | TypeScript check + Vite production build |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests |
| `pnpm lint` | Check code formatting |
| `pnpm typecheck` | TypeScript type checking |

## Project Structure

```
src/
├── components/       # UI components
│   ├── ErrorBoundary.tsx
│   └── ...
├── App.tsx           # Main app component
└── main.tsx          # Entry point
public/               # Static assets
```

## Using as a Template

This scaffold is designed to be copied when creating new apps. Replace the placeholder values in the environment files with your actual project configuration.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow.

## License

[MIT](./LICENSE) © Mehdi Nabhani

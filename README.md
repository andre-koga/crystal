# Crystal

An AI learning harness that fights brain atrophy from lazy AI use. Bring your own key, explain a topic in your own words, and the AI teaches by asking questions instead of handing out answers. Your topics live on a visual knowledge graph.

Status: MVP in development.

## Stack

Next.js (App Router) · Tailwind + shadcn/ui · Supabase · Vercel AI SDK · Stripe

## Development

```sh
pnpm install
cp .env.example .env.local   # then fill in values
pnpm dev
```

Checks run in CI: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm build`.

Note: this Next.js version differs from older releases (for example `proxy.ts` replaces `middleware.ts`). Read the bundled docs in `node_modules/next/dist/docs/` before changing framework-level code.

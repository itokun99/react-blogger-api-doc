---
layout: home
title: react-blogger-api
description: Fully-typed React hooks and a Context provider for Google's Blogger API v3, with Zod-validated responses, a built-in query cache, and optional axios and TanStack Query adapters.

hero:
  name: react-blogger-api
  text: Typed React hooks for the Blogger API v3
  tagline: 33 hooks, one per documented Blogger API v3 method. Zod-validated responses at the network boundary, cache with automatic invalidation, and tests that never touch the network.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/installation
    - theme: alt
      text: Quick Start
      link: /guide/quick-start
    - theme: alt
      text: API Reference
      link: /api/providers

features:
  - title: 33 hooks
    details: One hook per documented Blogger API v3 method, plus `useBlogger` for direct client access and `useBloggerQuery`/`useBloggerMutation` for building custom cache-backed hooks.
  - title: Fully typed
    details: Every method has typed params and a Zod-validated response type. Blog and post IDs are branded, so a raw string cannot be passed where a `BlogId` is expected.
  - title: Cache with invalidation
    details: Mutations automatically invalidate the queries they affect — creating a post clears the post list, publishing a page clears that page and the page list. No manual refetch needed.
  - title: Fetch-free tests
    details: Inject a `fetch` implementation in the provider config; every hook is fully testable offline without hitting the network.
  - title: Optional axios adapter
    details: The library ships with a `ky`-based HTTP client by default. Pass `httpClient` set to `axios` to `createBloggerClient` to use axios instead (optional peer dependency).
  - title: TanStack Query adapter
    details: Swap the built-in cache for React Query via `BloggerTanstackProvider`. The same hooks work unchanged — background refetching, devtools, and caching strategies included.
---

## Quick start

Install:

::: code-group

```bash [npm]
npm install react-blogger-api
```

```bash [pnpm]
pnpm add react-blogger-api
```

```bash [yarn]
yarn add react-blogger-api
```

```bash [bun]
bun add react-blogger-api
```

:::

Wrap your app in `BloggerProvider` and call a hook:

```tsx
import { BloggerProvider, usePosts } from 'react-blogger-api'

function App() {
  return (
    <BloggerProvider config={{ apiKey: 'YOUR_API_KEY', defaultBlogId: '1234567890' }}>
      <PostList />
    </BloggerProvider>
  )
}

function PostList() {
  const { items, isLoading, error } = usePosts({ maxResults: 10 })

  if (isLoading) return <p>Loading…</p>
  if (error) return <p>Failed: {error.message}</p>
  return <ul>{items.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
}
```

With `defaultBlogId` set, every blog-scoped hook resolves the blog automatically. Pass `options.blogId` per hook to override it.

The standalone client works outside React:

```ts
import { createBloggerClient } from 'react-blogger-api'

const client = createBloggerClient({ apiKey: 'YOUR_API_KEY' })
const post = await client.posts.get({ blogId: '1234567890', postId: '42' })
```

## Authentication notes

- **Reads** on public blogs work with `apiKey` alone.
- **Writes** (`insert` / `update` / `patch` / `delete` / `publish` / `revert`) and any read of a private blog require `accessToken`, sent as `Authorization: Bearer <token>`.
- A token **can only be used from a server or a trusted environment**. Do not ship a long-lived token in browser code; proxy through your own backend or use short-lived tokens.
- Pass a **function** for `accessToken` when the token rotates — it is resolved per request.

## Where to go next

### Guide

- [Installation](/guide/installation) — install steps and peer dependency requirements.
- [Quick Start](/guide/quick-start) — renders a post list step by step.
- [Caching](/guide/advanced/cache) — how the built-in `QueryStore` works.
- [Testing](/guide/advanced/testing) — mock `fetch` in unit tests.

### API

- [Providers](/api/providers) — `BloggerProvider` and `BloggerTanstackProvider` configuration.
- [Hooks](/api/hooks) — all 33 hooks with signatures.
- [Client](/api/client) — `createBloggerClient` for non-React call sites.
- [Types](/api/types) — resource, list, param, and ID types.
- [Errors](/api/errors) — `BloggerApiError` and `BloggerParseError`.

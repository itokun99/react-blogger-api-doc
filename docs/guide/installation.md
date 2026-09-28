# Installation

## Requirements

- Bun >= 1.4.0 (or Node with `fetch`)
- React 18 or newer (only if you use the hooks and provider)
- A Blogger blog ID and an API key from the [Google Cloud Console](https://console.cloud.google.com/)

## Package managers

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

## Peer dependencies

The client and hooks ship `react`, `ky`, and `zod` as external — they are never bundled.
`axios` and `@tanstack/react-query` are optional peer dependencies.

## Getting credentials

1. Open the [Google Cloud Console](https://console.cloud.google.com/) and create
   or select a project.
2. Create an API key under **APIs & Services → Credentials**.
3. Find your blog ID in the Blogger dashboard URL, or by calling
   `GET https://www.googleapis.com/blogger/v3/users/self/blogs`.

## Next steps

- Follow the [quick start](/guide/quick-start) to render your first post list.
- Read the [providers](/api/providers) reference for every configuration option.

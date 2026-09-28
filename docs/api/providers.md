# Providers

## `BloggerProvider`

Supplies a client, cache store, and default blog ID to every hook below it.

```tsx
import { BloggerProvider } from 'react-blogger-api'

<BloggerProvider config={{ apiKey: 'YOUR_API_KEY', defaultBlogId: '1234567890' }}>
  <App />
</BloggerProvider>
```

### Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `BloggerProviderConfig` | yes | Provider configuration (see below). |
| `children` | `React.ReactNode` | yes | Subtree that may use the hooks. |

### `BloggerProviderConfig`

Extends [`BloggerClientConfig`](/api/client) with one additional field:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apiKey` | `string` | no | Blogger API key for public blog reads. |
| `accessToken` | `string \| () => string \| Promise<string>` | no | OAuth 2.0 token for private blogs and writes. A function is resolved per request for rotation. |
| `defaultBlogId` | `string` | no | Blog ID used when a hook's own `blogId` is omitted. |
| `baseUrl` | `string` | no | Override the API origin (testing, proxies). |
| `fetch` | `FetchLike` | no | Custom `fetch` implementation for testing or instrumentation. |
| `httpClient` | `"ky" \| "axios"` | no | HTTP client to use. Defaults to `ky`. Requires `axios` as an optional peer dependency. |

## `BloggerTanstackProvider`

Swaps the built-in [`QueryStore`](/guide/advanced/cache) for React Query, giving you access to React Query's background refetching, caching strategies, and devtools. The same hooks work unchanged.

```tsx
import { QueryClient } from '@tanstack/react-query'
import { BloggerTanstackProvider } from 'react-blogger-api'

const queryClient = new QueryClient()

<BloggerTanstackProvider config={{ apiKey: 'YOUR_API_KEY', queryClient }}>
  <App />
</BloggerTanstackProvider>
```

### Props

Same as `BloggerProvider` plus `queryClient` in `config`.

## `useBlogger`

Reads the provider context without subscribing to any data:

```tsx
import { useBlogger } from 'react-blogger-api'

const { client, store, defaultBlogId } = useBlogger()
```

Throws if rendered outside a provider.

## Standalone client

If you are not in React, call `createBloggerClient` directly:

```ts
import { createBloggerClient } from 'react-blogger-api'

const client = createBloggerClient({ apiKey: 'YOUR_API_KEY' })
const post = await client.posts.get({ blogId: '1234567890', postId: '42' })
```

See the [client reference](/api/client) for the full method list.

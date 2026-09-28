# Client

`createBloggerClient` returns the framework-agnostic core the hooks are built on. Use it in Node scripts, server handlers, or tests.

```ts
import { createBloggerClient } from 'react-blogger-api'

const client = createBloggerClient({ apiKey: 'YOUR_API_KEY' })
const post = await client.posts.get({ blogId: '1234567890', postId: '42' })
```

## Configuration

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | `string` | – | Blogger API key with the Blogger API enabled. |
| `accessToken` | `string \| () => string \| Promise<string>` | – | OAuth 2.0 token for private blogs and writes. A function is resolved per request. |
| `baseUrl` | `string` | `https://www.googleapis.com/blogger/v3` | Override for proxies and mocks. |
| `fetch` | `FetchLike` | global `fetch` | Injectable transport. |
| `httpClient` | `'ky' \| 'axios'` | `'ky'` | HTTP client to use. Requires `axios` as an optional peer dependency when set to `'axios'`. |

## Resources

The client exposes eight resource namespaces:

| Property | Methods | Notes |
| --- | --- | --- |
| `client.blogs` | `get`, `getByUrl`, `listByUser` | Blog metadata and listing by user. |
| `client.posts` | `list`, `get`, `getByPath`, `search`, `insert`, `update`, `patch`, `delete`, `publish`, `revert` | Full CRUD plus publish/revert. |
| `client.pages` | `list`, `get`, `insert`, `update`, `patch`, `delete`, `publish`, `revert` | Static pages, same CRUD shape as posts. |
| `client.comments` | `list`, `listByBlog`, `get`, `delete`, `approve`, `markAsSpam`, `removeContent` | Comment moderation and deletion. |
| `client.users` | `get` | Authenticated user or a specific user by ID. |
| `client.pageViews` | `get` | Page-view counts for a time range. |
| `client.postUserInfos` | `get`, `list` | Per-user info for a single post or paginated across a blog. |
| `client.blogUserInfos` | `get` | Per-user info for a blog. |

## Method example

```ts
const posts = await client.posts.list({
  blogId: '1234567890',
  maxResults: 25,
  orderBy: 'PUBLISHED',
  labels: 'react,typescript',
})

for (const post of posts.items ?? []) {
  console.log(post.title, post.url)
}
```

## Paging

Every list method accepts `pageToken` and returns `nextPageToken` when more results exist:

```ts
let token: string | undefined
do {
  const page = await client.posts.list({ blogId, pageToken: token, maxResults: 50 })
  console.log(page.items?.length)
  token = page.nextPageToken
} while (token)
```

## Custom fetch

Passing `fetch` is the supported seam for tests and proxies:

```ts
const client = createBloggerClient({
  apiKey: 'test',
  fetch: async (input, init) => new Response(JSON.stringify({ items: [] })),
})
```

## HTTP client adapter

The library ships with a `ky`-based HTTP client by default:

```ts
const client = createBloggerClient({ apiKey: 'YOUR_API_KEY' }) // ky (default)
```

To use `axios` instead:

```ts
const client = createBloggerClient({
  apiKey: 'YOUR_API_KEY',
  httpClient: 'axios',
})
```

# Quick Start

This walkthrough renders a list of posts from a public Blogger blog in about
five minutes.

## 1. Install

```bash
bun add react-blogger-api
# or: npm install react-blogger-api
```

Requires React 18+, any modern browser or runtime with `fetch`, and either `ky` (default) or `axios` (optional peer dependency).

## 2. Wrap your app in the provider

```tsx
import { BloggerProvider } from 'react-blogger-api'

function App() {
  return (
    <BloggerProvider config={{ apiKey: 'YOUR_API_KEY', defaultBlogId: '1234567890' }}>
      <PostList />
    </BloggerProvider>
  )
}
```

With `defaultBlogId` set, every blog-scoped hook resolves the blog automatically. Pass `options.blogId` per hook to override it.

## 3. Render posts with a hook

```tsx
import { usePosts } from 'react-blogger-api'

function PostList() {
  const { items, isLoading, error } = usePosts({ maxResults: 10 })

  if (isLoading) return <p>Loading…</p>
  if (error) return <p role="alert">{error.message}</p>

  return (
    <ul>
      {items.map((post) => (
        <li key={post.id}>
          <a href={post.url}>{post.title}</a>
        </li>
      ))}
    </ul>
  )
}
```

## 4. Fetch a single post

```tsx
import { usePost } from 'react-blogger-api'

function Post({ id }: { id: string }) {
  const { data: post } = usePost(id)
  if (!post) return null

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
```

## Next steps

- [Hooks](/api/hooks) — every hook, its arguments, and its return value.
- [Caching](/guide/advanced/cache) — how the built-in QueryStore works.
- [Testing](/guide/advanced/testing) — mock `fetch` in unit tests.

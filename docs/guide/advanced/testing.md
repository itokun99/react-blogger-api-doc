# Testing

Pass a custom `fetch` to keep tests offline and deterministic:

```tsx
<BloggerProvider
  config={{
    apiKey: 'test',
    fetch: async () => new Response(JSON.stringify({ id: '1', title: 'Test' })),
  }}
>
  {children}
</BloggerProvider>
```

## Mocking fetch

The simplest approach is to provide a stub `fetch` at the provider level:

```ts
import { render, screen } from '@testing-library/react'
import { BloggerProvider, usePosts } from 'react-blogger-api'

const fetchMock = jest.fn(async () =>
  new Response(JSON.stringify({ items: [{ id: '1', title: 'Hello' }] }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  }),
)

render(
  <BloggerProvider config={{ apiKey: 'test', fetch: fetchMock }}>
    <PostList />
  </BloggerProvider>,
)

expect(await screen.findByText('Hello')).toBeDefined()
```

For client-level tests, pass the same stub to `createBloggerClient`:

```ts
import { createBloggerClient } from 'react-blogger-api'

const client = createBloggerClient({
  apiKey: 'test',
  fetch: async () => new Response(JSON.stringify({ items: [] })),
})

const posts = await client.posts.list({ blogId: '1' })
expect(posts.items).toEqual([])
```

## Asserting errors

Throw a `BloggerApiError` (or just any `Error`) from the stub to test the error branch:

```ts
const fetchMock = jest.fn(async () =>
  new Response(JSON.stringify({ error: { code: 404, message: 'Not found' } }), {
    status: 404,
    headers: { 'content-type': 'application/json' },
  }),
)

render(
  <BloggerProvider config={{ apiKey: 'test', fetch: fetchMock }}>
    <PostList />
  </BloggerProvider>,
)

expect(await screen.findByRole('alert')).toHaveTextContent('Failed')
```

## Deterministic async assertions

Never assert on a bare `await`; the provider resolves state across microtasks and timers. Subscribe to the state change first, then await it:

```ts
expect(await screen.findByRole('alert')).toHaveTextContent('quota exceeded')
```

`findBy*` polls with a bounded timeout and fails fast when the state never arrives, unlike a fixed `await new Promise((r) => setTimeout(r, 50))`, which passes only when the machine is slow enough.

## Resetting between tests

Each test should build a fresh client and provider, otherwise cached entries leak across cases:

```ts
beforeEach(() => {
  fetchMock.mockClear()
})
```

# Caching

The library ships a built-in in-memory cache — [`QueryStore`](#the-querystore-class) — that handles de-duplication, epoch-based invalidation, and `useSyncExternalStore` integration. You can also plug in a custom cache or swap in TanStack Query via `BloggerTanstackProvider`.

## How invalidation works

Mutations automatically invalidate the queries they affect. Creating a post clears the post list; publishing a page clears that page and the page list. You do not need to refetch by hand.

Invalidation is driven by `epoch`: when a mutation bumps the epoch for a set of keys, any in-flight request started before the bump is discarded on settle instead of overwriting fresher state. This means stale requests cannot race ahead of newer ones.

## The `QueryStore` class

```ts
class QueryStore {
  getSnapshot<T>(key: string): QueryEntry<T>
  subscribe(key: string, listener: () => void): () => void
  cancel(key: string): void
  fetchOnce<T>(key: string, fetcher: (signal: AbortSignal) => Promise<T>): Promise<T>
  invalidate(predicate: (key: string) => boolean): void
}
```

`QueryEntry<T>`:

```ts
interface QueryEntry<T> {
  data: T | undefined
  error: Error | undefined
  isFetching: boolean
  updatedAt: number
  epoch: number
}
```

Subscribe to a key and read the snapshot. `fetchOnce` deduplicates in-flight requests for the same key — two hooks requesting the same data share a single network request.

## Cache API from hooks

From inside a hook you receive `data`, `error`, `isLoading`, `isValidating`, and `refetch`:

```ts
const { data, error, isLoading, isValidating, refetch } = usePosts({ maxResults: 10 })
```

Call `refetch()` to bypass the cache and re-fetch. Call `loadMore()` on paginated hooks to append the next page to `items`.

## Custom cache

To replace the built-in store, implement the same surface. See the [source](https://github.com/itokun99/react-blogger-api/blob/main/src/cache/queryStore.ts) for the full contract.

## TanStack Query adapter

`BloggerTanstackProvider` swaps the built-in `QueryStore` for React Query. The same hooks work unchanged — only the cache backend differs. See [providers](/api/providers#blogger tanstack-provider).

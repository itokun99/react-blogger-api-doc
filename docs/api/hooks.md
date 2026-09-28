# Hooks

All hooks require a [`BloggerProvider`](/api/providers) above them. There are 33 hooks covering every Blogger API v3 method.

## Query result shape

Query hooks return:

```ts
{
  data: T | undefined
  error: Error | undefined
  isLoading: boolean
  isValidating: boolean
  refetch: () => Promise<T | undefined>
}
```

Paginated hooks (`usePosts`, `usePages`, `useComments`, `useCommentsByBlog`, `useSearchPosts`, `useBlogsByUser`, `usePostUserInfos`) additionally return:

```ts
{
  items: readonly T[]
  nextPageToken: string | undefined
  loadMore: () => void
}
```

## Mutation result shape

Mutation hooks return:

```ts
{
  mutate: (args: TArgs) => void
  mutateAsync: (args: TArgs) => Promise<TResult>
  status: 'idle' | 'loading' | 'success' | 'error'
  data: TResult | undefined
  error: Error | undefined
  reset: () => void
}
```

## Posts

| Hook | API method | Returns |
| --- | --- | --- |
| `usePosts(params?, options?)` | `list` | Paginated list with `loadMore()` |
| `usePost(postId, params?, options?)` | `get` | Single post |
| `usePostByPath(path, params?, options?)` | `getByPath` | Single post by URL path |
| `useSearchPosts(params?, options?)` | `search` | Paginated search results with `loadMore()` |
| `useCreatePost()` | `insert` | Mutation → created `Post` |
| `useUpdatePost()` | `update` | Mutation → updated `Post` |
| `usePatchPost()` | `patch` | Mutation → patched `Post` |
| `useDeletePost()` | `delete` | Mutation → `undefined` |
| `usePublishPost()` | `publish` | Mutation → published `Post` |
| `useRevertPost()` | `revert` | Mutation → reverted `Post` |

## Pages

| Hook | API method | Returns |
| --- | --- | --- |
| `usePages(params?, options?)` | `list` | Paginated list with `loadMore()` |
| `usePage(pageId, params?, options?)` | `get` | Single page |
| `useCreatePage()` | `insert` | Mutation → created `Page` |
| `useUpdatePage()` | `update` | Mutation → updated `Page` |
| `usePatchPage()` | `patch` | Mutation → patched `Page` |
| `useDeletePage()` | `delete` | Mutation → `undefined` |
| `usePublishPage()` | `publish` | Mutation → published `Page` |
| `useRevertPage()` | `revert` | Mutation → reverted `Page` |

## Comments

| Hook | API method | Returns |
| --- | --- | --- |
| `useComments(postId, params?, options?)` | `list` | Paginated list with `loadMore()` |
| `useCommentsByBlog(params?, options?)` | `listByBlog` | Paginated list with `loadMore()` |
| `useComment(postId, commentId, params?, options?)` | `get` | Single comment |
| `useDeleteComment()` | `delete` | Mutation → `undefined` |
| `useApproveComment()` | `approve` | Mutation → approved `Comment` |
| `useMarkCommentAsSpam()` | `markAsSpam` | Mutation → comment marked as spam |
| `useRemoveCommentContent()` | `removeContent` | Mutation → comment with content removed |

## Blogs, users, and analytics

| Hook | API method | Returns |
| --- | --- | --- |
| `useBlog(params?, options?)` | `blogs.get` | Single blog |
| `useBlogByUrl(url, params?, options?)` | `blogs.getByUrl` | Blog resolved from URL |
| `useBlogsByUser(userId?, params?, options?)` | `blogs.listByUser` | Paginated list with `loadMore()` |
| `useUser(userId?, options?)` | `users.get` | Authenticated user or specific user |
| `usePageViews(params?, options?)` | `pageViews.get` | Page-view counts for a range |
| `usePostUserInfo(params?, options?)` | `postUserInfos.get` | Per-user info for one post |
| `usePostUserInfos(params?, options?)` | `postUserInfos.list` | Paginated per-user info with `loadMore()` |
| `useBlogUserInfo(options?)` | `blogUserInfos.get` | Per-user info for a blog |

## Custom hooks

Exported so you can build your own cache-backed hooks:

```tsx
import { useBlogger, useBloggerQuery } from 'react-blogger-api'

function useMyThing() {
  const { client, store } = useBlogger()
  return useBloggerQuery({
    store,
    key: 'my-key',
    fetcher: (signal) => client.blogs.get({ blogId: '1234567890' }, signal),
  })
}
```

See [cache](/guide/advanced/cache) for more details.

# Types

Every type below is exported from the package root.

## Resource types

These are the Zod-validated response shapes for each Blogger API entity. All fields are optional because the Blogger API may omit them.

```ts
interface Post {
  kind?: string
  id?: string
  selfLink?: string
  url?: string
  titleLink?: string
  blog?: { id?: string }
  title?: string
  content?: string
  author?: { id?: string; displayName?: string; url?: string; image?: { url?: string } }
  replies?: { totalItems?: string; selfLink?: string; items?: Comment[] }
  labels?: string[]
  images?: { url?: string }[]
  location?: { name?: string; lat?: number; lng?: number; span?: string }
  status?: 'LIVE' | 'DRAFT' | 'SCHEDULED' | 'SOFT_TRASHED'
  readerComments?: 'ALLOW' | 'DONT_ALLOW_SHOW_EXISTING' | 'DONT_ALLOW_HIDE_EXISTING'
  customMetaData?: string
  published?: string
  updated?: string
  trashed?: string
  etag?: string
}

interface Page { /* similar shape to Post without labels/replies */ }
interface Comment {
  kind?: string; id?: string; selfLink?: string
  blog?: { id?: string }; post?: { id?: string }; inReplyTo?: { id?: string }
  content?: string
  author?: { id?: string; displayName?: string; url?: string; image?: { url?: string } }
  status?: 'LIVE' | 'EMPTIED' | 'PENDING' | 'SPAM'
  published?: string; updated?: string
}
interface Blog {
  kind?: string; id?: string; name?: string; description?: string; url?: string
  selfLink?: string
  locale?: { language?: string; variant?: string; country?: string }
  posts?: { totalItems?: number; selfLink?: string; items?: Post[] }
  pages?: { totalItems?: number; selfLink?: string }
  status?: 'LIVE' | 'DELETED'
  customMetaData?: string; published?: string; updated?: string
}
interface User {
  kind?: string; id?: string; displayName?: string; about?: string; url?: string
  selfLink?: string; blogs?: { selfLink?: string }; locale?: { ... }
  created?: string
}
interface Pageviews {
  kind?: string; blogId?: string
  counts?: { timeRange?: 'ALL_TIME' | 'THIRTY_DAYS' | 'SEVEN_DAYS'; count?: string }[]
}
```

## List types

Paginated list envelopes returned by list/search hooks:

```ts
interface PostList {
  kind?: string; etag?: string
  nextPageToken?: string; prevPageToken?: string
  items?: Post[]
}
interface PageList { /* same shape, items: Page[] */ }
interface CommentList { /* same shape, items: Comment[] */ }
interface BlogList { kind?: string; items?: Blog[]; blogUserInfos?: BlogUserInfo[] }
```

## Param enums

All enum types and their value constants are exported:

```ts
type PostStatus = 'LIVE' | 'DRAFT' | 'SCHEDULED' | 'SOFT_TRASHED'
type PageStatus = 'LIVE' | 'DRAFT' | 'SOFT_TRASHED'
type CommentStatus = 'LIVE' | 'EMPTIED' | 'PENDING' | 'SPAM'
type BlogStatus = 'LIVE' | 'DELETED'
type OrderBy = 'ORDER_BY_UNSPECIFIED' | 'PUBLISHED' | 'UPDATED'
type SortOption = 'SORT_OPTION_UNSPECIFIED' | 'DESCENDING' | 'ASCENDING'
type ViewType = 'VIEW_TYPE_UNSPECIFIED' | 'READER' | 'AUTHOR' | 'ADMIN'
type Role = ViewType // Blogger reuses the view enum for blog roles
type PageViewsRange = 'all' | '30DAYS' | '7DAYS' // query param
type PageviewsTimeRange = 'ALL_TIME' | 'THIRTY_DAYS' | 'SEVEN_DAYS' // response enum
```

Value constants are also exported: `POST_STATUSES`, `PAGE_STATUSES`, `COMMENT_STATUSES`, `BLOG_STATUSES`, `ORDER_BY_OPTIONS`, `SORT_OPTIONS`, `VIEW_TYPES`, `PAGE_VIEWS_RANGES`, `PAGEVIEWS_TIME_RANGES`.

## Branded IDs

Blog and post IDs are branded at the client boundary, so a raw `string` cannot be passed where a `BlogId` is expected:

```ts
type BlogId = z.infer<typeof BlogIdSchema> // z.string().min(1).brand<"BlogId">
type PostId = z.infer<typeof PostIdSchema>
type PageId = z.infer<typeof PageIdSchema>
type CommentId = z.infer<typeof CommentIdSchema>
type UserId = z.infer<typeof UserIdSchema>
```

Smart constructors throw `ZodError` on invalid input:

```ts
import { toBlogId, toPostId } from 'react-blogger-api'
const blogId = toBlogId(userInput) // throws if empty
```

# Errors

Every API failure throws one of two error classes:

| Error | Meaning |
| --- | --- |
| `BloggerApiError` | Non-2xx response. Carries `status`, Google's `code`, and an `errors` list. |
| `BloggerParseError` | Response body did not match the expected Zod schema. |

```ts
import { BloggerApiError, BloggerParseError } from 'react-blogger-api'

try {
  await client.posts.get({ blogId, postId })
} catch (error) {
  if (error instanceof BloggerApiError) {
    console.error(error.status, error.code, error.errors)
  } else if (error instanceof BloggerParseError) {
    console.error('parse failed', error.message)
  }
}
```

## `BloggerApiError`

```ts
class BloggerApiError extends Error {
  readonly name = 'BloggerApiError'
  readonly status: number
  readonly code: number | undefined // Google API error code
  readonly errors: readonly BloggerApiErrorDetail[]
}
```

`BloggerApiErrorDetail`:

```ts
interface BloggerApiErrorDetail {
  domain: string
  reason: string
  message: string
}
```

`BloggerApiError` is constructed by a static factory that attempts to parse Google's error envelope; if parsing fails the error still carries the HTTP status.

## `BloggerParseError`

```ts
class BloggerParseError extends Error {
  readonly name = 'BloggerParseError'
}
```

Thrown when a response body does not match the expected Zod schema — usually a schema drift between the package and the live API.

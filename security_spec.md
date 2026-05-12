# Security Specification - Blog CMS

## Data Invariants
1. A Blog Post must have a valid title, content, authorId, and timestamps.
2. Only users listed in the `/admins/` collection can create, update, or delete posts.
3. Anyone can read 'published' posts.
4. Draft posts (published: false) can only be read by Admins.

## The "Dirty Dozen" Payloads (Deny Cases)
1. **Unauthenticated Write**: Creating a post without being logged in.
2. **Identity Spoofing**: Logged-in user 'A' tries to set `authorId` to user 'B'.
3. **Admin Privilege Escalation**: Regular user tries to write to the `/admins/` collection.
4. **Invalid Type**: Setting `published` to a string "true" instead of boolean `true`.
5. **Resource Poisoning**: Sending a 2MB string as the post `content`.
6. **Bypassing Terminal States**: (N/A for this simple blog, but could be "changing author after creation").
7. **Orphaned Writes**: (N/A for this structure).
8. **Shadow Fields**: Adding an `isAdmin: true` field to a blog post document.
9. **Draft Leak**: Regular user trying to 'get' or 'list' posts where `published == false`.
10. **Timestamp Fraud**: Client providing a `createdAt` value from the past/future instead of `request.time`.
11. **Mass Update**: User trying to update only the `authorId` of an existing post.
12. **Malformed ID**: Creating a post with a 1MB long document ID.

## Test Strategy
The rules will enforce:
- `isSignedIn()`
- `isAdmin()` (via lookup)
- `isValidBlogPost()`
- Strict `affectedKeys()` during updates.
- Server-side comparison for timestamps.

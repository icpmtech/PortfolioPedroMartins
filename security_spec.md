# Security Specification - Blog CMS

## Data Invariants
1. A Blog Post must have a valid title, content, authorId, and timestamps.
2. Only users listed in the `/admins/` collection can create, update, or delete posts.
3. Anyone can read 'published' posts.
4. Draft posts (published: false) can only be read by Admins.
5. Comments must belong to a post, have an author, and content must be length-limited.
6. Only signed-in users can create comments.
7. Users can only delete their own comments (admins can delete any).

## The "Dirty Dozen" Payloads (Deny Cases)
1. **Unauthenticated Write**: Creating a post without being logged in.
2. **Identity Spoofing**: Logged-in user 'A' tries to set `authorId` to user 'B' on a comment or post.
3. **Admin Privilege Escalation**: Regular user tries to write to the `/admins/` collection.
4. **Invalid Type**: Setting `published` to a string "true" instead of boolean `true`.
5. **Resource Poisoning**: Sending a 2MB string as post or comment content.
6. **Bypassing Terminal States**: (N/A).
7. **Orphaned Writes**: (N/A).
8. **Shadow Fields**: Adding random extra fields to documents.
9. **Draft Leak**: Regular user trying to 'get' or 'list' posts where `published == false`.
10. **Timestamp Fraud**: Client providing a `createdAt` value instead of `request.time`.
11. **Mass Update**: User trying to update fields they don't own.
12. **Comment Poisoning**: Injecting HTML or excessive length into comments.

## Test Strategy
The rules will enforce:
- `isSignedIn()`
- `isAdmin()` (via lookup)
- `isValidBlogPost()`
- `isValidComment()`
- Strict `affectedKeys()` during updates.
- Server-side comparison for timestamps.
- Relational check for comments (parent post must exist and be published).

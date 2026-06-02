# Chrome Extensions Page

Standalone legal/support pages for Chrome extension products.

## Routes

- `/xtonotion/privacy`
- `/xtonotion/terms`
- `/ai-chat-backup/privacy`
- `/uninstall`

The uninstall feedback page accepts optional query parameters:

- `product`: Display name for the extension.
- `version`: Extension version.
- `locale`: Browser or extension locale.
- `extensionId` or `extId`: Chrome extension ID.

Example:

```text
/uninstall?product=X%2FTwitter%20Tweet%20Backup&version=1.0.0&locale=en
```

## Environment

The feedback API submits uninstall responses to GitHub Issues. Configure these server-side environment variables:

```env
GITHUB_FEEDBACK_REPO="owner/repo"
GITHUB_FEEDBACK_TOKEN="github_pat_xxxx"
GITHUB_FEEDBACK_LABELS="uninstall-feedback"
```

`GITHUB_FEEDBACK_LABELS` is optional. Leave it unset if the target repo does not already have those labels.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

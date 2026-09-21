# Texcortech Social Automation

Secure server-side bridge between Texcortech Systems and Buffer's GraphQL API.

## Environment variables

- `BUFFER_ACCESS_TOKEN` — Buffer personal API key. Store only in Vercel Environment Variables.
- `AUTOMATION_SECRET` — a separate long random secret used to protect the publishing endpoint.

## API routes

- `GET /api/buffer/channels` verifies Buffer authentication and returns account organizations.
- `POST /api/buffer/post` creates a Buffer post. Send `x-automation-secret` and JSON containing `text`, `channelId`, and optionally `dueAt` or `saveToDraft`.

## Deployment

Import this repository into Vercel, then add the two environment variables under Project Settings → Environment Variables and redeploy.

Note: Buffer's current public API documentation lists LinkedIn among supported post-creation platforms. TikTok can be connected in Buffer's product, but is not currently listed among API-supported post-creation platforms, so this bridge should not assume TikTok API publishing until Buffer documents support.


# CosmeticLab Frontend

## Author

Keirna

This project is a Vite + React frontend prepared for:

- Frontend hosting on a static host/CDN
- Backend API hosting on a separate host
- Database (SQL) behind the backend only
- Future Shopify checkout/session integration

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Copy environment template:

```bash
cp .env.example .env.local
```

3. Start dev server:

```bash
npm run dev
```

4. Build production bundle:

```bash
npm run build
```

## Environment variables

Use `.env.local` for local development.

- `VITE_API_BASE_URL`: backend API base URL (for auth, checkout session, cart sync in future)
- `VITE_ENABLE_MOCK_AUTH`: set `false` when backend auth is live
- `VITE_REQUEST_TIMEOUT_MS`: API timeout in milliseconds
- `VITE_SHOPIFY_STOREFRONT_API_URL`: optional Shopify Storefront GraphQL endpoint
- `VITE_SHOPIFY_STOREFRONT_TOKEN`: optional Shopify Storefront token

## Backend contract expected by frontend

When your backend is ready, this frontend expects:

- `POST /auth/login` -> `{ user: { id, email, name } }`
- `POST /auth/signup` -> `{ user: { id, email, name } }`
- `POST /auth/logout` -> `204` or `200`
- `POST /checkout/session` -> `{ checkoutUrl?: string }`

The frontend uses cookie-based requests with `credentials: include` and sends `X-Requested-With: XMLHttpRequest`.

## Shopify compatibility path

Current architecture already includes a checkout service abstraction:

- Frontend calls backend `/checkout/session`
- Backend creates Shopify checkout/session
- Backend returns `checkoutUrl`
- Frontend redirects user to Shopify-hosted checkout

This keeps Shopify secrets on the backend, not in the browser.

## Frontend security hardening included now

- Environment-driven API and integration config (no hard-coded endpoints)
- Centralized HTTP client with:
  - request timeout
  - `credentials: include`
  - JSON accept headers
  - optional CSRF token forwarding from `csrf_token` cookie to `X-CSRF-Token`
- Safer local state parsing for persisted data
- CSP and referrer policy meta tags in `index.html`
- Route redirects use declarative navigation (safer than side effects in render)
- Cart line-item operations are variant-safe (id + shade), better for future backend line IDs

## Important security note

Frontend cannot enforce all security by itself. For production, your backend and hosts must also enforce:

- HTTP-only secure session cookies
- CSRF protection strategy (double-submit token or same-site + CSRF token)
- Strict CORS allowlist (your frontend domain only)
- Rate limiting and bot protection on auth/checkout endpoints
- Input validation/sanitization server-side
- SQL parameterization and least-privilege DB credentials
- Security headers at host/CDN level (`CSP`, `HSTS`, `X-Frame-Options`, etc.)
- TLS everywhere (frontend, backend, database transport)

Treat frontend hardening as one layer, not the full security boundary.
  
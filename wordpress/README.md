# WordPress Integration Notes

This folder contains guidelines for integrating a WordPress public site with Campus Hub.

Options for integration:

- Public-only: run WordPress as a separate site for marketing / public pages; link to Campus Hub for authenticated portal.
- API integration: use the WordPress REST API to pull public content into the React app or to publish events/news.
- SSO / Authentication: integrate via OAuth2 / OpenID Connect or using JWT-based SSO. Recommended approach:
  1. Run WordPress on a public host or in a subdirectory/subdomain (e.g., `cms.example.edu`).
  2. Install a plugin like "WP OAuth Server" or "JWT Authentication for WP REST API" to enable SSO.
  3. Configure the plugin to accept tokens issued by Campus Hub (if using JWT) or configure Campus Hub to accept WordPress SSO.

For now: the backend provides public endpoints (e.g., `/api/events`) that WordPress or the WordPress theme can consume via server-side requests.

If you want, I can:
- Add example code to call Campus Hub APIs from a WordPress plugin or theme.
- Provide an SSO flow example using OAuth2 with Flask as authorization server.

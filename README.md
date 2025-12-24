# Natours Project

Backend service for the Natours travel platform built with Node.js, Express, and MongoDB; supports managing tours, users, and reviews as part of the Udemy course project.

## Getting Started
- Install dependencies: `npm install`
- Start with file watching: `npm start`
- Debug with the inspector: `npm run debug`
- Run with production env flag: `npm run start:prod`
- Validate the OpenAPI doc: `npm run validate:docs`

## Environment Variables
Create `config.env` in the project root with values for:
- `NODE_ENV` (`development` or `production`) and `PORT` (defaults to 3000)
- `DATABASE` (connection string with `<PASSWORD>` placeholder) and `DATABASE_PASSWORD`
- `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_COOKIE_EXPIRES_IN` (in days)
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USERNAME`, `EMAIL_PASSWORD` for SMTP

## API Docs
- Swagger UI is available after the server starts at `http://localhost:3000/api-docs`
- The OpenAPI spec documents only the JSON API under `/api/v1`; server-rendered view routes (`/`, `/tour/:slug`, `/login`, `/signup`) are intentionally not included.

## Frontend bundle
- Client scripts/styles are bundled with Parcel. Use `npm run build:js` for a one-off build or `npm run watch:js` during development.
- Bundled assets in `public/js` (`bundle.js`, `bundle.css`, sourcemaps, Leaflet icons) are generated artifacts and ignored in git; rebuild them when deploying.

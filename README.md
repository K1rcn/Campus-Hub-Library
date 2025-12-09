# Campus Hub — React + Flask Starter

This repository is a starter scaffold for the Campus Hub CCP project (React frontend + Flask backend).

Key features included:
- Minimal Flask backend with JWT auth, role-based decorator, SQLAlchemy models (User, Event, Complaint).
- Minimal React frontend (Vite) with a login form and API service to call backend endpoints.
- README with run instructions and next-step suggestions.

This scaffold is intentionally minimal and designed to be extended with additional modules, UI polish, and production hardening (HTTPS, secure cookie handling, CORS settings, DB migrations, CI/CD).

## Quick start (development)

Prerequisites:
- Python 3.10+ (or 3.8+)
- Node.js 18+ and npm

From project root:

1) Backend (Windows cmd.EXE):

```cmd
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
set FLASK_APP=app.py
set FLASK_ENV=development
flask run
```

The backend will start on `http://127.0.0.1:5000`.

2) Frontend:

```cmd
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173` (Vite default). The React app calls the Flask API under `/api`.

## Architecture notes & justification
- Backend: Flask provides a lightweight, flexible API server for REST-style endpoints and integrates with SQLAlchemy for portable DB access. JWT is used for stateless authentication enabling easy integration with multiple frontends (web, mobile).
- Frontend: React + Vite for fast dev iteration and modern SPA features; easy to expand into role-based dashboards and modular feature pages.
- DB: SQLAlchemy with SQLite for dev; can be switched to MySQL/Postgres in production.

## Next steps (recommended)
- Add proper CORS and cookie/security handling for production.
- Add migrations (Flask-Migrate/Alembic) and seed data scripts.
- Expand frontend with role-based routing and protected components.
- Add unit and integration tests and a CI pipeline. Consider Docker and docker-compose for local multi-service development.

---
Generated scaffold — extend modules and UI per project requirements.

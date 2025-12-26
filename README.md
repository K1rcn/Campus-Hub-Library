# CampusHub

CampusHub is a lightweight library-management / campus resource demo app with a Flask + React stack. It supports user registration/login, admin user management, book CRUD, borrowing/return flows (with due dates and fines), events, and complaints. The project is designed for demos, coursework, and as a starter template for session-based auth apps.

## Features
- Session-based authentication using Flask-Login (Argon2 password hashing).
- Role-based access (user / admin) with server-side admin cap (max 4 admins).
- Book CRUD and CSV import preview for admin.
- Borrowing system with:
  - 14-day default loan period
  - Due date tracking
  - Fine calculation: INR 100 per overdue day
  - Only the borrower may return a book (admins may view borrowings)
- Frontend: React (Vite) with Context API; UI using Material UI (MUI).
- Backend: Flask, SQLAlchemy, Flask-Migrate (Alembic) for migrations.

## Tech Stack
- Backend: Python, Flask, SQLAlchemy, Flask-Login, Flask-Migrate
- Frontend: React, Vite, React Router, Material UI
- DB (dev): SQLite (swap to MySQL/Postgres in production)
- Password hashing: Argon2 (passlib)
- Dev tooling: venv, npm/yarn

## Quick Start (Development)

Prerequisites:
- Python 3.10+ (or your project venv)
- Node.js 16+ and npm/yarn

Backend (Windows cmd example):
```cmd
# create / activate venv
python -m venv .venv
.venv\Scripts\activate

# install backend deps
pip install -r requirements.txt

# set FLASK_APP and run migrations
set FLASK_APP=backend.app:create_app
flask db upgrade

# seed the database (imports 1000 books)
python [import_frontend_seed.py](http://_vscodecontentref_/0)

# start backend (development)
flask run --host=0.0.0.0 --port=5000

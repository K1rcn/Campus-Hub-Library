"""Bulk import script to populate the database with the frontend-like 1000-book seed.

Run after migrations have been applied and the app can access the DB.

Usage (Windows cmd):
  cd /d d:\CampusHub\backend
  .\.venv\Scripts\activate
  set FLASK_APP=app:create_app
  python import_frontend_seed.py

This script will create 1000 books (if the books table is empty).
"""
from app import create_app
from database.extensions import db
from database.models import Book
from datetime import datetime

def generate_books(target=1000):
    books = []
    sections = ['Tech','English Literature','Manga & Comics','Urdu Books','Science','Novels','Business & Self-Help','History & Biography','Children & Young Adult']
    next_id = 1
    for i in range(target):
        sec = sections[i % len(sections)]
        title = f"{sec} Sample Title {i+1}"
        author = 'Various Authors' if sec == 'Urdu Books' else f'Author {i%200+1}'
        copies = 2 + (i % 5)
        available = max(0, copies - (i % 3))
        year = 1980 + (i % 45)
        isbn = f'GEN-{str(i+1).zfill(6)}'
        cover_url = f'https://picsum.photos/seed/book{str(i+1)}/300/420'
        books.append({
            'title': title,
            'author': author,
            'isbn': isbn,
            'year': year,
            'category': sec,
            'section': sec,
            'copies': copies,
            'available': available,
            'cover_url': cover_url
        })
    return books

def import_seed(app):
    with app.app_context():
        existing = Book.query.count()
        if existing > 0:
            print(f"Books table already has {existing} rows; aborting import.")
            return
        seed = generate_books(1000)
        objs = [Book(**b) for b in seed]
        db.session.bulk_save_objects(objs)
        db.session.commit()
        print(f"Imported {len(objs)} books into database.")

if __name__ == '__main__':
    app = create_app()
    import_seed(app)

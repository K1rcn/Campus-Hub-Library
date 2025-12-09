from .extensions import db
from passlib.hash import argon2
from flask_login import UserMixin
from datetime import datetime
from datetime import timedelta


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(30), default='student')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        # store hashed password using Argon2 (passlib wrapper)
        self.password_hash = argon2.hash(password)

    def check_password(self, password):
        try:
            return argon2.verify(password, self.password_hash)
        except Exception:
            return False

    def to_dict(self):
        return {"id": self.id, "username": self.username, "role": self.role, "created_at": self.created_at.isoformat()}


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)

    def to_dict(self):
        return {"id": self.id, "title": self.title, "description": self.description}


class Complaint(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(200), nullable=False)
    body = db.Column(db.Text)
    status = db.Column(db.String(30), default='open')

    def to_dict(self):
        return {"id": self.id, "user_id": self.user_id, "title": self.title, "body": self.body, "status": self.status}


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    author = db.Column(db.String(200))
    isbn = db.Column(db.String(60), index=True)
    year = db.Column(db.Integer)
    category = db.Column(db.String(120))
    section = db.Column(db.String(120))
    copies = db.Column(db.Integer, default=1)
    available = db.Column(db.Integer, default=1)
    cover_url = db.Column(db.String(500))

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'isbn': self.isbn,
            'year': self.year,
            'category': self.category,
            'section': self.section,
            'copies': self.copies,
            'available': self.available,
            'coverUrl': self.cover_url
        }


class Borrowing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date_borrowed = db.Column(db.DateTime)
    date_due = db.Column(db.DateTime)
    date_returned = db.Column(db.DateTime, nullable=True)
    fine_amount = db.Column(db.Integer, default=0)
    returned = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'book_id': self.book_id,
            'user_id': self.user_id,
            'date_borrowed': self.date_borrowed.isoformat() if self.date_borrowed else None,
            'date_due': self.date_due.isoformat() if self.date_due else None,
            'date_returned': self.date_returned.isoformat() if self.date_returned else None,
            'returned': self.returned,
            'fine_amount': int(self.fine_amount or 0)
        }

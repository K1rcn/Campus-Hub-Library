from app import create_app
from database.extensions import db
from database.models import User, Book
from datetime import datetime

app = create_app()

def seed():
    with app.app_context():
        # create tables if not present
        db.create_all()
        # ensure admin
        if not User.query.filter_by(username='admin').first():
            admin = User(username='admin', role='admin')
            admin.set_password('adminpass')
            db.session.add(admin)

        # add sample books if none
        if Book.query.count() == 0:
            samples = [
                {'title': 'Introduction to Algorithms', 'author':'Cormen et al.', 'year':2009, 'isbn':'9780262033848', 'section':'Tech', 'copies':5, 'available':3},
                {'title': 'Clean Code', 'author':'Robert C. Martin', 'year':2008, 'isbn':'9780132350884', 'section':'Tech', 'copies':3, 'available':2},
                {'title': 'Pride and Prejudice', 'author':'Jane Austen', 'year':1813, 'isbn':'9780141439518', 'section':'English Literature', 'copies':5, 'available':3},
            ]
            for s in samples:
                b = Book(**s)
                db.session.add(b)

        db.session.commit()
        print('Seeding complete')

if __name__ == '__main__':
    seed()

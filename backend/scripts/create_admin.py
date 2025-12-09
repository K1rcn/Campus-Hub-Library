import os, sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from database.models import User
from database.extensions import db

USERNAME = 'urwa'
PASSWORD = '1234567'
ROLE = 'admin'

app = create_app()
with app.app_context():
    # Check if username exists
    if User.query.filter_by(username=USERNAME).first():
        print(f"User '{USERNAME}' already exists")
        sys.exit(1)
    # Check admin cap
    admin_count = User.query.filter_by(role='admin').count()
    if ROLE == 'admin' and admin_count >= 4:
        print(f"Cannot create admin: admin cap reached ({admin_count})")
        sys.exit(1)
    user = User(username=USERNAME, role=ROLE)
    user.set_password(PASSWORD)
    db.session.add(user)
    db.session.commit()
    print('Created admin:', user.id, user.username)

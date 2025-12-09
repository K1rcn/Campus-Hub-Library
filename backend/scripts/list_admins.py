import os, sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from database.models import User

app = create_app()
with app.app_context():
    admins = User.query.filter_by(role='admin').all()
    print('admin_count=', len(admins))
    for u in admins:
        print(u.id, u.username, u.created_at)

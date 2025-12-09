import os
from flask import Flask
# Use the database package for extensions and models
from database.extensions import db, migrate
# Import all models so Alembic can detect them for migrations
from database.models import User, Book, Borrowing, Event, Complaint
from routes import bp as api_bp
from auth_routes import bp as auth_bp
from flask_cors import CORS
from flask_login import LoginManager
import datetime


def create_app():
    app = Flask(__name__)
    db_path = os.environ.get('DATABASE_URL', 'sqlite:///campushub.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = db_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-change-me')
    app.config['SESSION_COOKIE_SECURE'] = False

    # allow frontend origin and support cookies
    CORS(app, supports_credentials=True, origins=["http://localhost:5173"]) 

    db.init_app(app)
    # migrate is configured in database.extensions
    migrate.init_app(app, db)

    # Initialize Login manager for session-based auth
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        try:
            return User.query.get(int(user_id))
        except Exception:
            return None

    with app.app_context():
        # Instead of db.create_all(), let flask-migrate handle schema creation
        # db.create_all() is called after 'flask db upgrade' succeeds
        
        # seed admin if missing (only if tables exist)
        try:
            if not User.query.filter_by(username='admin').first():
                admin = User(username='admin', role='admin')
                admin.set_password('adminpass')
                db.session.add(admin)
                db.session.commit()
        except Exception as e:
            # Tables don't exist yet; skip seeding until after migrations
            pass

    app.register_blueprint(api_bp)
    app.register_blueprint(auth_bp)

    @app.route('/')
    def home():
        return {"msg": "Campus Hub API"}

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

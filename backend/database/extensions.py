from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Initialize extensions here to avoid circular import issues.
db = SQLAlchemy()
migrate = Migrate()

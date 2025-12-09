"""Database package for CampusHub backend.

This package contains SQLAlchemy extensions and the models module.
"""

from .extensions import db, migrate

__all__ = ["db", "migrate"]

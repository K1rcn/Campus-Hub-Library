from flask import Blueprint, request, jsonify
from database.extensions import db
from database.models import User
from flask_login import login_user, logout_user, current_user, login_required

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'student')
    if not username or not password:
        return jsonify({"ok": False, "msg": "username and password required"}), 200
    if User.query.filter_by(username=username).first():
        return jsonify({"ok": False, "msg": "username already exists"}), 200
    # Enforce maximum number of admin accounts
    if role == 'admin':
        admin_count = User.query.filter_by(role='admin').count()
        if admin_count >= 4:
            return jsonify({"ok": False, "msg": "maximum number of admin accounts reached (4)"}), 200
    user = User(username=username, role=role)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    # auto-login after registration
    login_user(user)
    return jsonify({"ok": True, "user": user.to_dict()}), 200


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({"ok": False, "msg": "username and password required"}), 200
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"ok": False, "msg": "bad credentials"}), 200
    login_user(user)
    return jsonify({"ok": True, "user": user.to_dict()}), 200


@bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"ok": True, "msg": "logged out"}), 200


@bp.route('/me', methods=['GET'])
def me():
    if current_user and current_user.is_authenticated:
        return jsonify({"ok": True, "user": current_user.to_dict()}), 200
    return jsonify({"ok": False, "msg": "not authenticated"}), 200

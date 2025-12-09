from flask import Blueprint, request, jsonify
from database.extensions import db
from database.models import User, Event, Complaint, Book, Borrowing
from flask_login import login_required, current_user
from datetime import datetime, timedelta

bp = Blueprint('api', __name__, url_prefix='/api')


@bp.route('/ping')
def ping():
    return jsonify({"msg": "pong"})


@bp.route('/users', methods=['GET'])
@login_required
def list_users():
    # only admin can list users
    if current_user.role != 'admin':
        return jsonify({"msg": "forbidden"}), 403
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])


@bp.route('/users/<int:user_id>/role', methods=['PUT'])
@login_required
def update_user_role(user_id):
    # only admins can change roles
    if current_user.role != 'admin':
        return jsonify({"ok": False, "msg": "forbidden"}), 403
    data = request.get_json() or {}
    new_role = data.get('role')
    if not new_role:
        return jsonify({"ok": False, "msg": "role required"}), 400
    user = User.query.get_or_404(user_id)
    # If promoting to admin, enforce maximum of 3 admins
    if new_role == 'admin' and user.role != 'admin':
        admin_count = User.query.filter_by(role='admin').count()
        if admin_count >= 4:
            return jsonify({"ok": False, "msg": "maximum number of admin accounts reached (4)"}), 400
    user.role = new_role
    db.session.commit()
    return jsonify({"ok": True, "user": user.to_dict()})


@bp.route('/events', methods=['GET', 'POST'])
def events():
    if request.method == 'GET':
        events = Event.query.all()
        return jsonify([e.to_dict() for e in events])
    data = request.get_json() or {}
    title = data.get('title')
    description = data.get('description')
    if not title:
        return jsonify({"msg": "title required"}), 400
    ev = Event(title=title, description=description)
    db.session.add(ev)
    db.session.commit()
    return jsonify(ev.to_dict()), 201


@bp.route('/complaints', methods=['GET', 'POST'])
def complaints():
    if request.method == 'GET':
        comps = Complaint.query.all()
        return jsonify([c.to_dict() for c in comps])
    data = request.get_json() or {}
    title = data.get('title')
    body = data.get('body')
    user_id = data.get('user_id')
    if not title:
        return jsonify({"msg": "title required"}), 400
    c = Complaint(title=title, body=body, user_id=user_id)
    db.session.add(c)
    db.session.commit()
    return jsonify(c.to_dict()), 201


# Books CRUD
@bp.route('/books', methods=['GET', 'POST'])
def books_list_create():
    if request.method == 'GET':
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 24))
        q = request.args.get('q', '').lower()
        section = request.args.get('section', '')
        query = Book.query
        if q:
            query = query.filter(Book.title.ilike(f"%{q}%") | Book.author.ilike(f"%{q}%") | Book.isbn.ilike(f"%{q}%") )
        if section:
            query = query.filter_by(section=section)
        total = query.count()
        items = query.order_by(Book.id).offset((page-1)*per_page).limit(per_page).all()
        return jsonify({"items": [b.to_dict() for b in items], "total": total})

    # create
    if not current_user.is_authenticated or current_user.role != 'admin':
        return jsonify({"ok": False, "msg": "forbidden"}), 403
    data = request.get_json() or {}
    if not data.get('title'):
        return jsonify({"ok": False, "msg": "title required"}), 400
    book = Book(
        title=data.get('title'),
        author=data.get('author'),
        isbn=data.get('isbn'),
        year=data.get('year'),
        category=data.get('category'),
        section=data.get('section'),
        copies=data.get('copies') or 1,
        available=data.get('available') if data.get('available') is not None else (data.get('copies') or 1),
        cover_url=data.get('coverUrl') or data.get('cover_url')
    )
    db.session.add(book)
    db.session.commit()
    return jsonify({"ok": True, "book": book.to_dict()}), 201


@bp.route('/books/<int:book_id>', methods=['GET', 'PUT', 'DELETE'])
def book_detail(book_id):
    book = Book.query.get_or_404(book_id)
    if request.method == 'GET':
        return jsonify(book.to_dict())
    if request.method == 'PUT':
        if not current_user.is_authenticated or current_user.role != 'admin':
            return jsonify({"ok": False, "msg": "forbidden"}), 403
        data = request.get_json() or {}
        for k in ['title','author','isbn','year','category','section','copies','available','coverUrl','cover_url']:
            if k in data:
                setattr(book, 'cover_url' if k in ('coverUrl','cover_url') else k, data[k])
        db.session.commit()
        return jsonify({"ok": True, "book": book.to_dict()})
    if request.method == 'DELETE':
        if not current_user.is_authenticated or current_user.role != 'admin':
            return jsonify({"ok": False, "msg": "forbidden"}), 403
        db.session.delete(book)
        db.session.commit()
        return jsonify({"ok": True}), 200


# Borrow/return
@bp.route('/books/<int:book_id>/borrow', methods=['POST'])
@login_required
def borrow_book(book_id):
    book = Book.query.get_or_404(book_id)
    if book.available <= 0:
        return jsonify({"ok": False, "msg": "Not available"}), 400
    book.available -= 1
    borrowed_at = datetime.utcnow()
    # default loan period: 14 days
    due_at = borrowed_at + timedelta(days=14)
    b = Borrowing(book_id=book.id, user_id=current_user.id, date_borrowed=borrowed_at, date_due=due_at, returned=False, fine_amount=0)
    db.session.add(b)
    db.session.commit()
    return jsonify({"ok": True, "borrow": b.to_dict()})


@bp.route('/borrowings/<int:borrow_id>/return', methods=['POST'])
@login_required
def return_borrow(borrow_id):
    b = Borrowing.query.get_or_404(borrow_id)
    if b.returned:
        return jsonify({"ok": False, "msg": "Already returned"}), 400
    # Only the borrower may return the book
    if b.user_id != current_user.id:
        return jsonify({"ok": False, "msg": "only the borrower can return this book"}), 403

    returned_at = datetime.utcnow()
    b.returned = True
    b.date_returned = returned_at
    # calculate fine: 100 rupees per full overdue day
    fine = 0
    if b.date_due and returned_at > b.date_due:
        # compute full days overdue
        days_overdue = (returned_at.date() - b.date_due.date()).days
        if days_overdue > 0:
            fine = days_overdue * 100
    b.fine_amount = fine

    book = Book.query.get(b.book_id)
    if book:
        book.available = (book.available or 0) + 1
    db.session.commit()
    return jsonify({"ok": True, "fine": fine, "borrow": b.to_dict()})


@bp.route('/borrowings', methods=['GET'])
@login_required
def list_borrowings():
    # Admins can pass optional user_id to filter; regular users can only see their own
    user_id = request.args.get('user_id', type=int)
    if current_user.role == 'admin':
        if user_id:
            items = Borrowing.query.filter_by(user_id=user_id).all()
        else:
            items = Borrowing.query.all()
    else:
        # non-admins only see their own borrowings
        items = Borrowing.query.filter_by(user_id=current_user.id).all()
    # include related book and user info
    result = []
    for it in items:
        book = Book.query.get(it.book_id)
        user = User.query.get(it.user_id)
        d = it.to_dict()
        d['book'] = book.to_dict() if book else None
        d['user'] = { 'id': user.id, 'name': getattr(user, 'username', '') } if user else None
        result.append(d)
    return jsonify(result)

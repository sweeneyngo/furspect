from app.shared.models import db

class UserModel(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True, nullable=False),
    email = db.Column(db.String(64), unique=True, nullable=False),
    userSince = db.Column(db.DateTime())

    files = db.relationship('FileModel', backref='user', lazy=True)

    def __init__(self, username, email, userSince):
        self.username = username
        self.email = email
        self.userSince = userSince

    def __repr__(self):
        return f"<File {self.name}>"
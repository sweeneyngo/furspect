from app.shared.models import db

class TopicModel(db.Model):
    __tablename__ = 'topic'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False),
    files = db.relationship('FileModel', backref='topic', lazy=True)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<File {self.name}>"
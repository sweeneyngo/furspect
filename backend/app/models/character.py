from app.shared.models import db

class CharacterModel(db.Model):
    __tablename__ = 'character'

    id_character = db.Column(db.Integer, primary_key=True)
    id_topic = db.Column(db.Integer, foreign_key=True)
    name = db.Column(db.String()),
    files = db.relationship('FileModel', backref='character', lazy=True)


    def __init__(self, id_topic, name):
        self.id_topic = id_topic
        self.name = name

    def __repr__(self):
        return f"<File {self.name}>"
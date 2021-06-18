from flask_sqlalchemy import SQLAlchemy
from app import app

db = SQLAlchemy(app)

class FileModel(db.Model):
    __tablename__ = 'files'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    accuracy = db.Column(db.Integer())
    width = db.Column(db.Integer())
    height = db.Column(db.Integer())
    favcount = db.Column(db.Integer())

    def __init__(self, name, accuracy, width, height, favcount):
        self.name = name
        self.accuracy = accuracy
        self.width = width
        self.height = height
        self.favcount = favcount

    def __repr__(self):
        return f"<File {self.name}>"
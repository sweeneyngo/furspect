from app.shared.models import db

class FileModel(db.Model):
    __tablename__ = 'files'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    accuracy = db.Column(db.Float())
    width = db.Column(db.Integer())
    height = db.Column(db.Integer())
    favcount = db.Column(db.Integer())
    displayName = db.Column(db.String())
    hexS3 = db.Column(db.String())
    color = db.Column(db.String())
    username = db.Column(db.String())


    def __init__(self, name, accuracy, width, height, favcount, displayName, hexS3, color, username):
        self.name = name
        self.accuracy = accuracy
        self.width = width
        self.height = height
        self.favcount = favcount
        self.displayName = displayName
        self.hexS3 = hexS3
        self.color = color
        self.username = username

    def __repr__(self):
        return f"<File {self.name}>"
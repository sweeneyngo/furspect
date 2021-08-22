from app.shared.models import db

class FileModel(db.Model):
    __tablename__ = 'files'

    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    id_topic = db.Column(db.Integer, db.ForeignKey('topic.id'), nullable=False)
    id_character = db.Column(db.Integer, db.ForeignKey('character.id'), nullable=False)
    id_prediction = db.Column(db.Integer, db.ForeignKey('prediction.id', nullable=False))

    width = db.Column(db.Integer())
    height = db.Column(db.Integer())
    favcount = db.Column(db.Integer())
    hexS3 = db.Column(db.String())
    color = db.Column(db.String())
    fileSince = db.Column()


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
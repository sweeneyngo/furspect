from app.shared.models import db

class PredictionModel(db.Model):
    __tablename__ = 'prediction'

    id = db.Column(db.Integer, primary_key=True)
    id_file = db.Column(db.Integer(), db.ForeignKey('file.id'), nullable=False),
    accuracy = db.Column(db.Float())

    prediction = db.relationship('FileModel', backref='prediction', lazy=True, uselist=False)

    def __init__(self, id_file, accuracy):
        self.id_file = id_file,
        self.accuracy = accuracy

    def __repr__(self):
        return f"<File {self.name}>"
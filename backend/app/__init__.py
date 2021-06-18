from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://misu:bristlerinseundefinedscamacquire02@localhost:5432/furspect"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

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
        
cors = CORS(app, resources={r"/": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

from app import routes
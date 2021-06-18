from app import app
from app.models.file import FileModel
from flask import render_template, after_this_request, request
from app.model.predict import predict_image
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import json

db = SQLAlchemy(app)

@app.route('/')
@app.route('/index')

def index():
    user = {'username': 'Miguel'}
    posts = [
        {
            'author': {'username': 'John'},
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': {'username': 'Susan'},
            'body': 'The Avengers movie was so cool!'
        }
    ]
    return render_template('index.html', title='Home', user=user, posts=posts)

@app.route("/inspect", methods=['POST'])
@cross_origin()
def inspect():
    if request.method == "POST":
        print(request.files['file'])
        return predict_image(request.files['file'])

@app.route("/files", methods=['POST', 'GET'])
@cross_origin()
def files():
    if request.method == "POST":
        file = request.files['file']
        data = {
            
            'name': request.form['name'],
            'accuracy': int(request.form['accuracy']),
            'width': int(request.form['width']),
            'height': int(request.form['height']),
            'favcount': int(request.form['favcount']),
        }

        print(data)
        new_file = FileModel(name=data['name'], accuracy=data['accuracy'], width=data['width'], height=data['height'], favcount=data['favcount'])
        db.session.add(new_file)
        db.session.commit()
        return {"message": 'Successful POST to /files! PSQL has been updated with new file!', "file": f"{file}", "data": f'{data}'}
    
    elif request.method == "GET":
        files = FileModel.query.all()
        results = [
            {
                "name": file.name,
                "accuracy": file.accuracy,
                "width": file.width,
                "height": file.height,
                "favcount": file.favcount
            } for file in files]

        return {"count": len(results), "files": results}



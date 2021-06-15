from app import app
from flask import render_template, after_this_request, request
from app.model.predict import predict_image
from flask_cors import CORS, cross_origin

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



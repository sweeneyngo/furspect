from app import app
from app.models.file import FileModel
from app.model.predict import predict_image

from flask import request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import boto3
import os
import binascii


db = SQLAlchemy(app)

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
        hex = str(binascii.b2a_hex(os.urandom(15)))[2:-1]

        # Uploading file to S3 bucket
        print(file)
        bucket = 'furspect-media'
        s3_client = boto3.client('s3')

        # reinstate hex if already exist
        if 'Contents' in s3_client.list_objects(Bucket=bucket):
            for item in s3_client.list_objects(Bucket=bucket)['Contents']:
                while hex in item['Key']:
                    hex = str(binascii.b2a_hex(os.urandom(15)))[2:-1]

        hex += f".{request.form['name'].split('.')[-1]}"
        response = s3_client.put_object(Body=file, Bucket=bucket, Key=hex, ContentType=request.mimetype)

        data = {
            
            'name': request.form['name'],
            'accuracy': request.form['accuracy'],
            'width': int(request.form['width']),
            'height': int(request.form['height']),
            'favcount': int(request.form['favcount']),
            'displayName': request.form['name'],
            'hexS3': hex,
            'color': '#000',
            'username': 'anon',
        }

        print(data)
        new_file = FileModel(name=data['name'], accuracy=data['accuracy'], width=data['width'], height=data['height'], favcount=data['favcount'], displayName=data['displayName'], hexS3=data['hexS3'], color=data['color'], username=data['username'])
        
        # Adding image metadata to psql
        db.session.add(new_file)
        db.session.commit()

        return {"message": 'Successful POST to /files! PSQL has been updated with new file!', "file": f"{file}", "data": f'{data}', "s3_response": f'{response}'}
    
    elif request.method == "GET":
        files = FileModel.query.all()
        bucket='furspect-media'
        results = [
            {
                "name": file.name,
                "accuracy": file.accuracy,
                "width": file.width,
                "height": file.height,
                "favcount": file.favcount,
                'displayName': file.displayName,
                'hexS3': file.hexS3,
                'color': file.color,
                'username': file.username
            } for file in files]

        s3 = boto3.client('s3')
        contents = []
        for item in s3.list_objects(Bucket=bucket)['Contents']:
            contents.append(item)

        return {"count": len(results), "files": results, "contents": contents}



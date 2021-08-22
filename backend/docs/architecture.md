## API Architecture

---

### Notices

#### User Agents

    A non-empty User-Agent header is required for all requests. Please pick a descriptive User-Agent for your project.

    If you are using a javascript based method for requests, such as creating a userscript, a browser extension, or are otherwise unable to set a custom header from inside a browser, please attach an additional url query parameter named _client and set it based on how you would have set your user-agent.

#### Responses

| Status Code               | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| 200 OK                    | Request was successful                                                   |
| 204 No Content            | Request was successful, nothing will be returned (DELETE).               |
| 403 Forbidden             | Access denied. May indicate a lack of User-Agent header (see Notice #2). |
| 404 Not Found             | Not found                                                                |
| 500 Internal Server Error | Some unknown error occurred on the server.                               |

#### Responses

##### FileApi

**UPDATE files/**
Update the current favcount of an S3 image file.

```javascript
{
  "favcount": db.Column(db.Integer());
  "hexS3": db.Column(db.String());
}
```

_Response_

```javascript
{
    "hexS3": String,
    "favcount": Number,
    "message": String,
}
```

**POST files/**
Create a new image file to be published on S3.

```javascript
{
    // enforce int32
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String())
    accuracy = db.Column(db.Float())
    width = db.Column(db.Integer())
    height = db.Column(db.Integer())
    favcount = db.Column(db.Integer())
    displayName = db.Column(db.String())
    color = db.Column(db.String())
    file = [ImageFileObject, ...],

}
```

_Response_

```javascript
{
    "message": String,
    "file": ImageFile,
    "data": FileObject,
    "s3_response": ResponseObject
}

```

**GET files/**
View all current image files stored on S3.

_Response_

```javascript
{
    "count": Integer,
    "files": [FileObject, ...],
    "contents": [s3ListObject, ...],
}
```

**FileObject**

```javascript
{
  // enforce int32
  id = db.Column(db.Integer, (primary_key = True));

  name = db.Column(db.String());
  accuracy = db.Column(db.Float());
  width = db.Column(db.Integer());
  height = db.Column(db.Integer());
  favcount = db.Column(db.Integer());
  displayName = db.Column(db.String());
  hexS3 = db.Column(db.String());
  color = db.Column(db.String());
  username = db.Column(db.String());
}
```

##### UserApi

```javascript
{
  // enforce int32
  id = db.Column(db.Integer, (primary_key = True));

  name = db.Column(db.String());
  accuracy = db.Column(db.Float());
  width = db.Column(db.Integer());
  height = db.Column(db.Integer());
  favcount = db.Column(db.Integer());
  displayName = db.Column(db.String());
  hexS3 = db.Column(db.String());
  color = db.Column(db.String());
  username = db.Column(db.String());
}
```

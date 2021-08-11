import boto3
import botocore.exceptions
import hmac  # generate hash algo
import hashlib  # supplies sha256 hashname
import base64  # byte encoder
import json
from dotenv import load_dotenv  # load configuration
import os

load_dotenv()

USER_POOL_ID = os.environ.get("USER_POOL_ID")
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")


def get_hash_secret(username):
    msg = username + CLIENT_ID
    dig = hmac.new(str(CLIENT_SECRET).encode("utf-8"), msg=str(msg).encode("utf-8"), digestmod=hashlib.sha256).digest()
    d2 = base64.b64encode(dig).decode()
    return d2


def lambda_handler(event, context):
    for field in ["username", "email", "password", "name"]:
        if not event.get(field):
            return {"error": False, "success": True, "message": f"{field} is not present.", "data": None}
    username = event["username"]
    email = event["email"]
    password = event["password"]
    name = event["name"]

    client = boto3.client("cognito-idp")

    try:
        resp = client.sign_up(
            ClientId=CLIENT_ID,
            SecretHash=get_hash_secret(username),
            Username=username,
            Password=password,
            UserAttributes=[{"Name": "name", "Value": name}, {"Name": "email", "Value": email}],
            ValidationData=[{"Name": "email", "Value": email}, {"Name": "custom:username", "Value": username}],
        )
    except client.exceptions.UsernameExistsException as e:
        return {"error": False, "success": True, "message": "This username already exists", "data": None}
    except client.exceptions.InvalidPasswordException as e:

        return {
            "error": False,
            "success": True,
            "message": "Password should have Caps,\
                          Special chars, Numbers",
            "data": None,
        }

    except client.exceptions.UserLambdaValidationException as e:
        return {"error": False, "success": True, "message": "Email already exists", "data": None}

    except Exception as e:
        return {"error": False, "success": True, "message": str(e), "data": None}

    return {
        "error": False,
        "success": True,
        "message": "Please confirm your signup, \
                        check Email for validation code",
        "data": None,
    }

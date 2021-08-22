from PIL import Image
import numpy as np
from skimage import transform
import os
import json
import requests
from dotenv import load_dotenv
load_dotenv()


url = os.environ.get('MODEL_URL')


def load_image(image):
    file = image

    np_image = Image.open(file)
    np_image = np.array(np_image).astype("float32") / 255
    np_image = transform.resize(np_image, (224, 224, 3))
    np_image = np.expand_dims(np_image, axis=0)
    return np_image


def predict_image(image):
    file = image
    print(file)

    np_image = Image.open(file)
    np_image = np.array(np_image).astype("float32") / 255
    np_image = transform.resize(np_image, (224, 224, 3))
    np_image = np.expand_dims(np_image, axis=0)

    print(np_image.shape)
    data = json.dumps({"signature_name": "serving_default", "instances": np_image.tolist()})
    headers = {"content-type": "application/json"}
    resp = requests.post(url, data=data, headers=headers)
    print("Request returned...")
    print(resp.text, resp.status_code, resp.headers.items())
    res = json.loads(resp.text)["predictions"]
    classes = [
        "cane",
        "cavallo",
        "elefante",
        "farfalla",
        "furry",
        "gallina",
        "gatto",
        "mucca",
        "pecora",
        "ragno",
        "scoiattolo",
    ]
    print(res[0])

    nivo = []
    for i, v in enumerate(classes):
        nivo.append({"class": classes[i], "probability": f"{res[0][i]}", "probabilityColor": "rgb(229, 231, 235)"})

    return {"data": f"{res[0][4]}", "probs": res[0], "labels": classes, "nivo": nivo}

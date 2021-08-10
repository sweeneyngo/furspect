import matplotlib.pyplot as plt
import requests
import json
import numpy as np
from PIL import Image
import numpy as np
from skimage import transform
from tensorflow.keras.models import load_model
from matplotlib import pyplot as plt
import os

url = "http://34.121.100.208:8501/v1/models/saved_model:predict"


def make_prediction(instances):

    path = "train"
    folder = os.listdir(os.path.join(path))
    chosen = folder[np.random.randint(0, 11)]
    dir = os.path.join(path, chosen)
    print(dir)
    images = os.listdir(dir)
    # # load all images into a list
    index = np.random.randint(0, len(images))
    file = images[index]

    print(file)

    np_image = Image.open(os.path.join(dir, file))
    np_image = np.array(np_image).astype("float32") / 255
    np_image = transform.resize(np_image, (224, 224, 3))
    np_image = np.expand_dims(np_image, axis=0)

    print(np_image.shape)
    data = json.dumps({"signature_name": "serving_default", "instances": np_image.tolist()})
    headers = {"content-type": "application/json"}
    resp = requests.post(url, data=data, headers=headers)
    print("Request returned...")
    print(resp.text, resp.status_code, resp.headers.items())

    return resp.text, resp.status_code, resp.headers.items()


predictions = make_prediction("furry/furry/7901_furry.png")

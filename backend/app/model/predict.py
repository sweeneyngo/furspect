from PIL import Image
import numpy as np
from skimage import transform
from tensorflow.keras.models import load_model
from matplotlib import pyplot as plt
import cv2
import os
import requests
import base64

def load_image(image):
  file = image

  np_image = Image.open(file)
  np_image = np.array(np_image).astype('float32')/255
  np_image = transform.resize(np_image, (200, 200, 3))
  np_image = np.expand_dims(np_image, axis=0)
  return np_image


def predict_image(image):
  final = load_image(image)
  model = load_model(os.path.join(os.getcwd(), 'app/model/furspect_best_2.h5'))
  res = model.predict(final, batch_size=10)
  return {
    'data': res[0].tolist(),
  }
from PIL import Image
import numpy as np
from skimage import transform
from tensorflow.keras.models import Sequential
from keras.applications.vgg16 import VGG16
from tensorflow.keras.layers import Dense, Flatten

from matplotlib import pyplot as plt
import os


def load_image(image):
  file = image

  np_image = Image.open(file)
  np_image = np.array(np_image).astype('float32')/255
  np_image = transform.resize(np_image, (224, 224, 3))
  np_image = np.expand_dims(np_image, axis=0)
  return np_image


def predict_image(image):
  final = load_image(image)

  base = VGG16(include_top = False, input_shape=(224, 224, 3))
  model = Sequential()
  model.add(base)
  model.add(Flatten())
  model.add(Dense(256, activation='relu'))
  model.add(Dense(11, activation='softmax'))

  for layer in base.layers:
    layer.trainable = False

  model.layers[0].trainable = False

  model.compile(loss='categorical_crossentropy', optimizer='adam',
                metrics=['accuracy'])
  model.build(input_shape=(None, 224, 224, 3))
  model.load_weights('app/model/model_weights.h5')
  res = model.predict(final, batch_size=10)

  classes = ['cane', 'cavallo', 'elefante', 'farfalla', 'furry', 'gallina', 'gatto', 'mucca', 'pecora', 'ragno', 'scoiattolo']
  print(res[0])


  nivo = []
  for i, v in enumerate(classes):
    nivo.append({
      "class": classes[i],
      "probability": f'{res[0][i]}',
      "probabilityColor": "rgb(229, 231, 235)"
    })
  
  return {
    'data': f'{res[0][4]}',
    'probs': res[0].tolist(),
    'labels': classes,
    'nivo': nivo
  }

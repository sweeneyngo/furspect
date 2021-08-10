import sys
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import os
import subprocess
import tempfile
from tensorflow import keras

# confirm python version
assert sys.version_info.major == 3, 'Oops, not running Python 3. Use Runtime > Change runtime type'

# tf/keras
print("Installing dependencies for Colab environment")
print(f'Tensorflow version:{tf.__version__}')

MODEL_DIR = tempfile.gettempdir()
version = 1
export_path = os.path.join(MODEL_DIR, str(version))
print(f'Export Path: {export_path}')

model = tf.keras.models.load_model('furspect_best.h5')
print(model.summary())

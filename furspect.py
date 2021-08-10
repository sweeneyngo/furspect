# Refer to Jupyter notebooks for process + dataset visualization

# general
import numpy as np
from PIL import Image
import os, glob
import matplotlib.pyplot as plt
import zipfile
import random

# tf
import tensorflow as tf
from tensorflow import keras 
import tensorflow.keras.backend as K
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers
from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import Dense, Flatten, Dropout, Activation, Conv2D, MaxPooling2D, BatchNormalization
from tensorflow.keras import regularizers
from tensorflow.keras.optimizers import SGD
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint, CSVLogger

class FurspectModel():

    def __init__(self):
        seed = 42
        random.seed(seed)
        os.environ['PYTHONHASHSEED'] = str(seed)
        np.random.seed(seed)
        pass 

    def generateImages(self, train, test):
        batch = 32

        K.clear_session()
        datagen = ImageDataGenerator(rescale=1./255,
                    shear_range=0.2,
                    zoom_range=0.2,
                    horizontal_flip=True,
                    rotation_range=30,
                    width_shift_range=0.1,
                    height_shift_range=0.1,
                    samplewise_center=True)
        val_datagen = ImageDataGenerator(rescale=1./255,
                        samplewise_center=True)

        train_it = datagen.flow_from_directory(os.path.join(train, 'train'),
            class_mode="categorical", interpolation="lanczos", batch_size=batch, target_size=(224, 224))
        val_it = val_datagen.flow_from_directory(os.path.join(test, 'validation'),
            class_mode="categorical", interpolation="lanczos", batch_size=batch, target_size=(224, 224))

        return train_it, val_it

    def initializeModel(self):
        base = VGG16(include_top=False, input_shape=(224, 224, 3))
        model = Sequential()
        model.add(base)
        model.add(Flatten())
        model.add(Dense(256, activation='relu'))
        model.add(Dense(11, activation='softmax'))
        # model.add(Dropout(0.2))
        # model.add(Dense(11, kernel_regularizer=regularizers.l2(0.005), activation='softmax'))

        # use frozen model
        for layer in base.layers:
            layer.trainable = False

        model.layers[0].trainable = False

        model.compile(loss='categorical_crossentropy', optimizer='adam',
                    metrics=['accuracy'])
        model.build(input_shape=(None, 224, 224, 3))
        # define new model
        model.summary()
        return model

    def trainModel(self, train, test, model, callbacks):
        history = model.fit(train,
            validation_data=test, epochs=50, verbose=1, callbacks=[callbacks], shuffle=False)
        return history

    def initializeCallbacks():
        earlystop = EarlyStopping(monitor='val_loss', patience = 10)
        learning_rate_reduction = ReduceLROnPlateau(monitor = 'val_loss', patience=1, verbose = 1,factor = 0.2, min_lr = 1e-8, min_delta=0.0001)
        mc = ModelCheckpoint('furspect_model.h5', monitor='val_accuracy', mode='max', verbose=1)
        csv_logger = CSVLogger('furspect_class.log')
        callbacks = [earlystop, learning_rate_reduction, mc, csv_logger]
        return callbacks
    
    def main(self):
        train_data_path= ""
        test_data_path=
        train_it, test_it = self.generateImages(train_data_path, test_data_path)
        model = self.initializeModel()
        callbacks = self.initializeCallbacks()
        history = self.trainModel(train_it, test_it, model, callbacks)
        print("Successfully trained model.")
        return history

if __name__== "__main__":
    a = FurspectModel()
    a.main()
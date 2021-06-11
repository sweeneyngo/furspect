# furspect

# Purpose
to scientifically and mathematically determine if it's a furry or not.

# Documentation


Model 1: One Block VGG Model
- Optimized with binary cross-entropy loss
- ReLU activation + HE weight initialization
- 200x200 dimmensions
- SGD, lr=0.001, momentum=0.9
- batchsize:32
- epoch=20
- dense=128
```
Model: "sequential"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
conv2d (Conv2D)              (None, 200, 200, 32)      896       
_________________________________________________________________
max_pooling2d (MaxPooling2D) (None, 100, 100, 32)      0         
_________________________________________________________________
flatten (Flatten)            (None, 320000)            0         
_________________________________________________________________
dense (Dense)                (None, 128)               40960128  
_________________________________________________________________
dense_1 (Dense)              (None, 1)                 129       
=================================================================
Total params: 40,961,153
Trainable params: 40,961,153
Non-trainable params: 0
_________________________________________________________________
None
```
![1block](https://user-images.githubusercontent.com/44306479/119242340-dfe38480-bb11-11eb-8170-a80c9c66682c.png)

# Visualizations
![filtersoneblock2](https://user-images.githubusercontent.com/44306479/119242364-f8ec3580-bb11-11eb-8c66-2fc67870b5e9.png)

![conv2d_layer_oneblock](https://user-images.githubusercontent.com/44306479/119242368-fb4e8f80-bb11-11eb-9029-fcd8859fc67e.png)

![featuremaps](https://user-images.githubusercontent.com/44306479/119242369-fc7fbc80-bb11-11eb-8679-96f2d32518d7.png)

Model 4: Three Block VGG Model + Dropout (0.2/0.5)
- Optimized with binary cross-entropy loss
- ReLU activation + HE weight initialization
- 200x200 dimmensions
- SGD, lr=0.001, momentum=0.9
- batchsize:32
- epoch=20
- Accuracy=91.023
- dense=128

```
Model: "sequential_2"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
conv2d_2 (Conv2D)            (None, 200, 200, 32)      896       
_________________________________________________________________
max_pooling2d_2 (MaxPooling2 (None, 100, 100, 32)      0         
_________________________________________________________________
dropout (Dropout)            (None, 100, 100, 32)      0         
_________________________________________________________________
conv2d_3 (Conv2D)            (None, 100, 100, 64)      18496     
_________________________________________________________________
max_pooling2d_3 (MaxPooling2 (None, 50, 50, 64)        0         
_________________________________________________________________
dropout_1 (Dropout)          (None, 50, 50, 64)        0         
_________________________________________________________________
conv2d_4 (Conv2D)            (None, 50, 50, 128)       73856     
_________________________________________________________________
max_pooling2d_4 (MaxPooling2 (None, 25, 25, 128)       0         
_________________________________________________________________
dropout_2 (Dropout)          (None, 25, 25, 128)       0         
_________________________________________________________________
flatten_2 (Flatten)          (None, 80000)             0         
_________________________________________________________________
dense_4 (Dense)              (None, 128)               10240128  
_________________________________________________________________
dropout_3 (Dropout)          (None, 128)               0         
_________________________________________________________________
dense_5 (Dense)              (None, 1)                 129       
=================================================================
Total params: 10,333,505
Trainable params: 10,333,505
Non-trainable params: 0
_________________________________________________________________
None
```

![index](https://user-images.githubusercontent.com/44306479/119069028-2d3ce600-b99a-11eb-8f44-e466927ec7ac.png)


Model 5: Three Block VGG Model + Dropout (0.25/0.5) + rmsprop optimizer
- Optimized with binary cross-entropy loss
- ReLU activation + HE weight initialization
- 200x200 dimmensions
- rmsprop, lr=0.001, momentum=0.9
- batchsize:32
- epoch=20
- Accuracy=97.23
- dense=512
- batch normalization


```
Model: "sequential_3"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
conv2d_1 (Conv2D)            (None, 200, 200, 32)      896       
_________________________________________________________________
batch_normalization (BatchNo (None, 200, 200, 32)      128       
_________________________________________________________________
max_pooling2d (MaxPooling2D) (None, 100, 100, 32)      0         
_________________________________________________________________
dropout (Dropout)            (None, 100, 100, 32)      0         
_________________________________________________________________
conv2d_2 (Conv2D)            (None, 100, 100, 64)      18496     
_________________________________________________________________
batch_normalization_1 (Batch (None, 100, 100, 64)      256       
_________________________________________________________________
max_pooling2d_1 (MaxPooling2 (None, 50, 50, 64)        0         
_________________________________________________________________
dropout_1 (Dropout)          (None, 50, 50, 64)        0         
_________________________________________________________________
conv2d_3 (Conv2D)            (None, 50, 50, 128)       73856     
_________________________________________________________________
batch_normalization_2 (Batch (None, 50, 50, 128)       512       
_________________________________________________________________
max_pooling2d_2 (MaxPooling2 (None, 25, 25, 128)       0         
_________________________________________________________________
dropout_2 (Dropout)          (None, 25, 25, 128)       0         
_________________________________________________________________
flatten (Flatten)            (None, 80000)             0         
_________________________________________________________________
dense (Dense)                (None, 512)               40960512  
_________________________________________________________________
dropout_3 (Dropout)          (None, 512)               0         
_________________________________________________________________
dense_1 (Dense)              (None, 1)                 513       
=================================================================
Total params: 41,055,169
Trainable params: 41,054,721
Non-trainable params: 448
_________________________________________________________________
None
```
```
8/8 [==============================] - 28s 3s/step - loss: 0.2607 - accuracy: 0.9729
> 97.286
```

![index](data:image/png;base64,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)


# Credits
- thank you McSib for [e621downloader](https://github.com/McSib/e621_downloader)

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



# Credits
- thank you McSib for [e621downloader](https://github.com/McSib/e621_downloader)

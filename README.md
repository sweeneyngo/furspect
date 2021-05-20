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

Model 4: Three Blod VGG Model + Dropout (0.2/0.5)
- Optimized with binary cross-entropy loss
- ReLU activation + HE weight initialization
- 200x200 dimmensions
- SGD, lr=0.001, momentum=0.9
- batchsize:32
- epoch=20


# Credits
- thank you McSib for [e621downloader](https://github.com/McSib/e621_downloader)

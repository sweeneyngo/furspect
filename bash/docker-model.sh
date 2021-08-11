#!/bin/bash
docker run -p 8501:8501 --name furspect_serving \
--mount type=bind,source=/home/misu/.code/furspect/saved_model/,target=/models/saved_model \
-e MODEL_NAME=saved_model -t tensorflow/serving
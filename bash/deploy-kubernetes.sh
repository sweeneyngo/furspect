#!/bin/bash

CLUSTER = 'furspect-serving-cluster'
CONFIG = 'furspect_k8s.yaml'
NODES = 3
gcloud auth login --project $CLUSTER
gcloud container clusters create $CLUSTER --num-nodes $NODES
gcloud config set container/cluster $CLUSTER
gcloud container clusters get-credentials $CLUSTER

docker tag $USER/resnet_serving gcr.io/tensorflow-serving/resnet
gcloud auth configure-docker
docker push gcr.io/tensorflow-serving/resnet

# create configuration
kubectl apply -f $CONFIG

# view status of deployments
kubectl get deployments

# view status of pods
kubectl get pods

# view status of service
kubectl get service

# view summary
kubectl describe service furspect-serving-service
# !/bin/bash

echo "Deploying flask backend. . ."
eb create furspect-backend

echo "Opening application. . ."
eb open 

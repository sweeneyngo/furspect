# !/bin/bash

echo "Initializing furspect database. . ."
flask init
flask migrate
flask upgrade
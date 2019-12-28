#!/bin/bash

# create secret.json
echo $GCLOUD_SERVICE_KEY | base64 -d > key.json

# activate service account
gcloud auth activate-service-account --key-file=key.json

# run
./run.sh
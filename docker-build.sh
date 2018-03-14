#!/bin/bash

echo "---Start---"

appName=$1
appVersion=$2

buildImage="$appName-build:latest"
image="$appName:$appVersion"

PROJECT_FOLDER='/project'

echo " "
echo "---Build builder-image---"
docker build --build-arg --build-arg PROJECT_FOLDER=$PROJECT_FOLDER -f ./Dockerfile-build -t $buildImage .

echo " "
echo "---Run builder-container---"
docker run -d $buildImage
builderContainerId=`docker ps | grep $buildImage | awk '{print $1}'`

mkdir tmp

echo " "
echo "---Copy in tmp folder all required for prod files---"

docker cp $builderContainerId:$PROJECT_FOLDER/build ./tmp/build

echo " "
echo "---Build service container---"
docker build --build-arg PROJECT_FOLDER=$PROJECT_FOLDER -f ./Dockerfile -t $image .

echo " "
echo "---Clean up tmp files---"
rm -rf tmp
docker rm -f $builderContainerId

# push $image to repository
# run service container from $image (docker run --name router-demo -d -p 8080:8080 -e NODE_ENV=production <imageId> node build/server.js)

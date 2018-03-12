#!/bin/bash

echo "---Start---"

appName=$1
appVersion=$2
buildImage="$appName-build:latest"
image="$appName:$appVersion"

echo "---Build builder image---"
docker build -f ./Dockerfile-build -t $buildImage .

echo "---Run builder container---"
docker run -d $buildImage
builderContainerId=`docker ps | grep $buildImage | awk '{print $1}'`

echo "builderContainerId $builderContainerId";

mkdir tmp

echo "---Copy in tmp folder all required for prod files---"
cp package.json ./tmp/package.json
docker cp $builderContainerId:/src/build ./tmp/build
docker cp $builderContainerId:/src/node_modules ./tmp/node_modules

echo "---Build service container---"
docker build -f ./Dockerfile -t $image .

echo "---Clean tmp files---"
rm -rf tmp
docker rm -f $builderContainerId

# push $image to repository
# run service container from $image (docker run --name router-demo -d -p 8080:8080 -e NODE_ENV=production <imageId> node build/server.js)

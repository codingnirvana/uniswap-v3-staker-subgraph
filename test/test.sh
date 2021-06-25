#!/bin/sh

DIRECTORY=$(cd `dirname $0` && pwd)

__cleanup ()
{
    docker-compose -f $DIRECTORY/docker-compose.yml stop
    rm -r -f $DIRECTORY/data
}

trap __cleanup EXIT

docker-compose -f $DIRECTORY/docker-compose.yml up --build -d

sleep 60
echo "Servers are up"

yarn codegen
yarn build
yarn create-local
yarn deploy-local

echo "Running tests"
sleep 20

yarn mocha
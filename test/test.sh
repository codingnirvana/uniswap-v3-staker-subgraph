#!/bin/sh

DIRECTORY=$(cd `dirname $0` && pwd)

__cleanup ()
{
    docker-compose -f $DIRECTORY/docker-compose.yml stop

    rm docker-compose.yml
    mv docker-compose.yml-e docker-compose.yml

    # Commenting this out due to failing pipeline
    rm -r -f $DIRECTORY/data
}

trap __cleanup EXIT

./setup-host.sh
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
#!/bin/sh

DIRECTORY=$(cd `dirname $0` && pwd)

__cleanup ()
{
    docker-compose -f $DIRECTORY/docker-compose.yml stop

    mv $DIRECTORY/docker-compose.yml-e $DIRECTORY/docker-compose.yml
    rm -r -f $DIRECTORY/data
}

trap __cleanup EXIT

$DIRECTORY/setup-host.sh
docker-compose -f $DIRECTORY/docker-compose.yml up --build -d

sleep 60
echo "Servers are up"

yarn codegen
yarn build
yarn create-local
yarn deploy-local

echo "Running tests"
sleep 20

yarn ts-mocha $DIRECTORY/../*.ts
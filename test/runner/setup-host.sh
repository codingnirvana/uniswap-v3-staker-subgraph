#!/usr/bin/env bash
DIRECTORY=$(cd `dirname $0` && pwd)

set -e

if ! which docker 2>&1 > /dev/null; then
    echo "Please install 'docker' first"
    exit 1
fi

if ! which docker-compose 2>&1 > /dev/null; then
    echo "Please install 'docker-compose' first"
    exit 1
fi

if ! which jq 2>&1 > /dev/null; then
    echo "Please install 'jq' first"
    exit 1
fi

# Create the graph-node container
docker-compose -f $DIRECTORY/docker-compose.yml up --no-start graph-node

# Start graph-node so we can inspect it
docker-compose -f $DIRECTORY/docker-compose.yml start graph-node

# Identify the container ID
CONTAINER_ID=$(docker container ls | grep graph-node | cut -d' ' -f1)

# Inspect the container to identify the host IP address
HOST_IP=$(docker inspect "$CONTAINER_ID" | jq -r .[0].NetworkSettings.Networks[].Gateway)

echo "Host IP: $HOST_IP"

# Inject the host IP into docker-compose.yml
sed -i -e "s/host.docker.internal/$HOST_IP/g" $DIRECTORY/docker-compose.yml

function stop_graph_node {
    # Ensure graph-node is stopped
    docker-compose -f $DIRECTORY/docker-compose.yml stop graph-node
}

trap stop_graph_node EXIT
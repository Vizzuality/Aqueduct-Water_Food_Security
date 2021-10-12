#!/bin/bash

set -e

yarn

#export DOCKER_HOST_IP=$(route -n | grep UG | awk '{print $2}')

exec "$@"

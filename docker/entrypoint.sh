#!/bin/bash

set -e

yarn install --frozen-lockfile --production
yarn cache clean

#export DOCKER_HOST_IP=$(route -n | grep UG | awk '{print $2}')

exec "$@"

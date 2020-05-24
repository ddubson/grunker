#!/usr/bin/env bash

set -e

pushd grunker-web-ts
  yarn install
popd

pushd grunker-api-ts
  yarn install
popd
#!/bin/bash

ls -lart $1
cd $1
npm install -g @quasar/cli
npm install
npm run build
cp -r $1/dist/pwa/* ../

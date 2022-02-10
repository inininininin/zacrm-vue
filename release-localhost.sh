#!/bin/bash

group=za
project=crm

sed -i "s/project='.*'/project='$project'/g" ./src/main.js

echo "-assign version"
version=`date +%y%m%d%H`
echo version: $version
sed -i "s/version='.*'/version='$version'/g" ./src/main.js
echo

npm run dev

echo --start http://127.0.0.1/mumu/index.html
start http://127.0.0.1/mumu/index.html
echo

#!/bin/bash

project=mumu
environment=localhost

sed -i "s/environment='.*'/environment='$environment'/g" ./src/main.js
sed -i "s/project='.*'/project='$project'/g" ./src/main.js

echo "-assign version"
version=`date +%y%m%d%H`
echo version: $version
sed -i "s/version='.*'/version='$version'/g" ./src/main.js
echo

npm run serve

echo --start http://127.0.0.1/mumu/index.html
start http://127.0.0.1/mumu/index.html
echo

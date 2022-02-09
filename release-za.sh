#!/bin/bash
group=za
project=crm

sed -i "s/project='.*'/project='$project'/g" ./src/main.js

versionMsg=$1
if [ -z "$versionMsg" ]; then
 versionMsg='pack 更新'
fi


echo "-assign version"
version=`date +%y%m%d%H`
echo version: $version
sed -i "s/version='.*'/version='$version'/g" ./src/main.js
echo

npm run build

echo "-package"
commitid=`git rev-parse --short HEAD`
packageName="$group-$project-vue-$version-$commitid.zip"
echo $packageName
cd ./dist
../zip -q -r ../packages/$packageName ./
cd ..
echo

echo "-git add"
git add .
echo

echo "-git commit"
git commit -am "$versionMsg"
echo

echo "-git pull"
git pull
echo

echo "-git push"
git push
echo

echo success

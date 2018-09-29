#!/bin/bash -e

# Check deployment type argument is passed in
if [ "$#" -lt 1 ]; then
    echo "Usage $0 [OPTIONS] TYPE"
    exit -1
fi

# Get the type and check it is valid
for type; do true; done
if [[ "$type" == "staging" ]]; then
    name=smartcourse-staging
elif [[ "$type" == "prod" ]]; then
    name=smartcourse
else
    echo "Type must be either 'staging' or 'prod'"
    exit -1
fi

echo "Backing up database on server..."
read -d '' TMP_CMDS << EOF || true
{
    "command": "If Not Exist db (mkdir db) & \
                If Not Exist db/smartcourse.db (node src/models/db/new.js) \
                Else (echo 'Need this for some reason...') & \
                cp -f db/smartcourse.db ../db/",
    "dir": "site/wwwroot"
}
EOF
curl -u $AZURE_USER:$AZURE_PASS \
    --header "Content-Type: application/json" \
    --request POST \
    --data "$TMP_CMDS" \
    https://$name.scm.azurewebsites.net/api/command
echo ""

echo "Compiling..."
cd frontend
npm install
npm run build-$type

# Zip the web app files
cd ../backend
rm -f smartcourse.zip
cp ../scripts/backup.sh .
zip -r smartcourse.zip package.json web.config backup.sh data public src
rm backup.sh
echo ""

echo "Deploying..."
curl -u $AZURE_USER:$AZURE_PASS \
    --request POST \
    --data-binary @smartcourse.zip https://$name.scm.azurewebsites.net/api/zipdeploy
echo ""

echo "Restoring database, backing up to blob storage and installing modules..."
read -d '' TMP_CMDS << EOF || true
{
    "command": "mkdir db || cp ../db/smartcourse.db db/ && npm install",
    "dir": "site/wwwroot"
}
EOF

curl -u $AZURE_USER:$AZURE_PASS \
    --header "Content-Type: application/json" \
    --request POST \
    --data "$TMP_CMDS" \
    https://$name.scm.azurewebsites.net/api/command
echo ""
read -d '' TMP_CMDS << EOF || true
{
    "command": "bash backup.sh $type",
    "dir": "site/wwwroot"
}
EOF
curl -u $AZURE_USER:$AZURE_PASS \
    --header "Content-Type: application/json" \
    --request POST \
    --data "$TMP_CMDS" \
    https://$name.scm.azurewebsites.net/api/command
echo ""

echo "DONE!"

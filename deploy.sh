#!/bin/bash -e

# Check deployment type argument is passed in
if [ "$#" -lt 1 ]; then
    echo "Usage $0 [OPTIONS] TYPE"
    exit -1
fi
for type; do true; done
if [[ "$type" != "staging" && "$type" != "prod" ]]; then
    echo "Type must be either 'staging' or 'prod'"
fi

# Compile the front end
cd frontend
npm install
npm run build-$type

# Zip the web app files
cd ../backend
rm -f smartcourse.zip
zip -r smartcourse.zip package.json web.config data public src

# Backup the database
authorization_header="Authorization: SharedKey smartcoursebackups$STORAGE_KEY"
read -d '' TMP_CMDS << EOF || true
{
    "command": "cp -f db/smartcourse.db ../db/",
    "dir": "site/wwwroot"
}
EOF
curl -u $AZURE_USER:$AZURE_PASS \
    --header "Content-Type: application/json" \
    --request POST \
    --data "$TMP_CMDS" \
    https://smartcourse-$type.scm.azurewebsites.net/api/command

# Deploy the site
curl -u $AZURE_USER:$AZURE_PASS \
    --request POST \
    --data-binary @smartcourse.zip https://smartcourse-$type.scm.azurewebsites.net/api/zipdeploy

# Install modules on the server and restore the database
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
    https://smartcourse-$type.scm.azurewebsites.net/api/command

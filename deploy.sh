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

echo "Installing modules..."
read -d '' TMP_CMDS << EOF || true
{
    "command": "npm install",
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

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
npm install
npm run build-$type

# Zip the web app files
rm -f smartcourse.zip
zip -r smartcourse.zip public
echo ""

echo "Deploying..."
curl -u $AZURE_USER:$AZURE_PASS \
    --request POST \
    --data-binary @smartcourse.zip https://$name.scm.azurewebsites.net/api/zipdeploy
echo ""

echo "DONE!"

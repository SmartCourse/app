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

# Deploy the given environment
cd frontend
npm install
npm run build

cd ../backend
npm install

eb use "smartcourse-$type"
eb list
eb deploy

## Iterate through all the arguments provided
#while test $#;
#do
#    # The back end
#    cd ./backend
#    if [[ "$1" == "-i" ]]; then
#        npm install
#    elif [[ "$1" == "--start" ]]; then
#        npm start > /dev/null 2>&1 &
#        echo "Back end started."
#    fi
#
#    # The front end 
#    cd ../frontend
#    if [[ "$1" == "-i" ]]; then
#        npm install
#    elif [[ "$1" == "--start" ]]; then
#        npm run serve > /dev/null 2>&1 &
#        echo "Front end started."
#    fi
#
#    # Kill the processes if requested
#    if [[ "$1" == "--stop" ]]; then
#        killall node > /dev/null 2>&1
#    fi
#
#    # Back to root directory and get the next argument
#    cd ../
#    shift
#done

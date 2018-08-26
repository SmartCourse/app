#!/bin/bash -e
# Script that controls both the front and back end
# Run from the root directory
# Paramters:
#   -i      : installs node modules
#   --start : start the services
#   --stop  : stop the services 

# Iterate through all the arguments provided
while test $#;
do
    # The back end
    cd ./backend
    if [[ "$1" == "-i" ]]; then
        npm install
    elif [[ "$1" == "--start" ]]; then
        npm start > /dev/null 2>&1 &
        echo "Back end started."
    fi

    # The front end 
    cd ../frontend
    if [[ "$1" == "-i" ]]; then
        npm install
    elif [[ "$1" == "--start" ]]; then
        npm run serve > /dev/null 2>&1 &
        echo "Front end started."
    fi

    # Kill the processes if requested
    if [[ "$1" == "--stop" ]]; then
        killall node > /dev/null 2>&1
    fi

    # Back to root directory and get the next argument
    cd ../
    shift
done
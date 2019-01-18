#!/bin/bash

DOCKER_NAME='smartcourse-testing'

docker kill $DOCKER_NAME
docker rm $DOCKER_NAME

set -ex

# docker build --tag $DOCKER_NAME .
docker run \
    --name $DOCKER_NAME \
    --env 'ACCEPT_EULA=Y' \
    --env "MSSQL_SA_PASSWORD=$AZURE_SQL_PASSWORD" \
    -p 1433:1433 \
    -d microsoft/mssql-server-linux:2017-latest 

sleep 20

docker exec -it $DOCKER_NAME /opt/mssql-tools/bin/sqlcmd \
   -S localhost,1433 -U SA -P "$AZURE_SQL_PASSWORD" \
   -Q 'CREATE DATABASE testdb'
 
# really this should be a dockerfile as with all db config \_(* *)_/

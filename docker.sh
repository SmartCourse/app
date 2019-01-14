#!/bin/bash -e

docker pull microsoft/mssql-server-linux:2017-latest
# docker build --tag 'smartcourse-testing' .
docker run \
    --name 'smartcourse-testing' \
    --env 'ACCEPT_EULA=Y' \
    --env "MSSQL_SA_PASSWORD=$AZURE_SQL_PASSWORD" \
    -p 1433:1433 \
    -d microsoft/mssql-server-linux:2017-latest 

sleep 20

docker exec -it 'smartcourse-testing' /opt/mssql-tools/bin/sqlcmd \
   -S localhost,1433 -U SA -P "$AZURE_SQL_PASSWORD" \
   -Q 'CREATE DATABASE testdb'
 
# really this should be a dockerfile as with all db config \_(* *)_/
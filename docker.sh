#!/bin/bash -e

docker pull microsoft/mssql-server-linux:2017-latest
sudo docker run \
    --name 'smartcourse-testing' \
    --env 'ACCEPT_EULA=Y' \
    --env "MSSQL_SA_PASSWORD=$AZURE_SQL_PASSWORD" \
    -p 1401:1433 \
    -d microsoft/mssql-server-linux:2017-latest

# really this should be a dockerfile as with all db config \_(* *)_//
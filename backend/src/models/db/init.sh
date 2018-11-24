#!/bin/bash -e
# Script that controls db init
# Expected to be run with cwd == src/models/db

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <database> <stage>"
fi

database=$1
stage=$2
PWD=`pwd`

echo "executing in $PWD";

if [ "$stage" == "init" ]; then
    rm -f "$database";
    sqlite3 "$database" < "$PWD/sql/tables.sql";
fi

sqlite3 "$database" < "$PWD/sql/test/$stage.sql";

#!/bin/bash -e
# Script that controls db init

if [ "$#" -ne 1 ]; then
    echo "Must specify initialisation stage"
fi

PWD=`pwd`;
echo "executing in $PWD";

if [ "$1" == "init" ]; then
    rm -f "$PWD/test.db";
    sqlite3 "$PWD/test.db" < "$PWD/sql/tables.sql";
    sqlite3 "$PWD/test.db" < "$PWD/sql/test/init.sql";
else
    sqlite3 "$PWD/test.db" < "$PWD/sql/test/$1.sql";
fi

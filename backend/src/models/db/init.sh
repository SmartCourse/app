#!/bin/bash -e
# Script that controls db init

PWD=`pwd`;
echo "executing in $PWD";

if [ -f "$PWD/test.db" ]; then
    rm "$PWD/test.db";
fi

sqlite3 "$PWD/test.db" < "$PWD/sql/tables.sql";
sqlite3 "$PWD/test.db" < "$PWD/sql/init.sql";
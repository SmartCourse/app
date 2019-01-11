const { PRODUCTION, TESTING } = require('../constants')

// really this should be able to differentiate staging from development and testing, but atm, can't
exports.DB_NAME = PRODUCTION ? 'smartcourse'
    : TESTING ? undefined : 'smartcourse-staging'

exports.MAX_CONNECTIONS = 100

exports.DB_CONFIG = {
    // admin creds used for test and development
    userName: TESTING ? 'sa' : process.env.AZURE_SQL_USER,
    password: process.env.AZURE_SQL_PASSWORD,
    server: TESTING ? 'localhost' : process.env.AZURE_SQL_SERVER,
    options:
        {
            database: exports.DB_NAME,
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true,
            encrypt: PRODUCTION,
            port: TESTING ? 1401 : 1433
        }
}

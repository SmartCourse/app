const { PRODUCTION, TESTING } = require('../constants')

exports.DB_NAME = PRODUCTION ? 'smartcourse'
    : TESTING ? 'smartcourse-testing' : 'smartcourse-staging'

exports.MAX_CONNECTIONS = 100

exports.DB_CONFIG = {
    userName: process.env.AZURE_SQL_USER,
    password: process.env.AZURE_SQL_PASSWORD,
    server: process.env.AZURE_SQL_SERVER,
    options:
        {
            database: exports.DB_NAME,
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true,
            encrypt: true
        }
}

const stdio = require('stdio');
const { STAGING, TESTING } = require('../../src/models/constants')
/*
 * Use cases:
 *  - TESTING and new database - add everything
 *  - TESTING and existing database - drop data and add test data
 *  - STAGING drop everything, add everything
 *  - PRODUCTION and we want to clean everything and just add admin users and FAQs
 *  - PRODUCTION and we want to add new tables and not touch anything else
 *
 * For TESTING, we have optimizations in the init() function for existing databases
 * For STAGING, there's only one thing we want by default, and it can be customized
 * For PRODUCTION, by default we just allow the creation of new tables.
 */

const DEFAULT_CONFIG = {
    TESTING: {
        drop: 'data',
        create: 'all',
        init: 'test'
    },
    STAGING: {
        drop: 'all',
        create: 'all',
        init: 'test'
    },
    PRODUCTION: {
        drop: 'none',
        create: 'all',
        init: 'none'
    }
}

const STDIO_OPTIONS = {
    'drop': {args: 1, description: 'Drop tables first - \'all\', \'data\' or \'none\'. \'data\' includes users, reviews, questions, comments, likes, reports etc..'},
    'create': {args: 1, description: 'Create tables after dropping - \'all\' or \'none\'.'},
    'init': {args: 1, description: 'Initialise tables after creation - \'test\', \'basic\', \'static\', \'none\'. \'static\' includes university data. \'basic\' is \'static\' plus admin users and FAQs. \'test\' is \'basic\' plus test reviews, comments etc..'}
}

const VALID_OPTIONS = {
    drop: ['all', 'data', 'none'],
    create: ['all', 'none'],
    init: ['test', 'basic', 'static', 'none']
}

exports.getConfig = function() {
    const opts = stdio.getopt(STDIO_OPTIONS)

    // validation - get a list of invalid arguments to options
    const invalid = Object.entries(VALID_OPTIONS)
        // go through all given options
        .reduce((acc, [validName, validChoices]) => {
            // if the opt name doesn't exist, skip
            if (!opts[validName]) return acc

            // find a choice which matches the option given
            if (validChoices.find(validVal => validVal === opts[validName])) return acc

            // otherwise, it's invalid!
            acc.push(validName)
            return acc
        }, [])

    if (invalid.length) {
        console.warn(`Invalid argument value for these options: ${invalid}`)
        process.exit(1)
    }

    // default to most conservative config
    const default_config = TESTING ? DEFAULT_CONFIG.TESTING : (STAGING ? DEFAULT_CONFIG.STAGING : DEFAULT_CONFIG.PRODUCTION)
    // override defaults with specific options
    return Object.entries(default_config)
        .reduce((acc, [optName, optDefault]) => {
            acc[optName] = opts[optName] ? opts[optName] : optDefault
            return acc
        }, {})
}

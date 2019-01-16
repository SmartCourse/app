const START_YEAR = 2005
const NUM_YEARS_TO_STORE = 20 // ie 2005-2025
const TRIMESTER_START = 2019

const PRE_TRIMESTERS = [
    { longName: 'Summer', shortName: 'X' },
    { longName: 'Semester 1', shortName: 'S1' },
    { longName: 'Semester 2', shortName: 'S2' }
]

const TRIMESTERS = [
    { longName: 'Summer', shortName: 'X' },
    { longName: 'Term 1', shortName: 'T1' },
    { longName: 'Term 2', shortName: 'T2' },
    { longName: 'Term 3', shortName: 'T3' }
]

const YEARS = Array(NUM_YEARS_TO_STORE)
    .fill(null)
    .map((_, i) => i + START_YEAR)

function makeSemesterEntry(year) {
    return function ({ longName, shortName }) {
        return {
            year,
            longName: `${longName} ${year}`,
            shortName: `${String(year).slice(2)}${shortName}`
        }
    }
}

// flatMap the arrays
module.exports = [].concat(...YEARS
    .map(year =>
        year < TRIMESTER_START
            ? PRE_TRIMESTERS
                .map(makeSemesterEntry(year))
            : TRIMESTERS
                .map(makeSemesterEntry(year))
    )
)

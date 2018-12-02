const { TYPES } = require('tedious')

// User Constants
exports.ANONYMOUS = 0

// Review Constants
exports.DONT_RECOMMEND = 0
exports.RECOMMEND = 1
exports.MIN_ENJOY = 1
exports.MAX_ENJOY = 5
exports.MIN_OPTION = 0
exports.MAX_OPTION = 3

// Paging Constants
exports.PAGE_SIZE = 10

// Table Names
exports.TABLE_NAMES = {
    USERS: 'users',
    LIKES: 'likes',
    COURSES: 'courses',
    SUBJECTS: 'subjects',
    DEGREES: 'degrees',
    FACULTIES: 'faculties',
    UNIVERSITY: 'university',
    COMMENTS: 'comments',
    REVIEWS: 'reviews',
    QUESTIONS: 'questions'
}

// Table Columns
exports.TABLE_COLUMNS = {
    [exports.TABLE_NAMES.UNIVERSITY]: {
        name: {
            type: TYPES.VarChar,
            options: { nullable: false }
        }
    },
    [exports.TABLE_NAMES.FACULTIES]: {
        name: {
            type: TYPES.VarChar,
            options: { nullable: false }
        }
    },
    [exports.TABLE_NAMES.DEGREES]: {
        name: {
            type: TYPES.VarChar,
            options: { nullable: false }
        },
        longName: {
            type: TYPES.VarChar,
            options: { nullable: false }
        },
        type: {
            type: TYPES.VarChar,
            options: { nullable: false }
        },
        tags: {
            type: TYPES.VarChar,
            options: { nullable: true }
        },
        facultyID: {
            type: TYPES.Int,
            options: { nullable: false }
        }
    },
    [exports.TABLE_NAMES.SUBJECTS]: {
        code: {
            type: TYPES.VarChar,
            options: { nullable: false }
        },
        name: {
            type: TYPES.VarChar,
            options: { nullable: false }
        },
        handbookURL: {
            type: TYPES.VarChar,
            options: { nullable: false }
        },
        universityID: {
            type: TYPES.Int,
            options: { nullable: false }
        }
    },
    [exports.TABLE_NAMES.COURSES]: {
        code: {
            type: TYPES.VarChar,
            options: { nullable: false }
        },
        universityID: {
            type: TYPES.Int,
            options: { nullable: false }
        },
        name: {
            type: TYPES.VarChar,
            options: { nullable: false }
        },
        studyLevel: {
            type: TYPES.VarChar,
            options: { nullable: false }
        },
        subjectID: {
            type: TYPES.Int,
            options: { nullable: false }
        },
        handbookURL: {
            type: TYPES.VarChar,
            options: { nullable: false }
        },
        outlineURL: {
            type: TYPES.VarChar,
            options: { nullable: true }
        },
        description: {
            type: TYPES.VarChar,
            options: { nullable: true }
        },
        requirements: {
            type: TYPES.VarChar,
            options: { nullable: true }
        },
        recommend: {
            type: TYPES.Int,
            options: { nullable: true }
        },
        enjoy: {
            type: TYPES.Int,
            options: { nullable: true }
        },
        difficulty: {
            type: TYPES.Int,
            options: { nullable: true }
        },
        teaching: {
            type: TYPES.Int,
            options: { nullable: true }
        },
        workload: {
            type: TYPES.Int,
            options: { nullable: true }
        },
        tags: {
            type: TYPES.VarChar,
            options: { nullable: true }
        }
    }
}

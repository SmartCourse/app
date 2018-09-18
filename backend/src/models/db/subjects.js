const data = require('../../../data/course_data_2019.json')
const { toLowerCase, decodeutf8 } = require('../../utils/helpers')

module.exports = (() => {
        let subjects = []
        data.forEach(function(subj) {
            subjects.push({
                code: decodeutf8(subj.code),
                name: decodeutf8(subj.name),
                handbookURL: decodeutf8(subj.url)
            })
        })
        return subjects
    })()

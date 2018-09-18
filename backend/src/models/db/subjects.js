const data = require('../../../data/course_data_2019.json')
const { toLowerCase, decodeutf8Text } = require('../../utils/helpers')

module.exports = (() => {
        let subjects = []
        data.forEach(function(subj) {
            subjects.push({
                code: subj.code,
                name: decodeutf8Text(subj.name),
                handbookURL: subj.url
            })
        })
        return subjects
    })()

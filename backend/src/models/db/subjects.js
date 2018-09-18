const data = require('../../../data/course_data_2019.json')
const { toLowerCase } = require('../../utils/helpers')

module.exports = (() => {
        let subjects = []
        data.forEach(function(subj) {
            subjects.push({
                code: subj.code,
                name: subj.name,
                handbookURL: subj.url
            })
        })
        return subjects
    })()

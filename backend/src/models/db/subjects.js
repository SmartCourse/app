const data = require('../../../data/course_data_2019.json')
const { toLowerCase, decodeUTF8Text } = require('../../utils/helpers')

module.exports = data.map((subj) => {
            return {
                code: subj.code,
                name: decodeUTF8Text(subj.name),
                handbookURL: subj.url
            }
        })

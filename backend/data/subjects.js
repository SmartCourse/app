const subjects = require('./course_data_2019.json')
const { decodeUTF8Text } = require('../src/utils/helpers')

module.exports = subjects.map(({ name, code, url }) => ({
    code,
    name: decodeUTF8Text(name),
    handbookURL: url,
    universityID: 1
}))

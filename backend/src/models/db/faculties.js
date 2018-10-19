const data = require('../../../data/faculties.js')

module.exports = data.map(({ node: { title:name } }) => name)

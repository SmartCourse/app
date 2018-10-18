const data = require('../../../data/degrees.js')
const faculties = require('./faculties.js')

module.exports = data.map(({ node: { title:name, degreeType:type, faculty: { title: facultyTitle }, metadata: { searchKeywords:tags }, overview: { overviewBody: description } } }) =>
  ({
    name,
    faculty: facultyTitle,
    tags,
    description,
    type
  })
).filter(({ faculty }) => faculties.includes(faculty))

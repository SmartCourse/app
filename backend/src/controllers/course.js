const express = require('express')
const course = express.Router({mergeParams: true})

const questionRouter = require('./question')
const reviewRouter = require('./review')

course.use('/question', questionRouter)
course.use('/review', reviewRouter)

/* Get the course data for a specific course id */
course.get('/', function(req, res) {

    cid = req.params.cid;

    res.send('<h1>Course Data</h1>')
})

/* Get page (N) questions for a course */
course.get('/questions', function(req, res) {

  cid = req.params.cid;
  page_id = req.query.p;

  res.send('<h1>Page Questsions</h1>')
})

/* Get page (N) reviews for a course */
course.get('/reviews', function(req, res) {

  cid = req.params.cid;
  page_id = req.query.p;

  res.send('<h1>Page Reviews</h1>')
})

module.exports = course
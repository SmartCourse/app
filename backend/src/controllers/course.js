const express = require('express')
const router = express.Router({mergeParams: true})

const questionRouter = require('./question')
const reviewRouter = require('./review')

router.use('/question', questionRouter)
router.use('/review', reviewRouter)

/* Get the course data for a specific course id */
router.get('/', function(req, res) {

    //let cid = req.params.cid;

    res.send('<h1>Course Data</h1>')
})

/* Get page (N) questions for a course */
router.get('/questions', function(req, res) {

  //let cid = req.params.cid;
  //let page_id = req.query.p;

  res.send('<h1>Page Questsions</h1>')
})

/* Get page (N) reviews for a course */
router.get('/reviews', function(req, res) {

  //let cid = req.params.cid;
  //let page_id = req.query.p;

  res.send('<h1>Page Reviews</h1>')
})

module.exports = router
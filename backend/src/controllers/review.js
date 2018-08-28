const express = require('express')
const router = express.Router({mergeParams: true})

/* Get the review data for a specific review id */
router.get('/:id', function(req, res) {

    rid = req.params.id;

    res.send('<h1>Review Data</h1>')
})
  
/* Get page (N) answers for a question */
router.get('/:id/replies', function(req, res) {

    rid = req.params.id;
    page_id = req.query.p;

    res.send('<h1>Review Page</h1>')
})

module.exports = router
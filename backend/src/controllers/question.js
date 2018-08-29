const express = require('express')
const router = express.Router({ mergeParams: true })

/* Get the question data for a specific question id */
router.get('/:id', function (req, res) {
    // let qid = req.params.id;

    res.send('<h1>Question data ' + req.params.cid + '</h1>')
})

/* Get page (N) answers for a question */
router.get('/:id/answers', function (req, res) {
    // let qid = req.params.id;
    // let page_id = req.query.p;

    res.send('<h1>Question Pages</h1>')
})

module.exports = router

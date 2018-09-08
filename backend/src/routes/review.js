const express = require('express')
const router = express.Router()

/* Get the review data for a specific review id */
router.get('/:id', function (req, res) {
    // let rid = req.params.id;

    res.json({
        reviewID: 1,
        courseID: 1,
        userID: 1,
        title: 'Best course I\'ve ever done!',
        body: 'This course was great WOWOW',
        timestamp: '2018-09-06 08:14:10',
        likes: 10
    })
})

/* Get page (N) answers for a question */
router.get('/:id/replies', function (req, res) {
    // let rid = req.params.id;
    // let page_id = req.query.p;

    res.json({ data: '<h1>Review Page</h1>' })
})

module.exports = router

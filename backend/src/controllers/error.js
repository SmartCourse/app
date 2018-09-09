/* Basic error handler to remove redundant code */
module.exports = function(res) {
    return error =>
        res.status(400).json({ code: 400, message: error.message })
}

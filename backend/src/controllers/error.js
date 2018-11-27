/* Basic error handler to remove redundant code */
module.exports = function(res) {
    return error => {
        console.warn(error.message)
        return res.status(400).json({ code: 400, message: error.message })
    }
}

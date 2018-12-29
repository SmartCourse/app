
exports.errorHandler = function(err, req, res, next) {
    console.error(err)
    res.status(err.status).json({ message: err.message, code:err.code })
}

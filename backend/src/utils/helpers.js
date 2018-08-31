
exports.setData = (responseObject) =>
    (data) => {
        responseObject.locals.data = data
    }

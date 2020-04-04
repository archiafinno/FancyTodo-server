const models = require('../models')

const authorization = (req, res, next) => {
    return models.Todo.findOne({ where: { id: req.params.id } })
        .then(result => {
            if (result) {
                if (result.UserId == req.loggedUserId) {
                    return next()
                } else {
                    console.log(`user unauthorized`)
                    return next({
                        name: `Unauthorized`,
                        errors: [{ message: `User unauthorized` }]
                    })
                }
            } else {
                console.log(result)
                return next({
                    name: `NotFound`,
                    errors: [{ message: `Data not found` }]
                })
            }
        })
        .catch(err => {
            if (err.name !== `InternalServerError`) {
                return next(err)
            } else {
                return next({
                    name: `InternalServerError`,
                    errors: [{ message: `InternalServerError` }]
                })
            }
        })
}

module.exports = authorization
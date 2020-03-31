const models = require('../models')

const authorization = (req, res, next) => {
    models.Todo.findOne({where: {id: req.params.id}})
    .then(result => {
        if(result) {
            if (result.UserId == req.loggedUserId) {
                next()
            } else {
                console.log(`user unauthorized`)
                return next({
                    name: `Unauthorized`,
                    errors: [{message: `User unauthorized` }]
                })
            }
        } else {
            console.log(result)
            return next({
                name: `NotFound`,
                errors: [{message: `Data not found` }]
            })
        }
    })
    .catch(err => {
        return next({
            name: `InternalServerError`,
            errors: [{message: `InternalServerError` }]
        })
    })
}

module.exports = authorization
const models = require('../models')

class TodoController {
    static findAll(req, res) {
        models.Todo.findAll({order: [['id', 'ASC']], where: {UserId: req.loggedUserId}})
        .then(result => {
            res.status(200).json({
                Todos: result
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static create(req, res) {
        models.Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedUserId
        })
        .then(result => {
            res.status(201).json({
                message: `successfully added new todo to todos list`,
                Todo: result
            })
        })
        .catch(err => {
            console.log(err)
            return next(err)
        })
    }

    static update(req, res) {
        let param = req.params.id
        models.Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }, {where: {id: param} })
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: `successfully updated a todo in todos list`,
                Todo: result
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static delete(req, res) {
        let param = req.params.id
        models.Todo.destroy({where: {id: param}})
        .then(result => {
            res.status(200).json({   
                message: `successfully deleted a todo from todos list`,
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static find(req, res) {
        let param = req.params.id
        models.Todo.findByPk(param)
        .then(result => {
            res.status(201).json({
                Todo: result
            })
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = TodoController
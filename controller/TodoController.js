const models = require('../models')

class TodoController {
    static findAll(req, res) {
        models.Todo.findAll({order: [['id', 'ASC']]})
        .then(result => {
            res.status(200).json({
                Todos: result
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static create(req, res) {
        models.Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        })
        .then(result => {
            res.status(201).json({
                message: `successfully added new todo to todos list`,
                Todo: result
            })
        })
        .catch(err => {
            if(err.name == 'SequelizeValidationError') {
                res.status(400).json({msg: err.errors[0].message})
            } else {
                res.status(500).json(err)
            }
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
            if (result[0] !== 0) {
                res.status(201).json({
                    message: `successfully updated a todo in todos list`,
                    Todo: result
                })
            } else {
                res.status(404).json({
                    msg: `data not found`,
                })
            }

        })
        .catch(err => {
            if(err.name == 'SequelizeValidationError') {
                res.status(400).json({msg: err.errors[0].message})
            } else {
                res.status(500).json(err)
            }
        })
    }

    static delete(req, res) {
        let param = req.params.id
        let data;
        models.Todo.findByPk(param)
        .then(result => {
            // console.log(`result findByPK`)
            // console.log(result)
            data = result
            return models.Todo.destroy({where: {id: param}})
        })
        .then(result => {
            // console.log(`result destroy`)
            // console.log(result)
            if (result) {
                res.status(201).json({   
                    message: `successfully deleted a todo from todos list`,
                    Todo: data
                })
            } else {
                res.status(404).json({
                    msg: `data not found` 
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static find(req, res) {
        let param = req.params.id
        models.Todo.findByPk(param)
        .then(result => {
            if (result) {
                res.status(201).json({
                    Todo: result
                })
            } else {
                res.status(404).json({
                    msg: `not found`
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController
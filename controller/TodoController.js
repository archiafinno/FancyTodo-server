const models = require('../models')
const axios = require('axios')

class TodoController {
    static findAll(req, res, next) {
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

    static create(req, res, next) {
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
            // console.log(err)
            return next(err)
        })
    }

    static update(req, res, next) {
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

    static delete(req, res, next) {
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

    static find(req, res, next) {
        let param = req.params.id
        let movie;
        let todo;
        models.Todo.findByPk(param)
        .then(result => {
            movie = result.description
            todo = result
            console.log(movie)
            console.log(process.env.apikey)
            return axios.get(`http://www.omdbapi.com/?apikey=${process.env.apikey}&s=${movie}`)
        })
        .then(result => {
            console.log(result.data)
            res.status(200).json({
                Todo: todo,
                Movie_Description: result.data.Search[0]
            })
        })
        .catch(err => {
            return next(err)
        })
    }

}

module.exports = TodoController
const models = require('../models')
const axios = require('axios')

class TodoController {
    static findAll(req, res, next) {
        console.log(`masuk ke findALl`)
        console.log(req.loggedUserId)
        return models.Todo.findAll({
                order: [
                    ['id', 'ASC']
                ],
                where: { UserId: req.loggedUserId }
            })
            .then(result => {
                return res.status(200).json({
                    Todos: result
                })
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

    static create(req, res, next) {
        console.log(`=======================`)
        console.log(`masuk ke create`)
        return axios.get(`http://www.omdbapi.com/?apikey=${process.env.apikey}&s=${req.body.title}`)
            .then(result => {
                console.log(result.data.Response)
                if (result.data.Response == "False") {
                    return next({
                        name: `BadRequest`,
                        errors: [{ message: `there is no movie with this name` }]
                    })
                } else {
                    return models.Todo.create({
                        title: req.body.title,
                        description: req.body.description,
                        status: req.body.status,
                        due_date: req.body.due_date,
                        UserId: req.loggedUserId
                    })
                }
            })
            .then(result => {
                return res.status(201).json({
                    message: `successfully added new todo to todos list`,
                    Todo: result
                })
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

    static update(req, res, next) {
        console.log(`masuk ke update`)
        let param = req.params.id
        return axios.get(`http://www.omdbapi.com/?apikey=${process.env.apikey}&s=${req.body.title}`)
            .then(result => {
                console.log(result.data.Response)
                if (result.data.Response == "False") {
                    return next({
                        name: `BadRequest`,
                        errors: [{ message: `there is no movie with this name` }]
                    })
                } else {
                    return models.Todo.update({
                        title: req.body.title,
                        description: req.body.description,
                        status: req.body.status,
                        due_date: req.body.due_date,
                    }, { where: { id: param } })
                }
            })
            .then(result => {
                console.log(result)
                return res.status(201).json({
                    message: `successfully updated a todo in todos list`,
                    Todo: result
                })
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

    static delete(req, res, next) {
        let param = req.params.id
        return models.Todo.destroy({ where: { id: param } })
            .then(result => {
                return res.status(200).json({
                    message: `successfully deleted a todo from todos list`,
                })
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

    static find(req, res, next) {
        let param = req.params.id
        let movie;
        let todo;
        return models.Todo.findByPk(param)
            .then(result => {
                movie = result.title
                todo = result
                console.log(movie)
                console.log(process.env.apikey)
                return axios.get(`http://www.omdbapi.com/?apikey=${process.env.apikey}&s=${movie}`)
            })
            .then(result => {
                console.log(result.data)
                return res.status(200).json({
                    Todo: todo,
                    Movie_Description: result.data.Search[0]
                })
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

    static updateOne(req, res, next) {
        console.log('masuk update')
        const { id, status } = req.body
        console.log(id, status)
        return models.Todo.update({ status: status }, { where: { id: id } })
            .then(updateData => {
                return res.status(201).json(updateData)
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

}

module.exports = TodoController

// let i = 0;
// let count = setInterval(function() {
//     if (i < result.length) {
//         let data = getMovieByTitle(result[i].dataValues.title)
//             .then(response => {
//                 result[i].dataValues.Movie_Description = response
//                 console.log(`ini result title:`, result[i].dataValues.title)
//                 console.log(`ini Moviedesc:`, result[i].dataValues.Movie_Description)
//                 console.log(`ini result[i]:`, result[i].dataValues)
//                 console.log(`==== done ====`)
//                 arr.push(result[i])
//             })
//         i++
//     } else {
//         clearInterval(count)
//         console.log(`aaaaaaa`)
//         return res.status(200).json({
//             Todos: arr
//         })
//     }
// }, 3000);
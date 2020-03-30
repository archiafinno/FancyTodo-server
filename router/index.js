const router = require('express').Router()
const todos = require('./TodoRouter.js')
const users = require('./UserRouter.js')

router.use('/todos', todos)
router.use('/users', users)

module.exports = router

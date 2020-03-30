const router = require('express').Router()
const TodoController = require('../controller/TodoController.js')

router.get('/', TodoController.findAll)
router.post('/', TodoController.create)
router.get('/:id', TodoController.find)
router.put('/:id', TodoController.update)
router.delete('/:id', TodoController.delete)

module.exports = router
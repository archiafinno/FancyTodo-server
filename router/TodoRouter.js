const router = require('express').Router()
const TodoController = require('../controller/TodoController.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

router.use(authentication)
router.get('/', TodoController.findAll)
router.post('/', TodoController.create)

router.get('/:id', authorization, TodoController.find)
router.put('/:id', authorization, TodoController.update)
router.delete('/:id', authorization, TodoController.delete)

module.exports = router
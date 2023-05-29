const express = require("express")
const router = express.Router()

const userController = require("../../app/controllers/UserController")

router.get('/edit', userController.edit)
router.get('/', userController.user)
router.post('/edit', userController.postEdit)

module.exports = router
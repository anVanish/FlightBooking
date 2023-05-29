const express = require("express")
const router = express.Router()

const userController = require("../../app/controllers/UserController")

router.get('/', userController.user)
router.get('/edit', userController.edit)

module.exports = router
const express = require("express")
const router = express.Router()

const generalController = require("../../app/controllers/GeneralController")

router.post('/', generalController.seat)

module.exports = router
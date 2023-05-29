const express = require("express")
const router = express.Router()

const generalController = require("../../app/controllers/GeneralController")

router.get('/', generalController.about)

module.exports = router
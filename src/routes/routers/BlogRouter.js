const express = require("express")
const router = express.Router()

const generalController = require("../../app/controllers/GeneralController")

router.get('/:id', generalController.detail)
router.get('/', generalController.blog)

module.exports = router
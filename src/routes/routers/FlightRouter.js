const express = require("express")
const router = express.Router()

const flightController = require("../../app/controllers/FlightController")

router.post('/book', flightController.book)
router.post('/check', flightController.check)
router.post('/', flightController.search)

module.exports = router
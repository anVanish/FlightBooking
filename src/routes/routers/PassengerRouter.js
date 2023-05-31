const express = require("express")
const router = express.Router()

const passengerController = require("../../app/controllers/PassengerController")

router.post('/check', passengerController.check)
router.post('/', passengerController.show)

module.exports = router
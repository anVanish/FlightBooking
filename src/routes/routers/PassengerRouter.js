const express = require("express");
const router = express.Router();
const { authToken } = require("../../middlewares/authentication");

const passengerController = require("../../app/controllers/PassengerController");

router.post("/check", passengerController.check);
router.post("/save", authToken, passengerController.save);
router.post("/", authToken, passengerController.show);

module.exports = router;

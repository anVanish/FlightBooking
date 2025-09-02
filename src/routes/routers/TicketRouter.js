const express = require("express");
const router = express.Router();

const ticketController = require("../../app/controllers/TicketController");
const { authToken } = require("../../middlewares/authentication");

router.get("/checkout", authToken, ticketController.checkout);
router.post("/book", authToken, ticketController.book);

module.exports = router;

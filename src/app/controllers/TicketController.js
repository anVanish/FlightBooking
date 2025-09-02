const Flights = require("../models/FlightModel");
const Passengers = require("../models/PassengerModel");
const Tickets = require("../models/TicketModel");

class TicketController {
    //POST ticket/book
    async book(req, res, next) {
        try {
            const { flight, passengers, members } = req.session;
            const userId = req.session.user._id;
            const totalPrice = flight.price * members;

            const ticket = new Tickets({
                userId,
                flightId: flight._id,
                members,
                passengers,
                totalPrice,
            });
            await ticket.save();
            res.send("Thành công");
        } catch (err) {
            next(err);
        }
    }

    //GET ticket/checkout
    async checkout(req, res, next) {
        try {
            const { flight, members } = req.session;
            const total = flight.price * members;
            res.render("checkout", { flight, members, total });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new TicketController();

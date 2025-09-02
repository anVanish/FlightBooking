const Flights = require("../models/FlightModel");
const Passengers = require("../models/PassengerModel");

class PassengerController {
    //POST /passenger/check
    check(req, res, next) {
        if (!req.session.user)
            throw new Error("Vui lòng đăng nhập để tiếp tục");
        res.send("Hợp lệ");
    }

    //POST /passenger
    async show(req, res, next) {
        try {
            var { members } = req.session;
            let { flightId } = req.body;

            if (!members) return res.redirect("home");
            var memberArr = [];
            for (var i = 0; i < members; i++) memberArr.push(0);

            let flight = await Flights.findOne({ _id: flightId })
                .populate("from")
                .populate("to");
            const total = flight.price * members;

            req.session.flight = flight.toObject();

            res.render("passengers", {
                flight: flight.toObject(),
                members,
                memberArr,
                total,
            });
        } catch (err) {
            next(err);
        }
    }

    //POST /save
    async save(req, res, next) {
        try {
            const { members } = req.session;
            const reqBody = req.body;
            const passengers = [];
            if (members === 1) {
                let existPassenger = await Passengers.findOne({
                    identification: req.body.identification,
                });
                if (existPassenger) passengers.push(existPassenger);
                else {
                    let passenger = new Passengers(req.body);
                    await passenger.save();
                    passengers.push(passenger);
                }
            } else {
                for (let i = 0; i < members; i++) {
                    let passenger = {};
                    Object.keys(reqBody).forEach((key) => {
                        passenger[key] = reqBody[key][i];
                    });
                    let existPassenger = await Passengers.findOne({
                        identification: passenger.identification,
                    });

                    if (existPassenger) passengers.push(existPassenger);
                    else {
                        passenger = new Passengers(passenger);
                        await passenger.save();
                        passengers.push(passenger);
                    }
                }
            }

            req.session.passengers = passengers;
            res.send("success");
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new PassengerController();

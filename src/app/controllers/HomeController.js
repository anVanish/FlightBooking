const Airports = require("../models/AirportModel");

class HomeController {
    //GET / | /home
    async index(res, req, next) {
        const airports = await Airports.find({});
        const popularDestinations = [];
        popularDestinations.push({
            i: 1,
            from: airports[3].toObject(),
            to: airports[4].toObject(),
        });
        popularDestinations.push({
            i: 2,
            from: airports[4].toObject(),
            to: airports[0].toObject(),
        });
        popularDestinations.push({
            i: 3,
            from: airports[1].toObject(),
            to: airports[3].toObject(),
        });

        req.render("home", {
            airports: airports.map((a) => a.toObject()),
            popularDestinations,
        });
    }
}

module.exports = new HomeController();

const Flight = require("../models/FlightModel");

class PassengerController {
    //POST /passenger/check
    check(req, res, next) {}

    //POST /passenger
    show(req, res, next) {
        if (!req.cookies.user) {
            res.redirect("login");
            return;
        }

        var members = req.session.members || -1;
        if (members == -1) {
            res.redirect("home");
            return;
        }
        var memberArr = [];
        for (var i = 0; i < members; i++) memberArr.push(0);
        var flight_id = req.body.flight_id;
        // FlightRepo.findById(flight_id)
        //     .then(([[result]]) =>{
        //         Promise.all([GeneralRepo.findPlaceById(result.place_from_id),GeneralRepo.findPlaceById(result.place_to_id)])
        //             .then((result1) => {
        //                 var place_from = result1[0][0][0]
        //                 var place_to = result1[1][0][0]
        //                 var flight = new Flight({...result, place_from, place_to})
        //                 var total = members * flight.price
        //                 //save to session
        //                 req.session.flight = flight
        //                 req.session.total = total

        //                 res.render('passengers', {
        //                     flight,
        //                     memberArr,
        //                     members,
        //                     total
        //                 })
        //             })

        //     })
    }
}

module.exports = new PassengerController();

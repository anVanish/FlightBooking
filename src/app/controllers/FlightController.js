const GeneralRepo = require("../repository/GeneralRepository");
const FlightRepo = require("../repository/FligthRepository");
const Flight = require("../models/FlightModel");
const UserRepo = require("../repository/UserRepository");
const User = require("../models/UserModel");

class FlightController {
    //POST /fligth/check
    check(req, res, next) {
        var from = req.body.from;
        var to = req.body.to;
        var startDate = req.body.start;
        var returnDate = req.body.return;
        var members = req.body.members;
        var oneway = req.body.oneway || "off";
        var message = "";
        if (from === "Từ") message = "Vui lòng chọn điểm đi";
        else if (to === "Đến") message = "Vui lòng chọn điểm đến";
        else if (startDate === "") message = "Vui lòng chọn ngày khởi hành";
        else if (members === "") message = "Vui lòng chọn số lượng hành khách";
        else if (oneway !== "on" && returnDate === "")
            message = "Vui lòng chọn ngày về";
        else if (from === to) message = "Điểm đến và điểm đi không được trùng";
        else if (new Date(startDate) - 1 <= Date.now())
            message = "Ngày không hợp lệ";
        else if (new Date(startDate) > new Date(returnDate))
            message = "Ngày về phải sau ngày khởi hành";

        res.send(message);
    }

    //POST /flight
    search(req, res, next) {
        var from = req.body.from;
        var to = req.body.to;
        var startDate = req.body.start;
        startDate = startDate.split("/");
        var formattedDate =
            startDate[2] + "-" + startDate[0] + "-" + startDate[1];
        var returnDate = req.body.return;
        var members = req.body.members;
        var oneway = req.body.oneway || "off";

        req.session.members = members;

        // Promise.all([GeneralRepo.findPlaceByCode(from), GeneralRepo.findPlaceByCode(to)])
        //     .then((result) => {
        //         var place_from = result[0][0][0]
        //         var place_to = result[1][0][0]
        //         FlightRepo.findFlight(place_from.place_id, place_to.place_id, formattedDate)
        //             .then(([result]) =>{
        //                 if (result.length == 0){
        //                     res.render('flight', {
        //                         notFound: true
        //                     })
        //                     return
        //                 }
        //                 var flights = result.map(function(flight){
        //                     return new Flight({...flight, place_from, place_to})
        //                 })
        //                 res.render('flight', {
        //                     flights
        //                 })
        //             })
        //     })
    }

    //POST /flight/booking
    book(req, res, next) {
        var members = req.session.members || -1;
        if (members == -1) {
            res.redirect("../home");
            return;
        }
        var flight = req.session.flight;
        var total = req.session.total;
        var passengers = req.session.passengers;
        var seatIds = req.session.seatIds;

        // transaction
        // save passengers
        // save passenger_booking
        // passengers.forEach((item) => {
        //     UserRepo.saveUser(new User(item));
        //     UserRepo.getNewUser().then(([[results]]) => {
        //         GeneralRepo.userBooking(results.user_id, flight.flight_id);
        //     });
        // });
        // //save seat booking
        // seatIds.forEach((item) => {
        //     GeneralRepo.seatBooking(item, flight.flight_id);
        // });
        //save ticket
        const bookAt = new Date();
        const formattedDate = bookAt.toISOString().slice(0, 10);
        let code = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;

        for (let i = 0; i < 10; i++) {
            code += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }

        // GeneralRepo.ticketBooking(
        //     req.cookies.user.user_id,
        //     flight.flight_id,
        //     total,
        //     members,
        //     formattedDate,
        //     code
        // );
        res.redirect("../user");
    }
}

module.exports = new FlightController();

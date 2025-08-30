const Flights = require("../models/FlightModel");
const Users = require("../models/UserModel");

class FlightController {
    //POST /flight/check
    check(req, res, next) {
        let { from, to, startDate, returnDate, members, oneWay } = req.body;

        if (!from) throw new Error("Vui lòng chọn điểm đi");
        else if (!to) throw new Error("Vui lòng chọn điểm đến");
        else if (!startDate) throw new Error("Vui lòng chọn ngày khởi hành");
        else if (!members || members <= 0)
            throw new Error("Số lượng hành khách không hợp lệ");
        else if (!oneWay && !returnDate)
            throw new Error("Vui lòng chọn ngày về");
        else if (from === to)
            throw new Error("Điểm đến và điểm đi không được trùng");
        else if (new Date(startDate) - 1 <= Date.now())
            throw new Error("Ngày không hợp lệ");
        else if (new Date(startDate) > new Date(returnDate))
            throw new Error("Ngày về phải sau ngày khởi hành");

        res.send("Thanh cong");
    }

    //POST /flight
    async search(req, res, next) {
        let { from, to, startDate, returnDate, members, oneWay } = req.body;
        // startDate = startDate.split("/");
        // var formattedDate =
        //     startDate[2] + "-" + startDate[0] + "-" + startDate[1];
        req.session.members = members;

        const flights = await Flights.findFlightsByDate(from, to, startDate);
        if (!flights) return res.render("flight", { notFound: true });

        res.render("flight", { flights: flights.map((f) => f.toObject()) });

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

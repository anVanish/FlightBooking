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
        req.session.members = members;

        const flights = await Flights.findFlightsByDate(from, to, startDate);
        if (!flights || flights.length === 0)
            return res.render("flight", { notFound: true });

        if (!oneWay)
            req.session.return = {
                from: to,
                to: from,
                returnDate,
            };

        res.render("flight", { flights: flights.map((f) => f.toObject()) });
    }
}

module.exports = new FlightController();

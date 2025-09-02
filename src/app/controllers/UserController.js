const Users = require("../models/UserModel");
const Tickets = require("../models/TicketModel");
const Airports = require("../models/AirportModel");

class UserController {
    //GET /user
    async user(req, res, next) {
        let user = req.session.user;

        const tickets = await Tickets.find({ userId: user._id })
            .populate("passengers._id")
            .populate({
                path: "flightId",
                populate: [{ path: "from" }, { path: "to" }],
            });

        console.log(tickets);

        res.render("user", {
            user,
            tickets: tickets.map((t) => t.toObject()),
        });
    }

    //Get /user/edit
    edit(req, res, next) {
        var user = req.session.user;
        // const date = new Date(user.date_of_birth);
        // const formattedDate = date.toISOString().split("T")[0];
        // user.date_of_birth = formattedDate;

        res.render("editUser", {
            user,
        });
    }
    //POST /user/edit
    postEdit(req, res, next) {
        var user = new User(req.body);
        user.user_id = req.cookies.user.user_id;

        //Validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phone_regex = /^\d{10}$/;
        if (user.name === "") {
            res.send("Tên người dùng không thể để trống");
            return;
        } else if (user.email === "") {
            res.send("Email không thể để trống");
            return;
        } else if (!regex.test(user.email)) {
            res.send("Email không hợp lệ");
            return;
        } else if (
            !phone_regex.test(user.phone_number) &&
            user.phone_number !== ""
        ) {
            res.send("Số điện thoại không hợp lệ");
            return;
        } else if (
            new Date(user.date_of_birth) >=
            new Date(Date.now() - 12 * 365 * 24 * 60 * 60 * 1000)
        ) {
            res.send("Ngày sinh không hợp lệ! Độ tuổi phải lớn hơn 12");
            return;
        }

        //update
        // UserRepo.update(user)
        //     .then((result) => {
        //         res.clearCookie("user");
        //         res.cookie("user", user, {
        //             expires: new Date(Date.now() + 900000),
        //         });
        //         req.session.user = user;

        //         res.send("");
        //     })
        //     .catch((err) => {
        //         res.send("Cập nhật thất bại");
        //         console.log(err);
        //     });
    }
}

module.exports = new UserController();

const Users = require("../models/UserModel");
const Tickets = require("../models/TicketModel");

class UserController {
    //GET /user
    async user(req, res, next) {
        let user = req.session.user;

        const tickets = await Tickets.find({ userId: user._id })
            .populate("passengers._id")
            .populate({
                path: "flightId",
                populate: [{ path: "from" }, { path: "to" }],
            })
            .sort({ createdAt: -1 });

        res.render("user", {
            user,
            tickets: tickets.map((t) => t.toObject()),
        });
    }

    //Get /user/edit
    edit(req, res, next) {
        var user = req.session.user;

        res.render("editUser", {
            user,
        });
    }
    //POST /user/edit
    async postEdit(req, res, next) {
        try {
            const user = req.session.user;
            const { name, email, phone } = req.body;

            //Validation
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{10}$/;
            if (!name) throw new Error("Tên người dùng không thể để trống");
            if (!email) throw new Error("Email không thể để trống");
            if (!regex.test(email)) throw new Error("Email không hợp lệ");
            if (!phoneRegex.test(phone) && phone !== "")
                throw new Error("Số điện thoại không hợp lệ");

            const updatedUser = await Users.findOneAndUpdate(
                { _id: user._id },
                { name, email, phone },
                { new: true }
            );
            if (!updatedUser) throw new Error("Cập nhật thất bại");
            let safeUser = updatedUser.toObject();
            delete safeUser.password;

            req.session.user = safeUser;
            res.send("Cập nhật thành công");
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();

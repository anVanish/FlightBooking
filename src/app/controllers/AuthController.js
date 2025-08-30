const Users = require("../models/UserModel");
const bcrypt = require("bcryptjs");

class AuthController {
    //GET /login
    login(req, res, next) {
        if (!req.session.user) res.render("login", { session: res.session });
        else res.redirect("/home");
    }

    //POST /login
    async postLogin(req, res, next) {
        try {
            var email = req.body.email;
            var password = req.body.password;

            if (!email) {
                throw new Error("Vui lòng nhập email");
                // req.session.message = "Vui lòng nhập email";
                // return res.redirect("back");
            }
            if (!password) throw new Error("Vui lòng nhập password");

            const user = await Users.findOne({ email });
            if (!user) throw new Error("Email chưa tạo tài khoản");
            else {
                let sessionUser = user.toObject();
                delete sessionUser.password;
                req.session.user = sessionUser;
                res.send({ message: "Đăng nhập thành công" });
            }
        } catch (err) {
            next(err);
        }
    }

    //GET /login/logout
    logout(req, res, next) {
        delete req.session.user;
        res.clearCookie("user");
        res.redirect("/home");
    }

    //GET /register
    register(req, res, next) {
        res.render("register");
    }

    //POST /register
    async postRegister(req, res, next) {
        try {
            let { email, password, confirmPassword } = req.body;

            if (!email) throw new Error("Vui lòng nhập email");
            if (!password) throw new Error("Vui lòng nhập password");
            if (!confirmPassword) throw new Error("Vui lòng nhập lại password");
            if (password != confirmPassword)
                throw new Error("Mật khẩu không khớp");

            const user = await Users.findOne({ email });
            if (user) throw new Error("Tài khoản đã tồn tại");
            const salt = bcrypt.genSaltSync(10);
            await Users.insertOne({
                name: email.split("@")[0],
                email,
                password: bcrypt.hashSync(password, salt),
            });

            res.send("Đăng ký thành công");
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();

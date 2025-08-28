const UserRepo = require("../repository/UserRepository");
const User = require("../models/UserModel");

class AuthController {
    //GET /login
    login(req, res, next) {
        if (!req.session.user) res.render("login");
        else res.redirect("/home");
    }

    //POST /login
    postLogin(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        if (email === "") {
            res.send("Vui lòng nhập email");
            return;
        }
        if (password == "") {
            res.send("Vui lòng nhập password");
            return;
        }

        // UserRepo.findByEmail(email)
        //     .then(([loginUser]) => {
        //         if (loginUser.length == 0) {
        //             res.send("Email chưa đăng ký tài khoản");
        //             return;
        //         }
        //         var user = new User(loginUser[0]);
        //         if (user.password !== password) {
        //             res.send("Mật khẩu không đúng");
        //             return;
        //         }
        //         res.cookie("user", user, {
        //             expires: new Date(Date.now() + 900000),
        //         });
        //         req.session.user = user;
        //         res.send("");
        //     })
        //     .catch((err) => {
        //         res.send("Error");
        //     });
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
    postRegister(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        var confirmPassword = req.body.confirmPassword;

        if (email === "") {
            res.send("Vui lòng nhập email");
            return;
        }
        if (password === "") {
            res.send("Vui lòng nhập password");
            return;
        }
        if (confirmPassword === "") {
            res.send("Vui lòng nhập lại password");
            return;
        }
        if (password != confirmPassword) {
            res.send("Mật khẩu không khớp");
            return;
        }

        // UserRepo.findByEmail(email)
        // .then(([user]) => {
        //     if (user.length > 0){
        //         res.send("Email đã đăng ký tài khoản!")
        //         return
        //     }
        //     UserRepo.register(email, password)
        //     UserRepo.findByEmail(email)
        //         .then(([registerUser])=>{
        //             if (registerUser.length == 0){
        //                 res.send('Error')
        //                 return
        //             }
        //             var loginUser = new User(registerUser[0])
        //             req.session.user = loginUser
        //             res.cookie('user', loginUser, { expires: new Date(Date.now() + 900000) })
        //             res.send('')
        //         })
        // })
    }
}

module.exports = new AuthController();

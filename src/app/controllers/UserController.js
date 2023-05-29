const User = require('../models/UserModel')
const UserRepo = require('../repository/UserRepository')

class UserController{
    //GET /user
    user(req, res, next){
        if (!req.session.user && !req.cookies.user){
            res.redirect('/login')
            return
        }
        var name = req.cookies.user.user_name
        res.render('user', {
            name
        })
    }

    //Get /user/edit
    edit(req, res, next){
        if (!req.session.user && !req.cookies.user){
            res.redirect('../login')
        }
        var user = req.cookies.user
        const date = new Date(user.date_of_birth);
        const formattedDate = date.toISOString().split('T')[0];
        user.date_of_birth = formattedDate

        res.render('editUser', {
            user
        })
    }
    //POST /user/edit
    postEdit(req, res, next){
        var user = new User(req.body)
        user.user_id = req.cookies.user.user_id
        UserRepo.update(user)
            .then((result) =>{
                res.clearCookie('user')
                res.cookie('user', user, { expires: new Date(Date.now() + 900000) })
                req.session.user = user
                
                res.send('')
            })
            .catch(err =>{
                res.send("Cập nhật thất bại")
                console.log(err)
            })
    }
}

module.exports = new UserController()
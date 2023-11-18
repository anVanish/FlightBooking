const User = require('../models/UserModel')
const FlightRepo = require('../repository/FligthRepository')
const GeneralRepo = require('../repository/GeneralRepository')
const UserRepo = require('../repository/UserRepository')

class UserController{
    //GET /user
    user(req, res, next){
        if (!req.session.user && !req.cookies.user){
            res.redirect('/login')
            return
        }
        var name = req.cookies.user.user_name
        FlightRepo.findAllTicket(req.cookies.user.user_id)
            .then(([results]) =>{
                var tickets = results.map(item=>{
                    return {
                        ...item,
                        'bookAt': item.bookAt.toISOString().split('T')[0]
                    }
                })
                res.render('user', {
                    name,
                    tickets
                })
            })
        // res.render('user', {
        //     name
        // })
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
        
        //Validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phone_regex = /^\d{10}$/
        if (user.name === ''){res.send('Tên người dùng không thể để trống');  return}
        else if (user.email === ''){res.send('Email không thể để trống'); return}
        else if (!regex.test(user.email)){res.send('Email không hợp lệ'); return}
        else if (!phone_regex.test(user.phone_number) && user.phone_number !== '')
            {
                res.send('Số điện thoại không hợp lệ'); return
            }
        else if (new Date(user.date_of_birth) >= new Date(Date.now() - (12 * 365 * 24 * 60 * 60 * 1000)))
            {res.send('Ngày sinh không hợp lệ! Độ tuổi phải lớn hơn 12'); return}
        
        //update
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
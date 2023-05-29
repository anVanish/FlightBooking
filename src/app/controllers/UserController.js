

class UserController{

    //GET /user
    user(res, req, next){
        req.render('user')
    }

    //Get /user/edit
    edit(res, req, next){
        req.render('editUser')
    }
}

module.exports = new UserController()
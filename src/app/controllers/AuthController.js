

class AuthController{

    //GET /login
    login(res, req, next){
        req.render('login')
    }

    //GET /register
    register(res, req, next){
        req.render('register')
    }
}

module.exports = new AuthController()
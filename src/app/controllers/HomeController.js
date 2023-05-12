

class HomeController{

    //GET / | /home
    index(res, req, next){
        req.render('home')
    }
}

module.exports = new HomeController()
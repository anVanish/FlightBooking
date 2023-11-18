const GeneralRepo = require("../repository/GeneralRepository")


class HomeController{

    //GET / | /home
    index(res, req, next){
        GeneralRepo.findPopBlog()
            .then(([results]) =>{
                var pops = results.map(item =>{
                    return {
                        ...item,
                        'public_date': item.public_date.toISOString().split('T')[0]
                    }
                })
                req.render('home', {
                    pops
                })
            })
    }
}

module.exports = new HomeController()
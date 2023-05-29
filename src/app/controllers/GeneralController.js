
class GeneralController{

    //GET /about
    about(res, req, next){
        req.render('about')
    }

    //GET /blog
    blog(res, req, next){
        req.render('blog')
    }

    //GET /blog?id={:id}



}

module.exports = new GeneralController()
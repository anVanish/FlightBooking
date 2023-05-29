const GeneralRepo = require('../repository/GeneralRepository')

class GeneralController{

    //GET /about
    about(req, res, next){
        res.render('about')
    }

    //GET /blog
    blog(req, res, next){
        Promise.all([GeneralRepo.findAllBlog(), GeneralRepo.findPopBlog()])
            .then((results) => {
                var blogs = results[0][0]
                var pops = results[1][0]
                blogs = blogs.map(blog=>{
                    const date = new Date(blog.public_date)
                    const newDate = date.toISOString().split('T')[0]
                    return {...blog, public_date: newDate}
                })
                res.render('blog', {
                    blogs,
                    pops
                })
                
            })
    }

    //GET /blog/:id
    detail(req, res, next){
        var id = req.params.id
        GeneralRepo.readBlog(id)
        Promise.all([GeneralRepo.findBlogById(id), GeneralRepo.findPopBlog()])
            .then((results) =>{
                var blog = results[0][0][0]
                var pops = results[1][0]
                const newDate = blog.public_date.toISOString().split('T')[0]
                blog.public_date = newDate
                const contents = blog.content.split('\\n')
                try{
                    blog.first = contents[0]
                    blog.second = contents[1]
                    blog.third = contents[2]
                }catch(err){
                    
                }
                res.render('blogDetail', {
                    blog,
                    pops
                })
            })
        // GeneralRepo.findBlogById(id)
        //     .then(([[blog]]) => {
        //         const newDate = blog.public_date.toISOString().split('T')[0]
        //         blog.public_date = newDate
        //         const contents = blog.content.split('\\n')
        //         try{
        //             blog.first = contents[0]
        //             blog.second = contents[1]
        //             blog.third = contents[2]
        //         }catch(err){
                    
        //         }
        //         res.render('blogDetail', {
        //             blog
        //         })
        //     })
    }



}

module.exports = new GeneralController()
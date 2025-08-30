const Airports = require("../models/AirportModel");

class HomeController {
    //GET / | /home
    async index(res, req, next) {
        const airports = await Airports.find({});
        req.render("home", { airports: airports.map((a) => a.toObject()) });
        // GeneralRepo.findPopBlog()
        //     .then(([results]) =>{
        //         var pops = results.map(item =>{
        //             return {
        //                 ...item,
        //                 'public_date': item.public_date.toISOString().split('T')[0]
        //             }
        //         })
        //         req.render('home', {
        //             pops
        //         })
        //     })
    }
}

module.exports = new HomeController();

const User = require("../models/UserModel");

class GeneralController {
    //GET /about
    about(req, res, next) {
        res.render("about");
    }

    //GET /blog
    blog(req, res, next) {
        // Promise.all([GeneralRepo.findAllBlog(), GeneralRepo.findPopBlog()])
        //     .then((results) => {
        //         var blogs = results[0][0]
        //         var pops = results[1][0]
        //         blogs = blogs.map(blog=>{
        //             const date = new Date(blog.public_date)
        //             const newDate = date.toISOString().split('T')[0]
        //             return {...blog, public_date: newDate}
        //         })
        //         res.render('blog', {
        //             blogs,
        //             pops
        //         })
        //     })

        res.render("blog");
    }

    //GET /blog/:id
    detail(req, res, next) {
        var id = req.params.id;
        // GeneralRepo.readBlog(id);
        // Promise.all([
        //     GeneralRepo.findBlogById(id),
        //     GeneralRepo.findPopBlog(),
        // ]).then((results) => {
        //     var blog = results[0][0][0];
        //     var pops = results[1][0];
        //     const newDate = blog.public_date.toISOString().split("T")[0];
        //     blog.public_date = newDate;
        //     const contents = blog.content.split("\\n");
        //     try {
        //         blog.first = contents[0];
        //         blog.second = contents[1];
        //         blog.third = contents[2];
        //     } catch (err) {}
        //     res.render("blogDetail", {
        //         blog,
        //         pops,
        //     });
        // });
    }

    //POST /seat
    seat(req, res, next) {
        //     var members = req.session.members || -1;
        //     if (members == -1) {
        //         res.redirect("home");
        //         return;
        //     }
        //     var flight = req.session.flight;
        //     var passengers = [];
        // if (members == 1) {
        //     passengers.push(new User(req.body));
        // } else {
        //     var input = req.body;
        //     for (var i = 0; i < members; i++) {
        //         var passenger = {};
        //         Object.keys(input).forEach((key) => {
        //             passenger[key] = input[key][i];
        //         });
        //         passengers.push(new User(passenger));
        //     }
        // }
        //save passengers
        // req.session.passengers = passengers;
        // var total = req.session.total;
        // Promise.all([
        //     GeneralRepo.findAllSeat(),
        //     GeneralRepo.findBookingSeat(flight.flight_id),
        // ]).then((results) => {
        //     var seat_map = results[0][0];
        //     var seat_booked = results[1][0];
        //     seat_booked.forEach((item) => {
        //         var index = item.seat_id - 1;
        //         seat_map[index].status = true;
        //     });
        //     const maps = [];
        //     let index = 0;
        //     for (let i = 0; i < 9; i++) {
        //         const row = [];
        //         for (let j = 0; j < 4; j++) {
        //             row.push(seat_map[index]);
        //             index++;
        //         }
        //         maps.push(row);
        //     }
        //     res.render("seat", {
        //         flight,
        //         total,
        //         members,
        //         maps,
        //     });
        // });
    }
}

module.exports = new GeneralController();

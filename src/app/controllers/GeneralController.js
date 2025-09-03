const Users = require("../models/UserModel");
const Blogs = require("../models/BlogModel");

class GeneralController {
    //GET /about
    about(req, res, next) {
        res.render("about");
    }

    //GET /blog
    async blog(req, res, next) {
        const blogs = await Blogs.find({}).sort({ createdAt: -1 });
        const popBlogs = await Blogs.find({}).sort({ views: -1 }).limit(3);
        res.render("blog", {
            blogs: blogs.map((b) => b.toObject()),
            popBlogs: popBlogs.map((p) => p.toObject()),
        });
    }

    //GET /blog/:id
    async detail(req, res, next) {
        try {
            var _id = req.params.id;
            const blog = await Blogs.findOne({ _id });
            blog.content = blog.content.replaceAll("\n", "<br>");
            await Blogs.findOneAndUpdate({ _id }, { views: blog.views + 1 });
            const popBlogs = await Blogs.find({}).sort({ views: -1 }).limit(3);

            res.render("blogDetail", {
                blog: blog.toObject(),
                popBlogs: popBlogs.map((p) => p.toObject()),
            });
        } catch (err) {
            next(err);
        }
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

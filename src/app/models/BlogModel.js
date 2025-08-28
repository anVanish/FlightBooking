// const Blog = function(blog){
//     this.article_id = blog.article_id
//     this.header = blog.header
//     this.content = blog.content
//     this.public_date = blog.public_date
//     this.view = blog.view
//     this.image = blog.image
// }

// module.exports = Blog

const mongoose = require("mongoose");
const Blogs = new mongoose.Schema({
    header: { type: String, required: true },
    content: { type: String, required: true },
    publishDate: { type: Date, required: true },
    views: { type: Number, default: 0 },
    image: { type: String, required: true },
});

module.exports = mongoose.model("blogs", Blogs);

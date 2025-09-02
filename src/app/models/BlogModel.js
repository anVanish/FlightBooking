const mongoose = require("mongoose");
const Blogs = new mongoose.Schema({
    header: { type: String, required: true },
    content: { type: String, required: true },
    publishDate: { type: Date, required: true },
    views: { type: Number, default: 0 },
    image: { type: String, required: true },
});

module.exports = mongoose.model("blogs", Blogs);

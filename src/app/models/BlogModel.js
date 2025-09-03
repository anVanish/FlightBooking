const mongoose = require("mongoose");
const Blogs = new mongoose.Schema(
    {
        header: { type: String, required: true },
        brief: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, required: true },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("blogs", Blogs);

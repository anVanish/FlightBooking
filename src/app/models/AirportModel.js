const mongoose = require("mongoose");

const Airports = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, default: "Việt Nam" },
});

module.exports = mongoose.model("airports", Airports);

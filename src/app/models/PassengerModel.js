const mongoose = require("mongoose");

const Passengers = new mongoose.Schema({
    identification: { type: String, required: true },
    name: { type: String, required: true },
    birth: { type: Date, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
});

module.exports = mongoose.model("passengers", Passengers);

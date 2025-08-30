const mongoose = require("mongoose");

const Passengers = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    phone: { type: String, required: true },
});

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Flights = new mongoose.Schema(
    {
        brand: { type: String, required: true },
        planeName: { type: String },
        from: { type: ObjectId, ref: "airports" },
        to: { type: ObjectId, ref: "airports" },
        departureDate: { type: Date, required: true },
        arrivalDate: { type: Date, required: true },
        price: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

Flights.statics.findFlightsByDate = function (from, to, date) {
    const startDay = new Date(date);
    const endDay = new Date(date);
    endDay.setHours(23, 59, 59, 999);

    return this.find({
        from,
        to,
        departureDate: { $gt: startDay, $lt: endDay },
    })
        .populate("from")
        .populate("to")
        .sort({ price: 1 });
};

module.exports = mongoose.model("flights", Flights);

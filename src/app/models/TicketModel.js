const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Tickets = new mongoose.Schema(
    {
        userId: { type: ObjectId, required: true, ref: "users" },
        flightId: { type: ObjectId, required: true, ref: "flights" },
        passengers: [
            {
                _id: { type: ObjectId, required: true, ref: "passengers" },
            },
        ],
        members: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("tickets", Tickets);

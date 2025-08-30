const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Tickets = new mongoose.Schema(
    {
        userId: { type: ObjectId, required: true, ref: "users" },
        flight: { type: ObjectId, required: true, ref: "flight" },
        passengers: [],
        numberOfTickets: { type: Number, required: true },
    },
    { timestamps: true }
);

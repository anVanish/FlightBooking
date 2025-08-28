// const Flight = function(flight){
//     this.flight_id = flight.flight_id || -1
//     this.flight_name = flight.flight_name || ''
//     this.place_from = flight.place_from || {}
//     this.place_to = flight.place_to || {}
//     this.departure_date = flight.departure_date || ''
//     this.price = flight.price || 0
//     this.depature_time = flight.depature_time || -1
//     this.arrival_time = flight.arrival_time || -1
//     this.plane_name = flight.plane_name || ''
// }

// module.exports = Flight

const mongoose = require("mongoose");
const Flights = new mongoose.Schema({
    name: { type: String, required: true },
    from: {
        code: { type: String, required: true },
        name: { type: String, required: true },
    },
    to: {
        code: { type: String, required: true },
        name: { type: String, required: true },
    },
    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true },
    price: { type: Number, required: true },
    planeName: { type: String },
});

module.exports = mongoose.model("flights", Flights);

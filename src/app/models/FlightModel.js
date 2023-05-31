const Flight = function(flight){
    this.flight_id = flight.flight_id || -1
    this.flight_name = flight.flight_name || ''
    this.place_from = flight.place_from || {}
    this.place_to = flight.place_to || {}
    this.departure_date = flight.departure_date || ''
    this.price = flight.price || 0
    this.depature_time = flight.depature_time || -1
    this.arrival_time = flight.arrival_time || -1
    this.plane_name = flight.plane_name || ''
}

module.exports = Flight
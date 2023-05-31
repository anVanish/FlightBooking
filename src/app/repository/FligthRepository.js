const db = require('../../config/db')
const Flight = require('../models/FlightModel')

const FlightRepo = function(){}

FlightRepo.findFlight = (place_from_id, place_to_id, startDate)=>{
    var sql = 'select * from flight where place_from_id = ? and place_to_id = ? and departure_date = ? order by depature_time'
    return db.execute(sql, [place_from_id, place_to_id, startDate])
}

FlightRepo.findById = (flight_id)=>{
    var sql = 'select * from flight where flight_id = ?'
    return db.execute(sql, [flight_id])
}

FlightRepo.findAllTicket = (user_id)=>{
    var sql = 'select * from ticket, flight where user_id = ? and ticket.flight_id = flight.flight_id'
    return db.execute(sql, [user_id])
}

module.exports = FlightRepo
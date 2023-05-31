const db = require('../../config/db')
const Blog = require('../models/BlogModel')

const GeneralRepo = function(){}
GeneralRepo.findAllBlog = ()=>{
    var sql = 'select * from article'
    return db.execute(sql)
}

GeneralRepo.findBlogById = (article_id)=>{
    var sql = 'select * from article where article_id = ?'
    return db.execute(sql, [article_id])
}

GeneralRepo.readBlog = (article_id)=>{
    var sql = 'update article set view = view + 1 where article_id = ?'
    return db.execute(sql, [article_id])
}

GeneralRepo.findPopBlog = () => {
    var sql = 'select * from article order by view desc limit 3'
    return db.execute(sql)
}

GeneralRepo.findPlaceByCode = (code) =>{
    var sql = 'select * from place where place_code = ?'
    return db.execute(sql, [code])
}

GeneralRepo.findPlaceById = (id) =>{
    var sql = 'select * from place where place_id = ?'
    return db.execute(sql, [id])
}

GeneralRepo.findAllSeat = ()=>{
    var sql = 'select * from seat_map'
    return db.execute(sql)
}

GeneralRepo.findBookingSeat = (flight_id) =>{
    var sql = 'select seat_id from seat_booking where flight_id = ?'
    return db.execute(sql, [flight_id])
}

GeneralRepo.userBooking = (user_id, flight_id)=>{
    var sql = 'insert into passenger_booking(user_id, flight_id) values (?, ?)'
    return db.execute(sql, [user_id, flight_id])
}
GeneralRepo.seatBooking = (seat_id, flight_id)=>{
    var sql = 'insert into seat_booking(seat_id, flight_id) values (?, ?)'
    return db.execute(sql, [seat_id, flight_id])
}
GeneralRepo.ticketBooking = (user_id, flight_id, total, passenger_count, bookAt, code)=>{
    var sql = 'insert into ticket(user_id, flight_id, total, passenger_count, bookAt, code) values (?, ?, ?, ?, ?, ?)'
    return db.execute(sql, [user_id, flight_id, total, passenger_count, bookAt, code])
}

module.exports = GeneralRepo
const db = require('../../config/db')
const User = require('../models/UserModel')

const UserRepo = function(){}
UserRepo.register = (email, password) =>{
    const name = email.split('@')[0]
    var sql = 'insert into user(email, password, user_name) values (?, ?, ?)'
    return db.execute(sql, [email, password, name])
}
UserRepo.findByEmail = (email) => {
    var sql = 'select * from user where email = ?'
    return db.execute(sql, [email])
}
UserRepo.update = (user) =>{
    var sql = 'update user set user_name = ?, email = ?, date_of_birth = ?, address = ?, phone_number = ?, gender = ? where user_id = ?'
    return db.execute(sql, [user.user_name, user.email, user.date_of_birth, user.address, user.phone_number, user.gender, user.user_id])
}
UserRepo.saveUser = (user) =>{
    var sql = 'insert into user(email, user_name, phone_number, address, gender, date_of_birth) values (?, ?, ?, ?, ?, ?)'
    return db.execute(sql, [user.email, user.user_name, user.phone_number, user.address, user.gender, user.date_of_birth])
}
UserRepo.getNewUser = () =>{
    var sql = 'select * from user where user_id = (select MAX(user_id) from user)'
    return db.execute(sql)
}

module.exports = UserRepo
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

module.exports = UserRepo
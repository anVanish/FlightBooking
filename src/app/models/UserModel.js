const User = function(user){
    this.user_id = user.user_id || -1
    this.user_name = user.user_name || ''
    this.email = user.email || ''
    this.password = user.password || ''
    this.date_of_birth = user.date_of_birth || null
    this.address = user.address || ''
    this.phone_number = user.phone_number || ''
    this.gender = user.gender || ''
}

module.exports = User
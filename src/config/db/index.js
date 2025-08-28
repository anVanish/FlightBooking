// const mysql = require('mysql2')

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'vanish',
//     database: 'flight_booking'
// });

// connection.connect(function(err){
//     if (err){
//         console.log("Kết nối DB thất bại")
//         console.log(err)
//     }else{
//         console.log("Kết nối DB thành công")
//     }
// })

// module.exports = connection.promise()

const mongoose = require("mongoose");

async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connect successfully!!");
    } catch (error) {
        console.log("Connect failure!!");
        s;
    }
}

module.exports = { connect };

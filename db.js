const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://krishna2510:satyam123@cluster0.o0t3u2z.mongodb.net/HotelBooking' ;
mongoose.connect(mongoURL,{useNewUrlParser:true});
var connection=mongoose.connection

connection.on('error',()=>{
    console.log('Mongoose DB Connection failed');
})
connection.on('connected',()=>{
    console.log('Mongo DB connection successful');
})

module.exports=mongoose;
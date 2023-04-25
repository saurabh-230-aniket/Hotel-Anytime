const express = require('express');
const app=express();

const dbconfig = require('./db');

const roomsRoute=require('./routes/roomsRoute')
const userRoute=require('./routes/userRoute');
const bookingsRoute=require('./routes/bookingsRoute');

app.use(express.json());//to receive parameters from body


app.use('/api/rooms',roomsRoute);
app.use('/api/users',userRoute);
app.use('/api/bookings',bookingsRoute);

const port=5000;

app.listen(port,()=>{
    console.log("Node server started");
});
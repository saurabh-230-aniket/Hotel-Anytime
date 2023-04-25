const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');
const moment = require('moment');
// const{v4:uuidv4}=require('uuid')
// const stripe = require('stripe')('sk_test_51MwV0ESAuZkAlmm5br2Z0Q5PW9ohPKm6vGnwFQp4VlulKfr0gJOcTTSfqcejmw6lm8xovO8cR1q3gwpkXZYZ9xZH00K6063F39')

router.post("/bookroom",async (req,res)=>{
    const{
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays} = req.body;

        try {
            
            // const customer = await stripe.customers.create({
            //     email : token.email,
            //     source : token.id
            // })

            // const payment = await stripe.charges.create({
            //     amount : totalamount*100,
            //     customer : customer.id,
            //     currency : 'inr',
            //     receipt_email : token.email
            // },{
            //     idempotencyKey : uuidv4()
            // });

            // if(payment){
                    const newbooking = new Booking({
                        room:room.name,
                        roomid:room._id,
                        userid,
                        fromdate:moment(fromdate).format('DD-MM-YYYY'),
                        todate:moment(todate).format('DD-MM-YYYY'),
                        totalamount,
                        totaldays,
                        transactionid:'1234'
                    });
        
                    const booking = await newbooking.save();
                    await Room.findOneAndUpdate(
                        {_id: room._id},
                        {$push: {
                            currentbookings: {
                                bookingid: booking._id,
                                fromdate: moment(fromdate).format('DD-MM-YYYY'),
                                todate: moment(todate).format('DD-MM-YYYY'),
                                userid: userid,
                                status: booking.status
                            }
                        }}
                    );
                    
                    res.send("Payment Successfull, Your Room is booked");

        } catch (error) {
            return res.status(400).json({error})
        } 
});



router.post('/getbookingsbyuserid', async(req,res)=>{
    console.log("Payload=", req);
    const userid = req.body.userid;
    try {
        const bookings = await Booking.find({userid : userid});
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({error});
    }
});


router.post('/cancelbooking', async(req,res)=>{

    const {bookingid, roomid} = req.body;
    try {
        const bookingitem = await Booking.findOne({_id : bookingid});
        bookingitem.status='Cancelled';
        await bookingitem.save();

        const room = await Room.findOne({_id: roomid});

        const bookings = room.currentbookings;
        const temp = bookings.filter(booking=>{ booking.bookingid.toString()!==bookingid});
        room.currentbookings=temp;
        await room.save();
        res.send("Your booking cancelled successfully");
    } catch (error) {
        return res.status(400).json({error});
    }
});






module.exports=router;
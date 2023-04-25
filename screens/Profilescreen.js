import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import swal from 'sweetalert';
import { Divider, Space, Tag } from 'antd';



const { TabPane } = Tabs;

function Profilescreen(props) {

    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        const fun = async () => {
            if (!user)
                window.location.href = '/login';
        }

        fun();
    }, []);



    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Profile" key="1">
                    <h1>Profile</h1>
                    <br />
                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>isAdmin: {user.isAdmin ? "Yes" : "No"}</h1>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Profilescreen;


export function MyBookings() {

    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings,setbookings] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    useEffect(() => {
        const fun = async () => {

            try {
                setloading(true);
                const response = (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id }));
                const rooms = response.data;
                console.log("Rooms of yhis user");
                console.log(rooms)
                setbookings(rooms);
                setloading(false);
            } catch (error) {
                setloading(false);
                console.log(error);
                seterror(error);
            }
        }

        fun();
    }, []);


    async function cancelBooking(bookingid, roomid){

        try {
            setloading(true);
            const result  = (await axios.post("/api/bookings/cancelbooking",{bookingid, roomid})).data;
            setloading(false);
            swal("Congratulations","Your bookings has been successfully cancelled").then(result=>{
                window.location.reload();
            })
            console.log(result);
        } catch (error) {
            console.log(error);
            setloading(false);
            swal("Oops","Something went wrong",'error');
        }
    }
    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && (<Loader/>)}
                    {bookings && bookings.map(booking=>{
                        return(
                        <div className='bs'>
                            <h1>{booking.room}</h1>
                            <p><b>Booking Id:</b> {booking._id}</p>
                            <p><b>Checkin Date:</b>{booking.fromdate}</p>
                            <p><b>Checkout Date:</b>{booking.todate}</p>
                            <p><b>Amount:</b>{booking.totalamount}</p>
                            <p><b>Status:</b>{booking.status=='booked'? <Tag color="green">Confirmed</Tag>
                            :<Tag color="red">Cancelled</Tag>
                        }</p>

                            {booking.status !== 'Cancelled' && <div className='text-end'>
                            <button className='btn btn-primary' onClick={()=>{cancelBooking(booking._id,booking.roomid)}}>CANCEL BOOKING</button>
                        </div> }

                        </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}
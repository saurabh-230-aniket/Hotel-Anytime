import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert';

function Bookingscreen() {
    let { id, fromdate, todate } = useParams();
    const [room, setroom] = useState();
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    fromdate = moment(fromdate, 'DD-MM-YYYY');
    todate = moment(todate, 'DD-MM-YYYY');
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
    const totalamount = room && totaldays * room.rentperday;

    useEffect(() => {

        if(!localStorage.getItem('currentUser')){
            window.location.href='/login';
        }
        const fetchData = async () => {
            try {
                setloading(true);
                const { data: response } = await axios.post('/api/rooms/getroombyid', { id: id });
                setroom(response);
                console.log(response);
                setloading(false);
            } catch (error) {
                seterror(true);
                console.error(error.message);
                setloading(false);
            }

        }

        fetchData();
    }, []);
    async function onToken(token){
        console.log(token); 
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
        }

        console.log('DATA' + JSON.stringify(bookingDetails))
        try {
            setloading(true);
            const result = axios.post('/api/bookings/bookroom', bookingDetails)
            setloading(false);
            swal('Congratulations','Your Room has been booked successfully','success').then(result=>{
                window.location.href='/profile';
            });
        }
        catch (error) {
            console.log(error);
            setloading(false);
            swal('Oops',"Something went wrong",'error').then(result=>{
                window.location.href='/bookings';
            });
        }
    }

    return (
        <div>
            {loading ? (<Loader />) : error ? (<Error message='Some error occurred' />) : (
                <div className='row m-2 bs'>
                    <div className='col-md-5 m-2'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg'></img>
                    </div>
                    <div className='col-md-5 m-2'>
                        <h1>Booking Details</h1>
                        <hr></hr>
                        <div>
                            <b>
                                <p>Name:{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>From Date: {fromdate.format('DD-MM-YYYY')}</p>
                                <p>To Date: {todate.format('DD-MM-YYYY')}</p>
                                <p>Max Count: {room.maxcount}</p>
                            </b>
                        </div>
                        <div>
                            <h1>Amount</h1>
                            <hr />
                            <b>
                                <p>Total days:{totaldays}</p>
                                <p>Rent per day: Rs.{room.rentperday}</p>
                                <p>Total Amount:Rs.{totalamount}</p>
                            </b>
                        </div>
                        <div>
                            <StripeCheckout
                                amount={totalamount*100}
                                currency='INR'
                                token={onToken}
                                stripeKey="pk_test_51MwV0ESAuZkAlmm5zai0ZvLBevNdbUQHHQskp46uE0IK2NqC75o2Y4VSZQ2EedYP6cVcdBGKCg8oqo628uE9Z8bV00Nd4ABCK5"
                            >
                            <button className='btn btn-primary'>Pay Now</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bookingscreen;
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';
import moment from 'moment'
const { RangePicker } = DatePicker;

function Homescreen() {

  const [rooms, setrooms] = useState([])
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);
  const [searchkey, setsearchkey] = useState('');
  const [type, settype] = useState('all');

  useEffect(() => {
    const fetchData = async () => {

      try {
        setloading(true);
        const { data: response } = await axios.get('api/rooms/getallrooms');
        setrooms(response);
        setduplicaterooms(response)
        setloading(false);
      } catch (error) {
        seterror(true);
        console.error(error.message);
        setloading(false);
      }

    }

    fetchData();
  }, []);

  function filterByDate(dates) {
    // console.log(dates);
    setfromdate(moment(dates[0].$d).format('DD-MM-YYYY'));
    settodate(moment(dates[1].$d).format('DD-MM-YYYY'));

    var temprooms = [];
    
    for (const room of duplicaterooms) {
      let availability = false;
      console.log("at this room "+room.name);
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (!moment((moment(dates[0].$d)).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate) 
          && !moment((moment(dates[1].$d)).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)) {
            console.log("Inside first if");
            console.log("moment(dates[0].$d).format('DD-MM-YYYY') = "+moment(dates[0].$d).format('DD-MM-YYYY'));
            console.log("moment(dates[1].$d).format('DD-MM-YYYY') = "+moment(dates[1].$d).format('DD-MM-YYYY'));
            console.log("booking.fromdate  = "+booking.fromdate );
            console.log("booking.todate = "+booking.todate);
            if (moment(dates[0].$d).format('DD-MM-YYYY') !== booking.fromdate 
            && moment(dates[0].$d).format('DD-MM-YYYY') !== booking.todate 
            && moment(dates[1].$d).format('DD-MM-YYYY') !== booking.fromdate 
            && moment(dates[1].$d).format('DD-MM-YYYY') !== booking.todate) {
              console.log("Inside second if");
              availability = true;
            }
          }
        }
      }
      console.log("avail="+availability + " and currnetbookilen="+room.currentbookings.length);
      if(availability==true || room.currentbookings.length==0){
        temprooms.push(room);
      }
      setrooms(temprooms);
      console.log(temprooms);
    }
    console.log('----------');
  }

  function filterBySearch(){
    const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()));
    setrooms(temprooms);
  }

  function filterByType(e){
    settype(e);
    if(e !== 'all'){
    const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase());
    setrooms(temprooms);
    }
    else{
      setrooms(duplicaterooms);
    }
  }

  // function filterByDate(dates) {
  //   const fromdate = moment(dates[0].$d).format('DD-MM-YYYY');
  //   const todate = moment(dates[1].$d).format('DD-MM-YYYY');
  
  //   const filteredRooms = duplicaterooms.filter(room => {
  //     const hasBooking = room.currentbookings.some(booking => {
  //       return moment(fromdate).isBetween(booking.fromdate, booking.todate) || 
  //              moment(todate).isBetween(booking.fromdate, booking.todate);
  //     });
  
  //     return !hasBooking;
  //   });
  
  //   setrooms(filteredRooms);
  // }

  return (
    <div className='container'>
      <div className='row mt-5 bs' >
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
          
        </div>
        <div className='col-md-5'>
              <input type='text' className='form-control' value={searchkey} onChange={(e)=>{setsearchkey(e.target.value);console.log(searchkey)}} placeholder='Search Rooms' onKeyUp={filterBySearch}></input>
        </div>
        <div className='col-md-3'>
        <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
          <option value="all">All</option>
          <option value="delux">Delux</option>
          <option value="non-delux">Non Delux</option>
        </select>
        </div>
      </div>
      <div className='row justify-content-center mt-5'>
        {loading ? (<h1><Loader /></h1>) : (rooms && rooms.map(room => {
          return (
            <div className='col-md-9 mt-2'>
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          )
        }))} 
      </div>
    </div>
  )
}

export default Homescreen;
import React from 'react';
import { Link } from 'react-router-dom';


function Landingscreen(props) {
    return (
        <div className='row  landing'>
            <div className='col-md-12  text-center'>
                <h3>Hotel Hustle</h3>
                <h1 style={{color:'white',padding:'20px'}}>"Travel smart, not hard - book your next hotel stay with Hotel Hustle."</h1>

                <Link to='/home'>
                    <button className='btn btn-primary start'>Get Started</button>
                </Link>
            </div>
        </div>
    );
}

export default Landingscreen;
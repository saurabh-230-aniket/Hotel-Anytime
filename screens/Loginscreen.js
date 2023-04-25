import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Loginscreen(props) {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setloading] = useState();
    const [error, seterror] = useState();


    async function login() {
        const user = {
            email,
            password 
        }
        try {
            setloading(true);
            // const result = await axios.post('/api/users/login', user).data;
            const response = await axios.post('/api/users/login', user);
            const result = response.data;
            setloading(false);
            localStorage.setItem('currentUser', JSON.stringify(result));
            window.location.href = '/home';
        }
        catch (e) {
            console.log(e);
            setloading(false);
            seterror(true);
        }
        console.log(user)
    }
    return (
        <div>
            {loading && <Loader />}
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>
                    {error && <Error message="Invalid Credentials" />}
                    <div className='bs'>
                        <h2>Login</h2>
                        <input required type="text" className='form-control' value={email} onChange={(e) => { setemail(e.target.value) }} placeholder='email'></input>
                        <input required type="text" className='form-control' value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder='password'></input>

                        <button className='btn btn-primary mt-3' onClick={login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loginscreen;
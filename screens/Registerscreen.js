import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';


function Registerscreen(props) {
    const[name, setname] = useState('');
    const[email, setemail] = useState('');
    const[password, setpassword] = useState('');
    const[cpassword, setcpassword] = useState('');

    const [loading, setloading] = useState();
    const [error, seterror] = useState();
    const [success,setsuccess]=useState();

    async function register(){
        if(password==cpassword){
            const user={
                name,
                email,
                password,
                cpassword
            }

            try{
                setloading(true);
                const result = await axios.post('/api/users/register',user).data;
                setloading(false);
                setsuccess(true);

                setname('');
                setemail('');
                setpassword('');
                setcpassword('');
            }
            catch(e){
                console.log(e);
                setloading(false);
                seterror(true);
            }
            console.log(user)
        }
        else{
            alert("Passwords don't match")
        }
    }
    return (
        <div>
            {loading && (<Loader/>)}
            {error && (<Error/>)}
            
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>
                {success && <Success message="Registration Success"/>}
                    <div className='bs'>
                        <h2>Register</h2>
                        <input required type="text" className='form-control' value={name} onChange={(e)=>{setname(e.target.value)}} placeholder='name'></input>
                        <input required type="text" className='form-control' value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder='email'></input>
                        <input required type="text" className='form-control' value={password} onChange={(e)=>{setpassword(e.target.value)}} placeholder='password'></input>
                        <input required type="text" className='form-control' value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}} placeholder='confirm password'></input>

                        <button className='btn btn-primary mt-3' onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registerscreen;
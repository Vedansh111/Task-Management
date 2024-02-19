import React, { useEffect, useState } from 'react';
import OtpInput from '../Helper Components/OtpInput';
import { Link } from 'react-router-dom';
import SubmitButton from '../Helper Components/SubmitButton';
import axios from 'axios';

function OtpPage() {
    const [enterOtp, setEnterOtp] = useState(false);
    const [access_token, setAccessToken] = useState(0);
    const [remember, setRemember] = useState();
    const ids = [1, 2, 3, 4];

    function handleClick() {
        axios.post(`api/v1/users/send_otp?access_token=${access_token}`)
        setEnterOtp(true);
        const inputs = document.querySelectorAll('#otp > *[id]');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('keydown', function (event) {
                if (event.key === "Backspace") {
                    inputs[i].value = '';
                    if (i !== 0) inputs[i - 1].focus();
                }
                else {
                    if (i === inputs.length - 1 && inputs[i].value !== '') {
                        return true;
                    }
                    else if (event.keyCode > 47 && event.keyCode < 58) {
                        inputs[i].value = event.key;
                        if (i !== inputs.length - 1) inputs[i + 1].focus();
                        event.preventDefault();
                    }
                    else if (event.keyCode > 64 && event.keyCode < 91) {
                        inputs[i].value = String.fromCharCode(event.keyCode);
                        if (i !== inputs.length - 1) inputs[i + 1].focus();
                        event.preventDefault();
                    }
                }
            });
        }
    }

    function handleChange(e){
        setRemember(e.target.value);
    }

    useEffect(()=>{
        setAccessToken(localStorage.getItem('access_token'))
    }, [])

    return (
        <div className=' h-screen bg-center bg-cover' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519419166318-4f5c601b8e6c?q=90&w=1650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            <div className='flex justify-center items-center h-full'>
                <div className='flex flex-col items-center min-w-[25rem] bg-white p-6 rounded-3xl shadow-lg lg:absolute right-[15rem] '>
                    <h1 className='text-3xl font-semibold mt-8'>Welcome Back</h1>
                    <p className='text-center text-sm text-gray-600 font-light mt-2'>Enter your email to receive a one-time password</p>
                    <input type='text' className='text-center p-2 border border-black mt-4 rounded-sm h-10 w-72' placeholder='Enter your email' onChange={handleChange} required/>
                    <h1 className='text-xl mt-6 font-semibold'>OTP Verification</h1>
                    <div id="otp" className="flex justify-center mt-3">
                        {ids.map((value) => {
                            return <OtpInput id={value} var={enterOtp} key={value} />
                        })}
                    </div>
                    <button onClick={() => handleClick()} className='text-sm mt-4 hover:underline'>Send OTP</button>
                    <div className='mt-4'>
                        <SubmitButton name='Verify Account' />
                    </div>
                    <p className='mt-2 text-sm'>Didn't receive code? <Link to='#' className='font-semibold text-gray-700 hover:text-gray-900'>Resend</Link></p>
                </div>
            </div>
        </div>
    )
}

export default OtpPage;

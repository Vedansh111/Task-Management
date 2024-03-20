import React, { useEffect, useState } from 'react';
import OtpInput from '../Helper Components/OtpInput';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import Swal from 'sweetalert2';

function OtpPage() {
    const navigate = useNavigate();
    const [enterOtp, setEnterOtp] = useState(false);
    const [verifyButton, setVerifyButton] = useState(false);
    const [otpButton, setOtpButton] = useState(true);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const ids = [1, 2, 3, 4];
    const initialValues = {
        email: '',
        otpValues: ['', '', '', ''],
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object({
            email: yup.string().email('Invalid email address').required('Email is required').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"),
        }),
        onSubmit: (values, action) => {
            console.log(values);
            axios.get('api/v1/users/app_creds')
                .then((res) => {
                    console.log(res);
                    const formData = new FormData();
                    formData.append('email', values.email);
                    formData.append('otp', values.otpValues.join(''));
                    formData.append('client_id', res.data.client_id);
                    axios.post('api/v1/users/login', formData).then((res) => {
                        localStorage.setItem('access_token', res.data?.user?.access_token);
                        localStorage.setItem('role', res.data?.user?.role);
                        (localStorage.getItem('role') === 'admin') ? navigate('/admin/dashboard', { replace: true }) : navigate('/user/dashboard', { replace: true });
                        console.log("post data", res);
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            title: `Welcome ${res?.data?.user?.email}`,
                            timer: 2000,
                        });
                    }).catch((err) => {
                        console.log(err);
                        if (err.response?.data?.message) {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: err.response?.data?.message,
                            });

                            navigate('/')
                        }
                    })
                }).catch((err) => {
                    console.log(err);
                })
            action.resetForm();
        },
    });

    function handleClick() {
        setEnterOtp(true);
        setOtpButton(false);
        sendOTP();
    }

    const sendOTP = () => {
        const formData = new FormData();
        formData.append('email', values.email);
        axios.post('api/v1/users/send_otp', formData).then((res) => {
            setMinutes(1);
            setSeconds(59);
            console.log(res);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Otp has been sent!",
                showConfirmButton: false,
                timer: 1500
            });
        }).catch((err) => {
            console.log(err);
        })
        setVerifyButton(true);
    };

    const resendOTP = () => {
        const formData = new FormData();
        formData.append('email', values.email);
        axios.post('api/v1/users/send_otp', formData).then((res) => {
            setMinutes(1);
            setSeconds(59);
            console.log(res);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Otp has been sent!",
                showConfirmButton: false,
                timer: 1500
            });
        }).catch((err) => {
            console.log(err);
        })
        setEnterOtp(true);
        setVerifyButton(true);
    };

    const handleOtpChange = (index, value) => {
        const newOtpValues = [...values.otpValues];
        newOtpValues[index] = value;
        handleChange({
            target: {
                name: 'otpValues',
                value: newOtpValues,
            },
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setEnterOtp(false);
                    setVerifyButton(false);
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [minutes, seconds]);

    useEffect(() => {
        if (localStorage.getItem('role') === 'volunteer') {
            navigate('/user/dashboard', { replace: true });
        } else if (localStorage.getItem('role') === 'admin') {
            navigate('/admin/dashboard', { replace: true });
        }
    }, []);

    return (
        <div className=' h-screen bg-center bg-cover md:grid md:items-center' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519419166318-4f5c601b8e6c?q=90&w=1650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col items-center w-[25rem] bg-white p-6 rounded-3xl shadow-lg lg:absolute md:absolute sm:absolute bottom-[11rem] right-[15rem] '>
                    <h1 className='text-3xl font-semibold mt-8'>Welcome Back</h1>
                    <p className='text-center text-sm text-gray-600 font-light mt-2'>Enter your email to receive a one-time password</p>

                    <input
                        type='email'
                        className='text-center p-2 border border-black mt-4 rounded-sm h-10 w-72'
                        name='email'
                        placeholder='Enter your email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {errors.email && touched.email ?
                        <p className=' text-xs'>{errors.email}</p> : null}

                    <h1 className='text-xl mt-6 font-semibold'>OTP Verification</h1>

                    <div id="otp" className="flex justify-center mt-3">
                        {ids.map((value, index) => (
                            <OtpInput
                                name={`otpValues[${index}]`} // Use array notation for name
                                id={value}
                                var={enterOtp}
                                key={value}
                                value={values.otpValues[index]}
                                handleChange={(e) => handleOtpChange(index, e.target.value)} // Handle OTP input change
                            />
                        ))}
                    </div>
                    {seconds > 0 || minutes > 0 ? (
                        <p className='text-sm text-gray-600'>
                            Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                    ) : (
                        <p></p>
                    )}
                    {
                        otpButton ?
                            <button
                                type='button'
                                onClick={() => handleClick()}
                                className='text-sm mt-4 hover:scale-105 border border-gray-500 p-1.5 rounded-md'>Send OTP</button>
                            :
                            ""
                    }

                    {
                        verifyButton ?
                            <div className='flex justify-center mt-4'>
                                <button
                                    type='submit'
                                    className='mt-3 mb-3 p-2 text-white rounded-md border border-gray-500 font-medium text-lg hover:scale-105'
                                    style={{ backgroundColor: 'black' }}>
                                    Verify Account
                                </button>
                            </div > :
                            " "
                    }

                    <p
                        hidden={seconds > 0 || minutes > 0}
                        className='mt-2 text-sm'>Didn't receive code?
                        <button
                            type='button'
                            onClick={resendOTP}
                            className='ml-0.5 font-semibold text-gray-700 hover:text-gray-900'>Resend
                        </button>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default OtpPage;

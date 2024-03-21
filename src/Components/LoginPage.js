import React, { useEffect, useState } from 'react';
import HoverButton from '../Helper Components/HoverButton';
import Input from '../Helper Components/Input';
import SubmitButton from '../Helper Components/SubmitButton';
import LinkTo from '../Helper Components/LinkTo';
import Loader from '../Helper Components/Loader';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

function LoginPage() {
    const [loader, setLoader] = useState([]);
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
    };

    useEffect(() => {
        if (localStorage.getItem('role') === 'volunteer') {
            navigate('/user/dashboard', { replace: true });
        } else if (localStorage.getItem('role') === 'admin') {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [])

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object({
            email: yup.string().email('Invalid email address').required('Email is required').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"),
            password: yup.string().required('Password is required'),
        }),
        onSubmit: (values, action) => {
            setLoader(0);
            console.log(values);
            axios.get('api/v1/users/app_creds')
                .then((res) => {
                    // console.log("get data", res.data);
                    const formData = new FormData();
                    formData.append('email', values.email)
                    formData.append('password', values.password)
                    formData.append('client_id', res.data.client_id);
                    axios.post('api/v1/users/login', formData).then((res) => {
                        setLoader(res);
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
                            setLoader([])
                            navigate('/')
                        }
                    })
                }).catch((err) => {
                    console.log(err);
                })
            action.resetForm();
        },
    });

    return (
        loader ?
            <div className='w-screen h-screen flex justify-center items-center font-jetbrains'>

                {/* Pencil background */}
                <div className="hidden md:flex justify-center items-center w-1/2 h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578852612716-854e527abf2e?q=90&w=0840&h=1100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                </div>

                {/* Login section */}
                <div className='w-full md:w-1/2 flex flex-col items-center bg-[#fdfdfa]'>
                    <div className='w-full md:w-[350px] h-[50px] mt-5 md:mt-0 mr-5 md:mr-0 flex justify-end items-center text-center absolute top-0 right-2 '>
                        <h1>Don't have an account yet?</h1>
                        <HoverButton name="Sign Up" to='/signup' />
                    </div>
                    <div className='w-full md:w-[350px] flex flex-col justify-center items-center mt-20 md:mt-0'>
                        <h1 className='text-3xl font-semibold mb-2'>TaskNinja</h1>
                        <h1 className='mb-4'>Hello, who's this?</h1>
                        <form className='lg:w-full md:w-[90%]' onSubmit={handleSubmit} method='post'>
                            <Input
                                title='Email'
                                type='email'
                                name='email'
                                placeholder='Enter your email'
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.email}
                                touched={touched.email}
                                values={values.email}
                            />
                            <Input
                                title='Password'
                                type='password'
                                name='password'
                                placeholder='Enter your password'
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.password}
                                touched={touched.password}
                                values={values.password}
                            />
                            <div className='flex justify-between lg:w-[90%] '>
                                <LinkTo name='Forgot Password?' to='forgot_password' />
                                <LinkTo name='Login through OTP' to='/login_through_otp' />
                            </div>
                            <SubmitButton name='Log In' />
                        </form>
                    </div>
                </div>
            </div> : <Loader />
    );
}

export default LoginPage;

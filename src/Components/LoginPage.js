import React, { useEffect } from 'react'
import HoverButton from '../Helper Components/HoverButton'
import Input from '../Helper Components/Input'
import SubmitButton from '../Helper Components/SubmitButton'
import LinkTo from '../Helper Components/LinkTo'
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function LoginPage() {

    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
    };

    useEffect(() => {
        (localStorage.getItem('access_token') ? navigate('/user/events') : navigate('/'))
    }, [])

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object({
            email: yup.string().email('Invalid email address').required('Email is required').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"),
            password: yup.string().required('Password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Invalid password"),
        }),
        onSubmit: (values, action) => {
            console.log(values);
            axios.get('api/v1/users/app_credentials')
                .then((res) => {
                    console.log("get data", res.data);
                    const formData = new FormData();
                    formData.append('email', values.email)
                    formData.append('password', values.password)
                    formData.append('client_id', res.data.client_id);
                    axios.post('api/v1/users/login', formData).then((res) => {
                        console.log("post data", res);
                        localStorage.setItem('access_token', res.data?.user?.access_token);
                        navigate('/user/events')
                    }).catch((err) => {
                        console.log(err);
                    })
                }).catch((err) => {
                    console.log(err);
                })
            action.resetForm();
        },
    });

    return (
        <div className='w-screen h-screen flex font-jetbrains' >

            {/* ⬇ Pencil background */}
            <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578852612716-854e527abf2e?q=90&w=0840&h=1100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} className="flex justify-center w-[42%] bg-center">
            </div>

            {/* ⬇ Login, Dont account? */}
            <div className='w-[58%] flex flex-col items-center bg-[#fdfdfa]'>

                {/* ⬇ Dont account? */}
                <div className=' w-[350px] h-[50px] mt-[10px] ml-[32rem] flex justify-center items-center text-center'>
                    <h1>Don't have an account yet?</h1>
                    <HoverButton name="Sign Up" to='/signup' />
                </div>

                {/* ⬇ Login */}
                <div className=' flex flex-col justify-center items-center w-2/3 h-[35rem] mt-[3rem]'>
                    <h1 className=' text-3xl font-semibold'>TaskNinja</h1>
                    <h1 className=' mt-2'>Hello, who's this?</h1>
                    <form onSubmit={handleSubmit} method='post'>
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
                        <div className='flex justify-between'>
                            <LinkTo name='Forgot Password?' to='forgot_password' />
                            <LinkTo name='Login through OTP' to='/login_through_otp' />
                        </div>
                        <SubmitButton name='Log In' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
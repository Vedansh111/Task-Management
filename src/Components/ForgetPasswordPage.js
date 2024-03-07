import React, { useEffect } from 'react';
import SubmitButton from '../Helper Components/SubmitButton';
import Input from '../Helper Components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as yup from 'yup';

function ForgetPasswordPage() {
    const navigate = useNavigate();
    const initialValues = {
        email: '',
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object({
            email: yup.string().email('Invalid email address').required('Email is required').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"),
        }),
        onSubmit: (values, action) => {
            console.log(values);
            const formData = new FormData();
            formData.append('email', values.email)
            axios.post('api/v1/users/forgot_password', formData).then((res) => {
                console.log(res);
                Swal.fire({
                    title: "Link Sent!",
                    text: "Check your email.",
                    icon: "success"
                });
            }).catch((err) => {
                console.log(err);
            })
            action.resetForm();
        },
    });

    useEffect(() => {
        if (localStorage.getItem('role') === 'volunteer') {
            navigate('/user/dashboard', { replace: true });
        } else if (localStorage.getItem('role') === 'admin') {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [])

    return (
        <div className='h-screen bg-center bg-cover' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1453227588063-bb302b62f50b?q=80&w=1570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            <div className='flex justify-center items-center h-full'>
                <div className='flex flex-col items-center max-w-lg bg-white p-6 rounded-3xl shadow-lg absolute lg:right-[10rem]'>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center '>
                        <h1 className='text-3xl font-semibold mt-8 md:text-right'>Forgot Something?</h1>
                        <p className='text-center text-sm text-gray-600 font-light mt-2 md:text-right'>Enter your email below to receive password reset instructions.</p>
                        <div className='mt-4'>
                            <Input
                                name='email'
                                title='Email'
                                type='text'
                                placeholder='Enter your email'
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.email}
                                touched={touched.email}
                                values={values.email}
                            />
                        </div>
                        <SubmitButton name='Verify Account' />
                        <p className='mt-2 text-sm'>Remember your password? <Link to='/' className='font-semibold text-gray-700 hover:text-gray-900'>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPasswordPage;

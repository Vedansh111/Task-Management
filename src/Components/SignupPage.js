import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import Input from '../Helper Components/Input';
import SubmitButton from '../Helper Components/SubmitButton';
import HoverButton from '../Helper Components/HoverButton';
import { UserValidations } from '../Validations/SignUpValidations';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const navigate = useNavigate();
    const initialValues = {
        name: '',
        email: '',
        password: '',
        phone: '',
        location: '',
    };

    useEffect(() => {
        (localStorage.getItem('access_token') ? navigate('/user/events') : navigate('/signup'))
    }, [])
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: UserValidations,
        onSubmit: (values, action) => {

            axios.get('api/v1/users/app_credentials').then((res) => {
                console.log("get data", res.data);
                const formData = new FormData();
                formData.append('user[email]', values.email)
                formData.append('user[password]', values.password)
                formData.append('client_id', res.data.client_id);
                axios.post('/api/v1/users', formData).then((res) => {
                    localStorage.setItem('access_token', res.data?.user?.access_token)
                    console.log("post data", res);
                    navigate('/user');
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
        <div className='w-screen h-screen flex justify-center items-center font-jetbrains'>

            {/* Pencil background */}
            <div className="bg-center md:text-center justify-center items-center w-1/2 h-screen hidden md:flex" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=90&w=0540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                <div className='mb-[5rem] flex flex-col items-center md:w-[42%]'>
                    <h1 className='mb-1 text-3xl'>Sign up</h1>
                    <h1 className='mt-1 text-3xl'>& come on in</h1>
                </div>
            </div>

            {/* SignUp section */}
            <div className='w-full md:w-1/2 flex flex-col items-center bg-[#fdfdfa]'>
                <div className='bg- w-full md:w-[350px] h-[50px] md:mt-0 md:mr-0 flex justify-end items-center text-center absolute top-0 right-2'>
                    <h1>Already have an account?</h1>
                    <HoverButton name='Log In' to='/' />
                </div>
                <div className='w-full md:w-[350px] flex flex-col justify-center items-center mt-20 md:mt-0'>
                    <h1 className='text-3xl font-semibold mb-4'>TaskNinja</h1>
                    <form className='w-full md:flex md:flex-col md:justify-center md:items-center' onSubmit={handleSubmit} method='post'>
                        <Input
                            title='Name'
                            type='text'
                            name='name'
                            placeholder='Enter your name'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.name}
                            touched={touched.name}
                            values={values.name} />
                        <Input
                            title='Email'
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.email}
                            touched={touched.email}
                            values={values.email} />
                        <Input
                            title='Password'
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.password}
                            touched={touched.password}
                            values={values.password} />
                        <Input
                            title='Phone Number'
                            type='phone'
                            name='phone'
                            placeholder='Enter your phone number'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.phone}
                            touched={touched.phone}
                            values={values.phone} />
                        <Input
                            title='Location'
                            type='location'
                            name='location'
                            placeholder='Enter your location'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.location}
                            touched={touched.location}
                            values={values.location} />
                        <SubmitButton name='Sign Up' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;

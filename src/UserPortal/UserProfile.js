import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import SubmitButton from '../Helper Components/SubmitButton';
import InputSettings from '../Helper Components/InputSettings';
import UploadButton from '../Helper Components/UploadButton';
import { useOutletContext } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
    const [accessToken, setAccessToken] = useState();
    useEffect(() => {
        setAccessToken(localStorage.getItem('access_token'));
    }, [])
    const userInfo = useOutletContext();
    const initialValues = {
        name: userInfo[0]?.name,
        email: userInfo[0]?.email,
        password: userInfo[0]?.password,
        phone: userInfo[0]?.mobile_number,
        position: userInfo[0]?.role,
        address: userInfo[0]?.residential_address,
        upload: '',
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            axios.put(`api/v1/users/update_profile?access_token=${accessToken}`, {
                user: {
                    name: values.name,
                    email: values.email,
                    mobile_number: values.phone,
                    residential_address: values.address
                },
            })
                .then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
            console.log(values);
            toast.success("Your profile has been successfully updated.");
        },
    });

    return (
        <div className='flex w-full justify-center items-center mt-10'>
            <div className='flex flex-col h-[75vh] w-2/3 border shadow-lg rounded-md bg-[#ecf1e8]'>
                <form className='w-full h-full md:flex md:flex-col md:justify-center md:items-center' onSubmit={handleSubmit} method='post'>
                    <div className=' flex p-2 m-2 items-center'>
                        <label htmlFor='upload' className=' text-lg font-semibold mr-3'>Profile Picture</label>
                        <img src={userInfo[0]?.avatar_url} alt="img" className='rounded-full w-10 h-10 mx-2' />
                        <UploadButton title='Change Profile Picture ' />
                    </div>
                    <InputSettings
                        title='Name'
                        type='text'
                        name='name'
                        placeholder='Enter your name'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors.name}
                        touched={touched.name}
                        values={values.name}
                        width='20rem' />
                    <InputSettings
                        title='Email'
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors.email}
                        touched={touched.email}
                        values={values.email}
                        width='20rem' />
                    <InputSettings
                        title='Phone Number'
                        type='phone'
                        name='phone'
                        placeholder='Enter your phone number'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors.phone}
                        touched={touched.phone}
                        values={values.phone}
                        width='20rem' />
                    {/* <InputSettings
                        title='Position'
                        type='position'
                        name='position'
                        placeholder='Enter your position'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors.position}
                        touched={touched.position}
                        values={values.position} /> */}
                    <InputSettings
                        title='Address'
                        type='address'
                        name='address'
                        placeholder='Enter your address'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors.address}
                        touched={touched.address}
                        values={values.address}
                        width='20rem' />
                    <div className=' flex p-2 m-2 items-center'>
                        <label htmlFor='upload' className=' text-lg font-semibold mr-3'>Upload Id</label>
                        <UploadButton title='Aadhar Card/ Pan Card' />
                    </div>
                    <SubmitButton name='Save' />
                </form>
            </div>
        </div>
    )
}

export default UserProfile
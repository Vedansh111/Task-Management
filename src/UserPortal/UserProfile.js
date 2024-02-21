import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import SubmitButton from '../Helper Components/SubmitButton';
import InputSettings from '../Helper Components/InputSettings';
import { useOutletContext } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

function UserProfile() {
    const [accessToken, setAccessToken] = useState();
    const userInfo = useOutletContext();
    const [avatarUrl, setAvatarUrl] = useState();
    const [aadharCardUrl, setAadharCardUrl] = useState();

    useEffect(() => {
        setAccessToken(localStorage.getItem('access_token'));
    }, [])

    const initialValues = {
        name: userInfo[0]?.name,
        email: userInfo[0]?.email,
        password: userInfo[0]?.password,
        phone: userInfo[0]?.mobile_number,
        position: userInfo[0]?.role,
        address: userInfo[0]?.residential_address,
        avatar: userInfo[0]?.avatar_url,
        aadhar_card: userInfo[0]?.aadhar_card_url,
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            await axios.put(`api/v1/users/update_profile?access_token=${accessToken}`, {
                user: {
                    name: values.name,
                    email: values.email,
                    mobile_number: values.phone,
                    residential_address: values.address,
                    avatar: avatarUrl,
                    aadhar_card: aadharCardUrl,
                },
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
            Swal.fire({
                title: "Updated!!!",
                text: "Your profile is updated.",
                icon: "success"
            });
        },
    });

    const uploadAvatar = async () => {
        const { value: file } = await Swal.fire({
            title: "Select image",
            input: "file",
            inputAttributes: {
                "accept": "image/*",
                "aria-label": "Upload your profile picture"
            }
        });
        if (file) {
            setAvatarUrl(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                Swal.fire({
                    title: "Your uploaded picture",
                    imageUrl: e.target.result,
                    imageAlt: "The uploaded picture"
                });
            };
            reader.readAsDataURL(file);
        }
    }

    const uploadAadhar = async () => {
        const { value: file } = await Swal.fire({
            title: "Select image",
            input: "file",
            inputAttributes: {
                "accept": "image/*",
                "aria-label": "Upload your Aadhar card/ Pan card"
            }
        });
        if (file) {
            setAadharCardUrl(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                Swal.fire({
                    title: "Your uploaded aadhar card",
                    imageUrl: e.target.result,
                    imageAlt: "The uploaded picture"
                });
            };
            reader.readAsDataURL(file);
        }
    }
    console.log(typeof (userInfo[0]?.avatar_url));
    console.log(userInfo[0]?.avatar_url);
    return (
        <div className='flex w-full justify-center items-center mt-10'>
            <div className='flex flex-col h-[75vh] w-2/3 border shadow-lg rounded-md bg-[#ecf1e8]'>
                <form className='w-full h-full md:flex md:flex-col md:justify-center md:items-center' onSubmit={handleSubmit} method='post'>
                    <div className=' flex p-2 m-2 items-center'>
                        <label htmlFor='upload' className=' text-lg font-semibold mr-3'>Profile Picture</label>
                        <img src={'https://e5b4-2405-201-2026-3800-34a4-1f63-b87b-eb45.ngrok-free.app/rails/active_storage/disk/eyJfcmFpbHMiO[…]alexander-hipp-iEEBWgY_6lA-unsplash.jpg'} alt="img"
                            className='border object-center border-gray-500 rounded-full w-10 h-10 mx-2' />
                        <button
                            type='button'
                            className='border border-gray-500 text-black p-1 rounded-md hover:bg-[#506f36] hover:text-white'
                            onClick={uploadAvatar}>Upload Picture</button>
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
                        <label className=' text-lg font-semibold mr-3'>Upload Id</label>
                        <button
                            type='button'
                            className='border border-gray-500 text-black p-1 rounded-md hover:bg-[#506f36] hover:text-white'
                            onClick={uploadAadhar}>Aadhar Card/ Pan Card</button>
                    </div>
                    <SubmitButton name='Save' />
                </form>
            </div>
            <img src="https://e5b4-2405-201-2026-3800-34a4-1f63-b87b-eb45.ngrok-free.app/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NDEsInB1ciI6ImJsb2JfaWQifX0=--6c0a1cf1509939b04f6602b95af782ada114c385/jose-alejandro-cuffia-k1LNP6dnyAE-unsplash.jpg" alt=""
                className='border border-gray-500 w-full h-full mx-2' />
        </div>
    )
}

export default UserProfile
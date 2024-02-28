import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import SubmitButton from '../Helper Components/SubmitButton';
import InputSettings from '../Helper Components/InputSettings';
import { useOutletContext } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

function UserProfile() {
    const [accessToken, setAccessToken] = useState();
    const [userInfo, fetchUserData] = useOutletContext();
    const [avatarUrl, setAvatarUrl] = useState("");
    const [aadharCardUrl, setAadharCardUrl] = useState("");

    useEffect(() => {
        setAccessToken(localStorage.getItem('access_token'));
    }, [])

    const initialValues = {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        phone: userInfo.mobile_number,
        position: userInfo.role,
        address: userInfo.residential_address,
        avatar: userInfo.avatar_url,
        aadhar_card: userInfo.aadhar_card_url,
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
                    fetchUserData();
                    Swal.fire({
                        title: "Updated!",
                        text: "Your profile is updated.",
                        icon: "success"
                    });
                }).catch((err) => {
                    console.log(err);
                })
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

    return (
        <div className='flex w-full justify-center items-center mt-10'>
            <div className='flex flex-col h-[75vh] w-2/3 border shadow-lg rounded-md bg-[#ecf1e8]'>
                <form className='w-full h-full md:flex md:flex-col md:justify-center md:items-center' onSubmit={handleSubmit} method='post'>
                    <div className=' flex p-2 m-2 items-center'>
                        <label className=' text-lg font-semibold mr-3'>Profile Picture</label>
                        <img src={values.avatar} alt="img"
                            className='object-center rounded-full w-[3rem] h-[3rem] border border-gray-400 mx-2' />
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
        </div>
    )
}

export default UserProfile
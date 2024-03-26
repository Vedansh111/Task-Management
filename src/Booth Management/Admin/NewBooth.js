import React, { useState } from 'react';
import { useFormik } from 'formik';
import Input from '../../Helper Components/Input';
import axios from 'axios';
import SubmitButton from '../../Helper Components/SubmitButton';
import Swal from 'sweetalert2';
import InputSettings from '../../Helper Components/InputSettings';
import * as yup from 'yup';

function NewBooth(props) {
    const initialValues = {
        booth_name: '',
        booth_number: '',
        booth_lat: '',
        booth_lon: '',
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object({
            booth_name: yup.string().required('Name is required'),
            booth_number: yup.string().required('Number is required').min(1).matches(/^[0-9]/),
            booth_lat: yup.string().required('Latitude is required'),
            booth_lon: yup.string().required('Longitude is required'),
        }),
        onSubmit: (values, action) => {
            console.log(values);
            const formData = new FormData();
            formData.append('booth[booth_name]', values.booth_name)
            formData.append('booth[booth_number]', values.booth_number)
            formData.append('booth[booth_lat]', values.booth_lat)
            formData.append('booth[booth_lon]', values.booth_lon)
            axios.post('/api/v1/booths', formData).then((res) => {
                props.function();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Created!!!",
                    text: "New booth is created.",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log("post data", res);
            }).catch((err) => {
                console.log(err);
            })
            action.resetForm();
        },
    });

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center -mt-3 h-full'>
            <Input
                title='Booth Name'
                type='text'
                name='booth_name'
                placeholder='Enter the name of the booth'
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.booth_name}
                touched={touched.booth_name}
                values={values.booth_name}
            />
            <Input
                title='Booth Number'
                type='number'
                name='booth_number'
                placeholder='Enter the booth number'
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.booth_number}
                touched={touched.booth_number}
                values={values.booth_number}
            />
            <div className='flex justify-around'>
                <InputSettings
                    title='Lat'
                    type='number'
                    name='booth_lat'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors.booth_lat}
                    touched={touched.booth_lat}
                    values={values.booth_lat}
                    width='3rem' />
                <InputSettings
                    title='Lon'
                    type='number'
                    name='booth_lon'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors.booth_lon}
                    touched={touched.booth_lon}
                    values={values.booth_lon}
                    width='3rem' />
            </div>
            <SubmitButton name='Add Booth' />
        </form>
    )
}

export default NewBooth
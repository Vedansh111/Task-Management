import React from 'react';
import { useFormik } from 'formik';
import Input from '../../Helper Components/Input';
import axios from 'axios';
import SubmitButton from '../../Helper Components/SubmitButton';
import Swal from 'sweetalert2';
import * as yup from 'yup';

function NewRole(props) {
    const initialValues = {
        role_name: '',
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object({
            role_name: yup.string().required('Name is required'),
        }),
        onSubmit: (values, action) => {
            console.log(values);
            const formData = new FormData();
            formData.append('role[role_name]', values.role_name)
            axios.post('/api/v1/roles', formData).then((res) => {
                props.function();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Created!",
                    text: "New role is created.",
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
                title='Role Name'
                type='text'
                name='role_name'
                placeholder='Enter the name of the role'
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.role_name}
                touched={touched.role_name}
                values={values.role_name}
            />
            <SubmitButton name='Add Role' />
        </form>
    )
}

export default NewRole
import * as yup from 'yup';

export const UserValidations = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
    password: yup.string().required('Password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    phone: yup.string().required('Phone number is required.').matches(/^[0-9]{10}$/, "Invalid phone number"),
    loc: yup.string().min(3),
})
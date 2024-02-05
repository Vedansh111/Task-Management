import React from 'react';
import { useFormik } from 'formik';
import Input from '../Helper Components/Input';
import SubmitButton from '../Helper Components/SubmitButton';
import HoverButton from '../Helper Components/HoverButton';
import { UserValidations } from '../Validations/SignUpValidations'

function SignupPage() {

    const initialValues = {
        name: '',
        email: '',
        password: '',
        phone: '',
        location: '',
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: UserValidations,
        onSubmit: (values, action) => {
            try {
                console.log(values);
            } catch (error) {
                console.log(error);
            }
            action.resetForm();
        },
    });

    return (
        <div className='w-screen h-screen flex font-jetbrains' >

            {/* ⬇ Pencil background */}
            <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=90&w=0540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} className="flex justify-center w-[42%] object-center bg-center">
                <div className='flex flex-col text-center h-[30%] mt-[220px] w-[80%] text-4xl '>
                    <h1 className='mb-2'>Sign up</h1>
                    <h1 className='mt-2'> &</h1>
                    <h1 className='mt-2'> come on in</h1>
                </div>
            </div>

            {/* ⬇ SignUp, Already account? */}
            <div className='w-[58%] flex flex-col items-center bg-[#fdfdfa]'>

                {/* ⬇ Already account? */}
                <div className=' w-[350px] h-[50px] mt-[10px] ml-[32rem] flex justify-center items-center text-center'>
                    <h1>Already have an account?</h1>
                    <HoverButton name='Log In' to='/' />
                </div>

                {/* ⬇ SignUp */}
                <div className=' flex flex-col justify-center items-center w-2/3 h-[35rem] mt-[3rem]'>
                    <h1 className=' text-3xl font-semibold'>TaskNinja</h1>
                    <form onSubmit={handleSubmit} method='post'>
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

export default SignupPage
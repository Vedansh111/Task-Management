import React from 'react';
import SubmitButton from '../Helper Components/SubmitButton';
import Input from '../Helper Components/Input';
import { Link } from 'react-router-dom';

function ForgetPasswordPage() {
    return (
        <div className='h-screen bg-center bg-cover' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1453227588063-bb302b62f50b?q=80&w=1570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            <div className='flex justify-center items-center h-full'>
                <div className='flex flex-col items-center max-w-lg bg-white p-6 rounded-3xl shadow-lg absolute lg:right-[10rem]'>
                    <h1 className='text-3xl font-semibold mt-8 md:text-right'>Forgot Something?</h1>
                    <p className='text-center text-sm text-gray-600 font-light mt-2 md:text-right'>Enter your email below to receive password reset instructions.</p>
                    <div className='mt-4'>
                        <Input
                            name='email'
                            title='Email'
                            type='text'
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='mt-4'>
                        <SubmitButton name='Verify Account' />
                    </div>
                    <p className='mt-2 text-sm'>Remember your password? <Link to='/' className='font-semibold text-gray-700 hover:text-gray-900'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default ForgetPasswordPage;

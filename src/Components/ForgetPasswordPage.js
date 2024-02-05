import React from 'react';
import SubmitButton from '../Helper Components/SubmitButton';
import Input from '../Helper Components/Input';

function ForgetPasswordPage() {
    return (
        <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1453227588063-bb302b62f50b?q=80&w=1570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} className='h-screen bg-center flex justify-center items-center'>
            <div className='flex flex-col items-center w-[27rem] bg-[#fdfdfa] h-[19rem] ml-[43rem] rounded-3xl font-jetbrains'>
                <h1 className=' text-3xl font-semibold mt-[2rem]'>Forgot Something?</h1>
                <p className='text-center text-xs text-gray-600 font-light mt-2'>Enter your email below to receive password reset instructions.</p>
                <div className='mt-1'>
                    <Input
                        name='email'
                        title='Email'
                        type='text'
                        placeholder='Enter your email'
                    />
                </div>
                <div className='mt-1'>
                    <SubmitButton name='Verify Account' />
                </div>
            </div>
        </div>
    )
}

export default ForgetPasswordPage
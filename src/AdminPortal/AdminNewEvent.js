import React from 'react'
import { useFormik } from 'formik';
import Input from '../Helper Components/Input';
import InputSettings from '../Helper Components/InputSettings';
import axios from 'axios';
import UploadButton from '../Helper Components/UploadButton';
import SubmitButton from '../Helper Components/SubmitButton';

function AdminNewEvent() {
    const initialValues = {
        event_name: '',
        event_location: '',
        google_link: '',
        date: '',
        time: '',
        points: '',
        event_poster: '',
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        onSubmit: (values, action) => {
            console.log(values);
            const formData = new FormData();
                formData.append('task[event_name]', values.event_name)
                formData.append('task[event_location]', values.event_location)
                formData.append('task[google_link]', values.google_link)
                formData.append('task[date]', values.date)
                formData.append('task[time]', values.time)
                formData.append('task[points]', values.points)
                formData.append('task[event_poster]', values.event_poster)
                axios.post('/api/v1/tasks', formData).then((res) => {
                    console.log("post data", res);
                }).catch((err) => {
                    console.log(err);
                })
            action.resetForm();
        },
    });
    return (
        <div className='w-[50%] border border-black rounded-tl-[2rem] rounded-bl-[2rem]  h-[37rem]'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <Input
                    title='Event Name'
                    type='text'
                    name='event_name'
                    placeholder='Enter the name of the event'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors.event_name}
                    touched={touched.event_name}
                    values={values.event_name}
                />
                <Input
                    title='Event Location'
                    type='text'
                    name='event_location'
                    placeholder='Enter your the location of the event'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors.event_location}
                    touched={touched.event_location}
                    values={values.event_location}
                />
                <Input
                    title='Google Link'
                    type='text'
                    name='google_link'
                    placeholder='Enter the google link'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors.google_link}
                    touched={touched.google_link}
                    values={values.google_link}
                />
                <Input
                    title='Receive Points'
                    type='text'
                    name='points'
                    placeholder='Enter the points'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors.points}
                    touched={touched.points}
                    values={values.points}
                />
                <div className='flex justify-around'>
                    <InputSettings
                        title='Date'
                        type='date'
                        name='date'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors.date}
                        touched={touched.date}
                        values={values.date}
                        width='9rem' />
                    <InputSettings
                        title='Time'
                        type='time'
                        name='time'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors.time}
                        touched={touched.time}
                        values={values.time}
                        width='9rem' />
                </div>
                <div className=' flex p-2 m-2 items-center'>
                    <label htmlFor='upload' className=' text-lg font-semibold mr-3'>Upload</label>
                    <UploadButton title='Event Poster' />
                </div>
                <SubmitButton name='Add Event' />
            </form>
        </div>
    )
}

export default AdminNewEvent
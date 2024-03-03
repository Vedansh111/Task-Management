import * as yup from 'yup';

export const newEvent = yup.object({
    event_name: yup.string().required('Name is required'),
    event_location: yup.string().required('Location is required'),
    google_link: yup.string().required('Google link is required'),
    date: yup.string().required('Date is required'),
    time: yup.string().required('Time is required'),
    points: yup.string().required('Points are required').matches(/^[0-9]/).max(4),
})
import axios from 'axios'
import React , {createContext} from 'react'
import Swal from 'sweetalert2'

export const UserContext = createContext();

export const handleShow = (age, setTasks) => {
    axios.get(`api/v1/participate_volunteers?request_type=${age}`).then((res) => {
        console.log(res?.data?.participate_volunteer);
        // setTasks(res?.data?.participate_volunteer);
    })
}

export const approveRequest = (val) => {
    axios.put(`api/v1/participate_volunteers/${val}/approved_request`)
        .then((res) => {
            console.log(res);
            if (res.status) {
                handleShow();
            }
            Swal.fire({
                title: "Approved",
                text: "The request has been approved.",
                icon: "success"
            });
        })
}
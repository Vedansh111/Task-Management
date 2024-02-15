import axios from 'axios';
import React, { useEffect} from 'react'
import TdComponent from '../Helper Components/TdComponent';
import ThComponent from '../Helper Components/ThComponent';
import FilterDropDown from '../Helper Components/FilterDropDown';
import UploadButton from '../Helper Components/UploadButton';
import EventsLoader from '../Helper Components/EventsLoader';

function UploadProof() {
    // const [tasks, setTasks] = useState(0);
    const tasks = [1, 2, 3, 4, 5, 6, 7, 9, 8, 10]
    useEffect(() => {
        axios.get('api/v1/tasks').then((res) => {
            console.log(res.data?.tasks);
            // setTasks(res.data?.tasks);
        })
    }, [])

    return (tasks ?
        <div className="w-[80%] rounded-md sm:rounded-lg border shadow-lg mt-8">
            <FilterDropDown items={[
                {
                    name: 'Last Day',
                    no: 10,
                },
                {
                    name: 'Last Week',
                    no: 20,
                },
                {
                    name: 'Last Month',
                    no: 30,
                },
            ]} />
            <div className='h-[70vh] overflow-scroll '>
                <table className="w-full h-full bg-[#ecf1e8] text-lg text-center ">
                    <thead className=" text-gray-700 uppercase bg-[#c6cac3]">
                        <tr>
                            <ThComponent name='Event' />
                            <ThComponent name='Date' />
                            <ThComponent name='Status' />
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((val) => {
                            return (
                                <tr key={val}>
                                    <TdComponent things={val.event_name} />
                                    <TdComponent things={val.date} />
                                    <TdComponent things={<UploadButton title='Upload' />} />
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div> : <EventsLoader />
    )
}

export default UploadProof
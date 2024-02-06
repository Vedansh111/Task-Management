import React from 'react';
import FilterDropDown from '../Helper Components/FilterDropDown';
function Events() {
    return (
        <div className=" w-[83%] h-[35rem] rounded-md sm:rounded-lg shadow-md">
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
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                            Apple MacBook Pro 17"
                        </td>
                        <td className="px-6 py-4">
                            Silver
                        </td>
                        <td className="px-6 py-4">
                            Laptop
                        </td>
                        <td className="px-6 py-4">
                            <button className="font-medium text-blue-600">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Events;

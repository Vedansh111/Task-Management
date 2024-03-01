import React from 'react'

function DropDown(props) {
    return (

        <select onChange={props.handleChange}
            className='border border-gray-400 p-3 mb-3 flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700'>
            {props.items.map((val) => {
                return <option key={val} className='border rounded-sm'>{val}</option>
            })}
        </select>
    )
}

export default DropDown
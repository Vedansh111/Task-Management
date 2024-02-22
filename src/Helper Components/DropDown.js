import React from 'react'

function DropDown(props) {
    return (
        <select onChange={props.handleChange}
            className='border border-gray-500 p-3 mb-3 rounded-md'>
                {props.items.map((val)=>{
                    return <option key={val}>{val}</option>
                })}
        </select>
    )
}

export default DropDown
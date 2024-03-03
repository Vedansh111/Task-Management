import React from 'react'

function Input(props) {
    return (
        <div className='grid py-2 my-1'>
            <label htmlFor={props.name} className='text-base'>{props.title}</label>
            <input type={props.type} name={props.name} placeholder={props.placeholder} autoComplete='off' id={props.name} value={props.values} onChange={props.handleChange} onBlur={props.handleBlur} className='py-1 px-2 rounded-md border border-black w-[20rem]' />
            {props.errors && props.touched ? <p className=' text-xs'>{props.errors}</p> : null}
        </div>
    )
}

export default Input
import React from 'react'

function InputSettings(props) {
    return (
        <div className=' flex p-2 m-2 items-center'>
            <label htmlFor={props.name} className=' text-lg font-semibold mr-3'>{props.title}</label>
            <input type={props.type} name={props.name} placeholder={props.placeholder} autoComplete='off' id={props.name} value={props.values} onChange={props.handleChange} onBlur={props.handleBlur} className={`p-1 px-2 rounded-md border border-black w-[${props.width}]`} />
            {props.errors && props.touched ? <p className=' text-xs mt-0.5'>{props.errors}</p> : null}
        </div>
    )
}

export default InputSettings
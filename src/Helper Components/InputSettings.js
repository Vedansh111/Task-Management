import React from 'react'

function InputSettings(props) {
    return (
        <div className=' flex p-2 m-1 items-center'>
            <label htmlFor={props.name} className=' text-base font-semibold mr-3'>{props.title}</label>
            <div className='flex flex-col '>
                <input type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    autoComplete='off'
                    id={props.name}
                    value={props.values}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={`py-1 px-2 rounded-md border border-black w-[${props.width}]`} />
                {props.errors && props.touched ? <p className=' text-xs'>{props.errors}</p> : null}
            </div>
        </div>
    )
}

export default InputSettings
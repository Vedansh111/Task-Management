import React from 'react'

function InputSettings(props) {
    return (
        <div className=' flex p-2 m-1 items-center md:w-[96%] sm:w-[96%]'>
            <label htmlFor={props.name} className='text-wrap text-center text-base font-medium w-[4.3rem]'>{props.title}</label>
            <div className='flex flex-col '>
                <input type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    autoComplete='off'
                    id={props.name}
                    value={props.values ? props.values : ""}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={`ml-2 text-wrap py-1 px-2 rounded-md border w-full border-black w-[${props.width}]`} />
                {props.errors && props.touched ? <p className=' text-xs'>{props.errors}</p> : null}
            </div>
        </div>
    )
}

export default InputSettings
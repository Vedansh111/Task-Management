import React from 'react'

function ThComponent(props) {
    return (
        <th scope="col" className="text-lg px-4 py-3">
            {props.name}
        </th>
    )
}

export default ThComponent
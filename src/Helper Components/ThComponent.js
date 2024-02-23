import React from 'react'

function ThComponent(props) {
    return (
        <th scope="col" className="text-lg px-3 py-4">
            {props.name}
        </th>
    )
}

export default ThComponent
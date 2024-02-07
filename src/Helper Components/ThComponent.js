import React from 'react'

function ThComponent(props) {
    return (
        <th scope="col" className="px-4 py-3">
            {props.name}
        </th>
    )
}

export default ThComponent
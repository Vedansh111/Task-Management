import React from 'react';

function TdComponent(props) {
    return (
        <td className="px-4 py-4 text-lg font-semibold whitespace-nowrap">
            {props.things}
        </td>
    )
}

export default TdComponent
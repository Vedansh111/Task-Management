import React from 'react';

function TdComponent(props) {
    return (
        <td className="w-[0.5rem] text-wrap px-3 py-4 text-lg font-semibold whitespace-nowrap">
            {props.things}
        </td>
    )
}

export default TdComponent;
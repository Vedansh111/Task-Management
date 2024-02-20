import React from 'react';

function TdComponent(props) {
    return (
        <td className="w-[2rem] text-wrap px-4 py-4 text-lg font-semibold whitespace-nowrap">
            {props.things}
        </td>
    )
}

export default TdComponent;
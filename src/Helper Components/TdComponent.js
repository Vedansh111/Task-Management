import React from 'react';

function TdComponent(props) {
    return (
        <td className=" w-[8rem] px-4 py-4 text-lg font-semibold whitespace-nowrap break-all">
            {props.things}
        </td>
    )
}

export default TdComponent;
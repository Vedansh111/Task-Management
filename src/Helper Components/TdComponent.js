import React from 'react';

function TdComponent(props) {
    return (
        <div className='text-gray-600 text-sm font-medium ml-2 truncate'>
            {props.things}
        </div>
    )
}

export default TdComponent;
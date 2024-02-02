import React from 'react'

function HoverButton(props) {
  return (
    <button className='ml-2 p-1 rounded-md border border-black hover:bg-black hover:text-white text-lg'>{props.name}</button>
  )
}

export default HoverButton
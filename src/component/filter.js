import React from 'react'
import img from './img.jpg'
const Filter = ({name,value,handleClick}) => {
  return (
    <div className='filter_div' onClick={()=>{handleClick(name)}}>
        <img src={img} style={{filter:name === 'default' ? 'none': `${name}(${value})`}} alt="" />
        <span>{name}</span>
    </div>
  )
}

export default Filter   
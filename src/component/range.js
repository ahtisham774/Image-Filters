import React from 'react'

const Range = ({css,range,name,min,max,step,value,handleChange}) => {
  return (
    <div className={`range_div ${range}`}>
         <span>{name}</span>
        <div className='range'>
            <input type="range"  step={step} min={min} max={max} className={` ${css}`} name="radius" value={value} id="" onChange={(e)=>{handleChange(e.target.value)}} />
            <span>{value}</span>
        </div>
       
    </div>
  )
}

export default Range
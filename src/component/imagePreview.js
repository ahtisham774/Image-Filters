import React,{useState,useEffect,useReducer} from 'react'
import {MdArrowBack} from 'react-icons/md'
import {Link,useParams} from 'react-router-dom'
import Filter from './filter'
import Range from './range'

const ImagePreview = () => {
    const {name} = useParams()

    const [isActive,setIsActive] = useState(false)
    const [filter,setFilter] = useState('default')
    const [br,setBr] = useState(1)
    const [con,setCon] = useState(1)
    const [sep,setSep] = useState(0)
    const [blur,setBlur] = useState(0)
    const [sat,setSat] = useState(1)
    const [hue,setHue] = useState(0)
    const [inv,setInv] = useState(0)
    const [gr,setGr] = useState(0)
    const [op,setOp] = useState(100)
    const [url,setUrl] = useState('')
    const [radius,setRadius] = useState(0)
    const [sign,setSign] = useState('')
    const [value,setValue] = useState(0)


    const fun = {n:'default',v:0,min:0,max:0,step:0}
    const reducer = (state,action) =>{
        switch(action.type){
            case 'blur':
                return {n:'blur',v:blur,min:0,max:20,step:1}
            case 'sat':
                return {n:'saturate',v:sat,min:0,max:100,step:1}
            case 'op':
                return {n:'opacity',v:op,min:0,max:100,step:1}
            case 'con':
                return {n:'contrast',v:con,min:0,max:5,step:0.1}
            case 'sep':
                return {n:'sepia',v:sep,min:0,max:100,step:1}
            case 'br':
                return {n:'brightness',v:br,min:0,max:5,step:0.1}
            case 'hue':
                return {n:'hue-rotate',v:hue,min:0,max:360,step:1}
            case 'gr':
                return {n:'grayscale',v:gr,min:0,max:100,step:1}
            case 'inv':
                return {n:'invert',v:inv,min:0,max:100,step:1}
            default:
                return {n:'default',v:-1}    
        }
         
    }
    const [state,dispatch] = useReducer(reducer,fun)
    useEffect(()=>{
        setUrl(JSON.parse(localStorage.getItem('url')))
        
    },[])
   const handleChange = () =>{
    setIsActive(!isActive)
   }

  return (
 
    name === localStorage.getItem('name') ?

    <div className='preview_div'>
    
        <div className='header'>
         <Link to='/' style={{width:'50px',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'50%',background:'#fff'}}><MdArrowBack size='10vw' color='#000'/> </Link>
         <input type="checkbox" value={'checked'} checked={isActive} onChange={handleChange} />
        </div>
        <div className='preview'>
            <div className="image_preview">
                 <img draggable='true' src={url} style={{borderRadius:`${radius}px`,filter:isActive ? filter ==='default'? 'none':`${filter}(${value}${sign})`: `brightness(${br}) grayscale(${gr}%) sepia(${sep}%) saturate(${sat}) hue-rotate(${hue}deg) invert(${inv}%) opacity(${op}%) contrast(${con}) blur(${blur}px)`}} alt="" />
                 
            </div>
            {
                isActive ? 
            <>
            <div className='rgb'>
                <Range name='radius' value={radius} min={0} max={300} css='filter wid' range={'rgb_width'} handleChange={setRadius} />
                <Range name={state.n} range='rgb_width' css='blue wid'  min={state.min} max={state.max} step={state.step} value={value} handleChange={setValue} />
            </div>
            <div className='filters'>
                <Filter name='sepia'      value='100%'  handleClick={()=> {dispatch({type:'sep'});setFilter('sepia');setSign('%')}} />  
                <Filter name='invert'     value='100%'  handleClick={()=> {dispatch({type:'inv'});setFilter('invert');setSign('%')}} />    
                <Filter name='grayscale'  value='100%'  handleClick={()=> {dispatch({type:'gr'});setFilter('grayscale');setSign('%')}}  />  
                <Filter name='hue-rotate' value='360deg'  handleClick={()=> {dispatch({type:'hue'});setFilter('hue-rotate');setSign('deg')}} />  
                <Filter name='brightness' value='5'  handleClick={()=> {dispatch({type:'br'});setFilter('brightness');setSign('')}} />  
                <Filter name='contrast'   value='5'  handleClick={()=> {dispatch({type:'con'});setFilter('contrast');setSign('')}} />  
                <Filter name='blur'       value='2px'  handleClick={()=> {dispatch({type:'blur'});setFilter('blur');setSign('px')}} />  
                <Filter name='saturate'   value='5'  handleClick={()=> {dispatch({type:'sat'});setFilter('saturate');setSign('')}} />  
                <Filter name='opacity'    value='30%'  handleClick={()=> {dispatch({type:'op'});setFilter('opacity');setSign('%')}} />  
                <Filter name='default' handleClick={()=> {dispatch({type:'default'});setFilter('default')}} /> 
            </div>
            </>
            :
            <div className='range_filters'>
                <div className='range_preview'>
                     <Range css='filter width' range={'range_width'} name='radius' min={0} max={300} value={radius} handleChange={setRadius} /> 
                     <Range css='blue width'   range={'range_width'} name='brightness' step={0.1} min={0} max={5} value={br} handleChange={setBr} />   
                     <Range css='blue width'   range={'range_width'} name='contrast' min={0} step={0.1} max={5} value={con} handleChange={setCon} />   
                     <Range css='blue width'   range={'range_width'} name='sepia' min={0} max={100} value={sep} handleChange={setSep} />   
                     <Range css='blue width'   range={'range_width'} name='grayscale' min={0} max={100} value={gr} handleChange={setGr} />   
                     <Range css='blue width'   range={'range_width'} name='invert' min={0} max={100} value={inv} handleChange={setInv} />   
                     <Range css='blue width'   range={'range_width'} name='hue-rotate' min={0} max={360} value={hue} handleChange={setHue} />   
                     <Range css='blue width'   range={'range_width'} name='opacity' min={0} max={100} value={op} handleChange={setOp} />   
                     <Range css='blue width'   range={'range_width'} name='blur' min={0} max={20} value={blur} handleChange={setBlur} />   
                     <Range css='blue width'   range={'range_width'} name='saturate'  step={0.1} min={0} max={5} value={sat} handleChange={setSat} />   
                </div>
            </div>
        }
        </div>
      </div>
    : <h2>Not Found</h2>
  )
}

export default ImagePreview
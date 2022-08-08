import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FiSearch} from 'react-icons/fi'
import {MdClose} from 'react-icons/md'

const Dragndrop = ({handleSource}) => {
    const nav = useNavigate(null)

    const [active,setActive] = useState(false)
    const [url,setUrl] = useState('')
    const [isShow,setIsShow] = useState(false)
    const [imageUrl,setImageUrl] = useState('')
    const [name,setName] = useState('')
   

    const reader = (link,name) =>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(link)
        fileReader.onload = ()=>{   
            localStorage.setItem('url',JSON.stringify(fileReader.result))
            localStorage.setItem('name',name)
            setImageUrl(JSON.parse(localStorage.getItem('url')))
            setName(localStorage.getItem('name'))
         
            
        }
    }

    const dragNdrop = (e) =>{
        reader(e.target.files[0],e.target.files[0].name)
        setIsShow(true)
    }

    
    const checkUrl = () =>{
        if(url.match(/^https?:\/\/.+\/.+$/)){
            localStorage.setItem('url',JSON.stringify(url))
            localStorage.setItem('name','image')
            setImageUrl(JSON.parse(localStorage.getItem('url')))
            setName(localStorage.getItem('name'))
            setIsShow(true)
        }
    }
    const drag = () =>{
        
        setActive(true)
    }
    const drop = () =>{
        setActive(false)
    }
  return (
    <div className='container'>
        <div  className='uploadOuter'>

                <span className={active ? 'dragBox draging':'dragBox' }>
                    <span className='choose'> Choose an image  </span> <span> &nbsp;  or Drag it here</span> 
                    <input  type='file' name='file' id='uploadFile'  accept="image/*" onChange={(e)=>dragNdrop(e)} onDragOver={drag} onDrop={drop} />
                </span>
                <div className='url'>
                    <input type="text" name="url" value={url} onChange={(e)=>{setUrl(e.target.value)}} placeholder='  https://' />
                    <div className='search'><FiSearch color='#6c7a89' onClick={checkUrl}/></div>
                </div>
		</div>
        <div className='show_image' style={{display:isShow ? 'flex':'none'}}>
            <div className='image'><div><img src={imageUrl} alt="" onClick={()=>nav(`/preview/${name}`)} /></div></div>
            <div className='cross' ><MdClose onClick={()=>setIsShow(false)}/></div>
        </div>
    </div>
  )
}

export default Dragndrop
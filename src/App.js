
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Dragndrop from './component/dragndrop';
import ImagePreview from './component/imagePreview';
import {useState} from 'react'
function App() {
    const [src,setSrc] = useState(null)
  return (
    <BrowserRouter>
     <Routes>
         <Route index path='/' element={<Dragndrop handleSource={setSrc}/>}/>
         <Route exact path='/preview/:name' element={<ImagePreview src={src}/>}/>
         <Route path='/*' element={<h2>Not found</h2>}/>
     </Routes>

    </BrowserRouter>
    
  );
}

export default App;

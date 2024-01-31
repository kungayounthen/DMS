import{ useRef, useState } from 'react'
import './practice.css'
function Practice() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [number, setNumber] = useState('');
    const [playList, setPlayList] = useState('');
    const [image, setImage] = useState(null);
    const formRef=useRef();
    const [value,setValue]=useState();
    const submitForm = async () => {
      const formData = new FormData(formRef.current);
      console.log(typeof(formData))
        setValue(formData);
      try {
        const response = await fetch('https://dms-lq4d.onrender.com/create_demo', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('Upload successful');
          console.log('formdata:',formData);

          // Handle successful response
        } else {
          console.error('Upload failed');
          // Handle failed response
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle network errors
      }
    };
    const showData=()=>{
        const entries = value.entries();
    for (let entry of entries) {
        console.log(entry);
    }
    }
    return (
        <div className='mt-20'>
        <h2>File Upload Form</h2>
        <form ref={formRef}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} name='name' onChange={(e) => setName(e.target.value)} required />
          <br />
  
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" value={category} name='category' onChange={(e) => setCategory(e.target.value)} required />
          <br />
  
          <label htmlFor="number">Number:</label>
          <input type="text" id="number" value={number} name='number' onChange={(e) => setNumber(e.target.value)} required />
          <br />
  
          <label htmlFor="playList">PlayList:</label>
          <input type="text" id="playList" value={playList} name='playlist' onChange={(e) => setPlayList(e.target.value)} required />
          <br />
  
          <label htmlFor="image">Upload Image:</label>
          <input type="file" id="image"  multiple onChange={(e) => setImage(e.target.files[0])} name='image'/>
          <br />
  
          <button type="button" onClick={submitForm} className='bg-black'>Submit</button>
          <button type='button' onClick={showData} className='bg-black'>show data</button>
        </form>
      </div>
    );
  }

export default Practice
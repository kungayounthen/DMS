import { Box, Button, Toolbar } from "@mui/material"
import { useContext, useRef, useState } from "react"
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { FileContext } from "../../context/fileContext";

function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState();
  const fileInputRef = useRef();
  const[name,setName]=useState('');
  const[number,setNumber]=useState('');
  const[category,setCategory]=useState('');
  const{saveFile,setSaveFile}=useContext(FileContext);
  const selectFiles = () => {
    fileInputRef.current.click();
  }
  const onFileDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    console.log(event.dataTransfer.files)
    let validExtensions = ['image/jpg', 'image/png', 'video/mp4','application/pdf'];
    let data=event.dataTransfer.files;
  for (let i = 0; i < data.length; i++) {
    if (!validExtensions.includes(data[i].type)) {
      alert(`This file is not supported: ${data[i].name}`);
      return;
    }
  }
    setFile(data);

  }

const handleDragOver = (event) => {
  event.preventDefault();
  setIsDragging(true);
  }

const handleDragOut = (event) => {
  event.preventDefault();
  setIsDragging(false);
}

const handleUpload=()=>{
  let validExtensions = ['image/jpg', 'image/png', 'video/mp4','application/pdf'];
  if(!category || !number || !name || !file)
  {
  alert('please  fill all fields');
  return;
  }
  console.log('file',file)
  for (let i = 0; i < file.length; i++) {
    if (validExtensions.includes(file[i].type)) {
      setSaveFile(( prevFiles ) => [...prevFiles, 
        { 
          name: name,
          type:file[i].type,
          size:file[i].size,
          category:category,
          docNo:number,
          date:file[i].lastModifiedDate,
          url:URL.createObjectURL(file[i]),
         },]);
    }
    else {
      alert(`This file is not supported: ${file[i].name}`);
      continue;
    }
  }
  setFile([]);
  alert('uploaded!!!!!!!')
  console.log(saveFile);
}

const handleBrowse=(event)=>{
  setFile(event.target.files);
}
return (
  <Box component='main' className="flex flex-1">
    <Toolbar />
    <Box className='self-center w-3/5 transparent mx-auto container py-4 px-8 rounded-md shadow-lg shadow-slate-500'>
      <h3 className="underline text-center text-purple-500  text-xl font-semibold" style={{fontFamily:'Lato'}}>Upload your document</h3>
      <Box className='flex flex-1 justify-around gap-3 mt-5'>

        <Box className='flex flex-col flex-1'>
          <label htmlFor="category">Document category*</label>
          <select id="category" value={category} className="h-12 rounded-md px-4" onChange={(event)=>setCategory(event.target.value)}>
            <option value='' selected>category</option>
            <option value='science'>Science</option>
            <option value='history'>History</option>
            <option value='technology'>Technology</option>
            <option value='software'>Software</option>
            <option value='politics'>Politics</option>
          </select>
        </Box>

        <Box className='flex flex-col flex-1'>
          <label htmlFor="name">Document name*</label>
          <input type="text" id="name" value={name} className="h-12 rounded-md pl-4" onChange={event=>setName(event.target.value)}/>
        </Box>
      </Box>

      <Box className='flex flex-1 justify-around gap-3 mt-5'>

        <Box className='flex flex-col flex-1'>
          <label htmlFor="no">Document no*</label>
          <input type="number" id="no" value={number} className="h-12 rounded-md pl-4" onChange={event=>setNumber(event.target.value)}/>
        </Box>

        <Box className='flex flex-col flex-1'>
          <label htmlFor="date">Upload date*</label>
          <input type="date" id="date" className="h-12 rounded-md pl-4" />
        </Box>
      </Box>
      <div className={`w-full bg-white mt-5 rounded-md border-2  py-3 ${isDragging ? 'active:border-solid border-lime-300' : 'border-dashed border-slate-400'}`} onDragOver={handleDragOver} onDrop={onFileDrop} onDragLeave={handleDragOut} onDrag>
        <Box className='flex flex-col justify-center items-center'>
          <CloudUploadRoundedIcon sx={{ width: '30%', height: '30%' }} color="primary" />
          <Box>
            {!isDragging ?
              <Box>
                <span className="capitalize">Drag & drop documents or {''}</span>
                <span className="font-semibold text-purple-500 hover:cursor-pointer underline underline-offset-2 capitalize" onClick={selectFiles}>browse</span>
              </Box> :
              <span className="capitalize text-center">Release the document</span>
            }
            <span className="block text-center text-sm text-slate-400">Supports:JPG,MP-3,MP-4 files</span>
            <input type="file" ref={fileInputRef} name="fileInput" multiple className="hidden" onChange={handleBrowse}/>
          </Box>
          </Box>
          </div>
          <Button variant="contained" sx={{marginTop:3,backgroundColor:'black'}} className="w-full" onClick={handleUpload}>Upload</Button>
    </Box>
  </Box>
)
}

export default UploadPage;
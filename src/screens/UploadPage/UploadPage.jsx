import { Box, Button, Toolbar } from "@mui/material"
import { useContext, useRef, useState } from "react"
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { FileContext } from "../../context/fileContext";
import { CreadentialsContext } from "../../context/credential";

function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState();
  const fileInputRef = useRef();
  const [docName, setDocName] = useState('');
  const [number, setNumber] = useState('');
  const [category, setCategory] = useState('');
  const [isDroppedFile, setIsDroppedFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { name } = useContext(CreadentialsContext);
  const formRef = useRef();

  const selectFiles = () => {
    fileInputRef.current.click();
  }
  const onFileDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    console.log(event.dataTransfer.files)
    let validExtensions = ['image/jpg', 'image/png', 'video/mp4', 'application/pdf'];
    let data = event.dataTransfer.files[0];
    for (let i = 0; i < data.length; i++) {
      if (!validExtensions.includes(data[i].type)) {
        alert(`This file is not supported: ${data[i].name}`);
        return;
      }
    }
    setIsDroppedFile(true);
    console.log(event.dataTransfer.files[0]);
    setFile(event.dataTransfer.files[0]);

  }

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  }

  const handleDragOut = (event) => {
    event.preventDefault();
    setIsDragging(false);
  }

  const handleUpload = async () => {
    setIsLoading(true);
    let validExtensions = ['image/jpg', 'image/png', 'video/mp4', 'application/pdf'];
    if (!category || !number || !name || !file) {
      alert('please  fill all fields');
      setIsLoading(false);
      return;
    }

    const formdata = new FormData(formRef.current);
    formdata.append('Category', category);
    formdata.append('user_name', name);
    { isDroppedFile && formdata.append('image', file) }
    console.log('file', file)
    // for (let i = 0; i < file.length; i++) {
    //   if (validExtensions.includes(file[i].type)) {
    //     setSaveFile((prevFiles) => [...prevFiles,
    //     {
    //       name: name,
    //       type: file[i].type,
    //       size: file[i].size,
    //       category: category,
    //       docNo: number,
    //       date: file[i].lastModifiedDate,
    //       url: URL.createObjectURL(file[i]),
    //     },]);
    //   }
    //   else {
    //     alert(`This file is not supported: ${file[i].name}`);
    //     continue;
    //   }
    // }
    console.log('file type', file.type);
    if (validExtensions.includes(file.type)) {
      formdata.append('Type', file.type.split('/')[1])
      await fetch('https://dms-lq4d.onrender.com/create_demo', {
        method: 'POST',
        body: formdata,
      }
      ).then(res => { console.log('successful', res); res.json(); setIsLoading(false); })
        .then(res => console.log('response', res))
        .catch(e => { console.log(e) })
    }
    else {
      alert('File Type not supported');
    }
    setFile([]);
    if (isDroppedFile) {
      setIsDroppedFile(false);
    }

    alert('uploaded!!!!!!!')
  }

  const handleBrowse = (event) => {
    console.log(event.target.files[0])
    setFile(event.target.files[0]);
  }

  const fileCheck = () => {
    console.log('File:', file);
  }
  return (
    <Box component='main' className="flex flex-1">
      <Toolbar />
      <Box className='self-center w-3/5 transparent mx-auto container py-4 px-8 rounded-md shadow-lg shadow-slate-500'>
        <h3 className="underline text-center text-purple-500  text-xl font-semibold" style={{ fontFamily: 'Lato' }}>Upload your document</h3>
        <form ref={formRef}>
          <Box className='flex flex-1 justify-around gap-3 mt-5'>

            <Box className='flex flex-col flex-1'>
              <label htmlFor="category">Document category*</label>
              <select id="category" value={category} className="h-12 rounded-md px-4" onChange={(event) => setCategory(event.target.value)}>
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
              <input type="text" id="name" name='name' value={docName} className="h-12 rounded-md pl-4" onChange={event => setDocName(event.target.value)} />
            </Box>
          </Box>

          <Box className='flex flex-1 justify-around gap-3 mt-5'>

            <Box className='flex flex-col flex-1'>
              <label htmlFor="no">Document no*</label>
              <input type="number" id="no" name='Number' value={number} className="h-12 rounded-md pl-4" onChange={event => setNumber(event.target.value)} />
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
                <input type="file" ref={fileInputRef} name="image" multiple className="hidden" onChange={handleBrowse} />
              </Box>
            </Box>
          </div>
          <Button variant="contained" sx={{ marginTop: 3, backgroundColor: 'black' }} className="w-full" onClick={handleUpload}>{isLoading ? <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg> : <p>Upload</p>}</Button>
        </form>
      </Box>
    </Box>
  )
}

export default UploadPage;
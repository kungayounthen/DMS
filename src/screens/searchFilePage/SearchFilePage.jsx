import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FileContext } from '../../context/fileContext';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideocamIcon from '@mui/icons-material/Videocam';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { CreadentialsContext } from '../../context/credential';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const selectIcon = (icon) => {
    switch (icon) {
        case 'image/jpg':
        case 'image/png': return <InsertPhotoIcon/>
        case 'video/mp4': return <VideocamIcon />
        case 'application/pdf': return <PictureAsPdfIcon/>
    }
}
function SearchFilePage() {
    const navigate=useNavigate();
    const [category, setCategory] = useState('');
    const[docType,setDocType]=useState('');
    const { saveFile } = useContext(FileContext);
    const{name}=useContext(CreadentialsContext);
    const[row,setRow]=useState([]);
    useEffect(()=>{
    getData();
    },[])
    const getData=async()=>{
    try{
    const dataResponse=await fetch('https://dms-lq4d.onrender.com/view_demo');
    const data=await dataResponse.json();
    setRow(data.data);
    console.log('Row',row);
    }catch(e){
    alert('something went wrong');
    }
    }
    
    const columns = ['Type', 'Doc. Name', 'Doc. No.', 'Upload Date','Owner'];
    const rows = saveFile;
    return (
        <Box className='flex flex-1'>
            <Box className='w-[90%] mx-auto h-[80%] self-center pb-2'>
                <Box className='flex gap-4 '>
                    <Box >
                        <select id="category" value={category} className="h-12 rounded-md px-4" onChange={(event) => setCategory(event.target.value)}>
                            <option value='' selected>category</option>
                            <option value='science'>Science</option>
                            <option value='history'>History</option>
                            <option value='technology'>Technology</option>
                            <option value='software'>Software</option>
                            <option value='politics'>Politics</option>
                        </select>
                    </Box>
                    <Box >
                        <select id="doc.type" value={docType} className="h-12 rounded-md px-4" onChange={(event) => setDocType(event.target.value)}>
                            <option value='' selected className='capitalize'>Doc. type</option>
                            <option value='pdf'>Pdf</option>
                            <option value='jpg'>jpg</option>
                            <option value='png'>png</option>
                            <option value='mp4'>mp4</option>
                            <option value='mp3'>mp3</option>
                        </select>
                    </Box>
                    <Box >
                        <Search className='h-12'>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                className='h-12'
                            />
                        </Search>
                    </Box>
                    <Button  onClick={()=>{navigate('/letsgo')}} variant="contained">Add File</Button>
                </Box>
                    <TableContainer  className='mt-5 rounded-md h-full bg-white  overflow-y-scroll'>
                        <Table stickyHeader aria-label="sticky table" className={rows.length > 0 ? 'h-auto' : 'h-full' }>
                            <TableHead >
                                <TableRow>
                                    {columns.map((item, i) => (
                                        <TableCell key={i} className='border border-white px-auto' align='center'>{item}</TableCell>
                                    ))}
                                </TableRow>
                                </TableHead>
                                <TableBody className='h-full w-full'> 

                                {row && row.length>0 && row.map((item, i) => (
                                    <TableRow key={i} sx={{display:'table-row',height:'50px',boxSizing:'border-box'}} className='box-border h-10'>
                                    <TableCell align='center'>
                                    {/*<Box className='flex flex-col justify-center items-center'>{selectIcon(item.type)} <p>{item.type.split('/')[1]}</p></Box>*/}
                                    {item.type}
                                    </TableCell>
                                        <TableCell align='center'>{item.name}</TableCell>
                                        <TableCell align='center'>{'#'+item.number}</TableCell>
                                        {/*<TableCell align='center'>{item.date.toLocaleDateString()}</TableCell>*/}
                                        <TableCell align='center'>{name}</TableCell>
                                        <TableCell align='center'>{name}</TableCell>
                                        </TableRow>
                                        ))}
                                        {(row.length === 0 || !row) && <TableRow className='w-full h-full' sx={{border:'none'}}>
                                            <TableCell colSpan={columns.length}>
                                                <p className='text-center'>No rows</p>
                                            </TableCell>
                                        </TableRow>}
                                        </TableBody>
                        </Table>
                    </TableContainer>
            </Box>
        </Box>
    )
}

export default SearchFilePage
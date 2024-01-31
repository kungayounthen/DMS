import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material'
import { useContext, useState } from 'react'
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FileContext } from '../../context/fileContext';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideocamIcon from '@mui/icons-material/Videocam';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { CreadentialsContext } from '../../context/credential';

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
    const [category, setCategory] = useState('');
    const[docType,setDocType]=useState('');
    const { saveFile } = useContext(FileContext);
    const{name}=useContext(CreadentialsContext);
    const columns = ['Type', 'Doc. Name', 'Doc. No.', 'Upload Date','Owner'];
    const rows = saveFile;
    console.log(rows.length);
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
                                {rows.length>0 && rows.map((item, i) => (
                                    <TableRow key={i} sx={{display:'table-row',height:'50px',boxSizing:'border-box'}} className='box-border h-10'>
                                    <TableCell className='w-10'>
                                    <Box className='flex flex-col justify-center items-center'>{selectIcon(item.type)} <p>{item.type.split('/')[1]}</p></Box>
                                    </TableCell>
                                        <TableCell align='center'>{item.name}</TableCell>
                                        <TableCell align='center'>{'#'+item.docNo}</TableCell>
                                        <TableCell align='center'>{item.date.toLocaleDateString()}</TableCell>
                                        <TableCell align='center'>{name}</TableCell>
                                        </TableRow>
                                        ))}
                                        {rows.length === 0 && <TableRow className='w-full h-full' sx={{border:'none'}}>
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
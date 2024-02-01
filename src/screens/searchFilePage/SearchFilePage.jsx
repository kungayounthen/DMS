import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import { FileContext } from '../../context/fileContext';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideocamIcon from '@mui/icons-material/Videocam';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { CreadentialsContext } from '../../context/credential';
import { useNavigate } from 'react-router-dom';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

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
        case 'jpg':
        case 'png': return <InsertPhotoIcon />
        case 'mp4': return <VideocamIcon />
        case 'pdf': return <PictureAsPdfIcon />
        default: return <QuestionMarkIcon />
    }
}
function SearchFilePage() {
    // const navigate=useNavigate();
    const [category, setCategory] = useState('');
    const [docType, setDocType] = useState('');
    // const { saveFile } = useContext(FileContext);
    // const{name}=useContext(CreadentialsContext);
    const [row, setRow] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm,setSearchTerm]=useState('');

    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        try {
            setIsLoading(true);
            const dataResponse = await fetch('https://dms-lq4d.onrender.com/view_demo');
            const data = await dataResponse.json();
            setRow(data.data);
            console.log('Row', row);
            if (row.length === 0) {
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
        } catch (e) {
            alert('something went wrong');
            setIsLoading(false);
        }
    }

    const columns = ['Type', 'Doc. Name', 'Doc. No.', 'Upload Date', 'Owner'];

    const handleCategoryFilter = async (event) => {
        setIsLoading(true);
        if (event.target.value === '') {
            setCategory(event.target.value);
            getData();
            return;
        }
        if(event.target.value===category)
        {
        return;
        }
        try {
            setCategory(event.target.value);
            const res = await fetch(`http://13.233.238.2:4000/view_demo?category=${event.target.value}`);
            const filteredData = await res.json();
            setRow(filteredData.data);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }
    // const rows = saveFile;

    // const handleSearch = (event) => {
    //     const searchTerm = event.target.value;
    //     setSearchTerm(searchTerm);
        
    //     const tempRow=row;
        
    //     const searchFilter = tempRow.filter((item) => {
    //       return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    //     });
      
        
    //     setRow(searchFilter);
    //   };
    return (
        <Box className='flex flex-1'>
            <Box className='w-[90%] mx-auto h-[80%] self-center pb-2'>
                <Box className='flex gap-4 '>
                    <Box >
                        <select id="category" value={category} className="h-12 rounded-md px-4" onChange={handleCategoryFilter}>
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
                <TableContainer className='mt-5 rounded-md h-full bg-white  overflow-y-scroll'>
                    <Table stickyHeader aria-label="sticky table" className={row.length && !isLoading > 0 ? 'h-auto' : 'h-full'}>
                        <TableHead className='bg-black' >
                            <TableRow>
                                {columns.map((item, i) => (
                                    <TableCell key={i} className='border border-white px-auto text-white bg-black' sx={{ backgroundColor: 'black', color: 'white', border: 'none' }} align='center'>{item}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody className='h-full w-full'>

                            {row && row.length > 0 && !isLoading && row.map((item, i) => (
                                <TableRow key={i} sx={{ display: 'table-row', height: '50px', boxSizing: 'border-box' }} className='box-border h-10'>
                                    <TableCell align='center'>
                                        <Box className='flex flex-col justify-center items-center'>{selectIcon(item.type)} <p>{item.type}</p></Box>
                                    </TableCell>
                                    <TableCell align='center'>{item.name}</TableCell>
                                    <TableCell align='center'>{'#' + item.number}</TableCell>
                                    {/*<TableCell align='center'>{item.date.toLocaleDateString()}</TableCell>*/}
                                    <TableCell align='center'>{item.created_at.split('T')[0]}</TableCell>
                                    <TableCell align='center'>{item.user_name}</TableCell>
                                </TableRow>
                            ))}
                            {(row.length === 0 || !row) && <TableRow className='w-full h-full' sx={{ border: 'none' }}>
                                <TableCell colSpan={columns.length}>
                                    <p className='text-center'>No rows</p>
                                </TableCell>
                            </TableRow>}
                            {isLoading && <TableRow className='w-full h-full' sx={{ border: 'none' }}>
                                <TableCell colSpan={columns.length} className='bg-slate-200'>
                                    <Box  className='flex flex-col items-center justify-center h-full'>
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default SearchFilePage
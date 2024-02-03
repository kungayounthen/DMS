import { Outlet, useNavigate } from "react-router-dom";
import './sideDrawer.styles.css';
import { Box, Button, Divider } from "@mui/material";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import TuneIcon from '@mui/icons-material/Tune';
import KeyIcon from '@mui/icons-material/Key';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { useState } from "react";


function SideDrawer() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('upload');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <Box className="flex  uploadContainer ">
        <Box className="flex flex-col h-[95%] w-1/5 transparent ml-5 my-auto rounded-md p-3 border shadow-lg shadow-slate-500" component='main'>
          <h3 className="text-center capitalize font-bold text-lg my-5 text-purple-500" style={{ fontFamily: 'Lato' }}>Document <br /> management</h3>
          <Divider className="w-full self-center" />
          <Box className="grid gap-3 my-5 ml-4">
            <Box className={`flex items-center content-center gap-2 hover:bg-slate-300 hover:cursor-pointer active:bg-slate-400 rounded-md p-3 ${activeButton === 'upload' ? 'bg-slate-300' : ''}`} onClick={() => { handleButtonClick('upload'); navigate('/upload') }}>
              <UploadFileRoundedIcon />
              <h3 className="capitalize ">upload document</h3>
            </Box>
            <Box className={`flex items-center content-center gap-2 hover:bg-slate-300 hover:cursor-pointer active:bg-slate-400 rounded-md p-3 ${activeButton === 'search' ? 'bg-slate-300' : ''}`} onClick={() => { handleButtonClick('search'); navigate('search') }}>
              <SearchIcon />
              <h3 className="capitalize">Search document</h3>
            </Box>
            <Box className={`flex items-center content-center gap-2 hover:bg-slate-300 hover:cursor-pointer active:bg-slate-400 rounded-md p-3 ${activeButton === 'playlist' ? 'bg-slate-300' : ''}`} onClick={() => { handleButtonClick('playlist'); navigate('empty') }}>
              <PlaylistPlayIcon />
              <h3 className="capitalize">View Playlist</h3>
            </Box>
            <Box className={`flex items-center content-center gap-2 hover:bg-slate-300 hover:cursor-pointer active:bg-slate-400 rounded-md p-3 ${activeButton === 'version' ? 'bg-slate-300' : ''}`} onClick={() => { handleButtonClick('version'); navigate('empty') }}>
              <TuneIcon />
              <h3 className="capitalize">Doc Version Control</h3>
            </Box>
            <Box className={`flex items-center content-center gap-2 hover:bg-slate-300 hover:cursor-pointer active:bg-slate-400 rounded-md p-3 ${activeButton === 'access' ? 'bg-slate-300' : ''}`} onClick={() => { handleButtonClick('access'); navigate('empty') }}>
              <KeyIcon />
              <h3 className="capitalize">Access Management</h3>
            </Box>
            <Box className={`flex items-center content-center gap-2 hover:bg-slate-300 hover:cursor-pointer active:bg-slate-400 rounded-md p-3 ${activeButton === 'audit' ? 'bg-slate-300' : ''}`} onClick={() => { handleButtonClick('audit'); navigate('empty') }}>
              <ContentPasteSearchIcon />
              <h3 className="capitalize">Audit and Logs</h3>
            </Box>
            <Box className={`flex items-center content-center gap-2 hover:bg-slate-300 hover:cursor-pointer active:bg-slate-400 rounded-md p-3 ${activeButton === 'collab' ? 'bg-slate-300' : ''}`} onClick={() => { handleButtonClick('collab'); navigate('empty') }}>
              <GroupWorkIcon />
              <h3 className="capitalize">collaboration</h3>
            </Box>
          </Box>
          <Box className='mt-auto w-full mb-5'>
            <Button variant="contained" className="flex gap-2 w-full" sx={{ backgroundColor: 'black' }} onClick={() => navigate('/login')}><h3>Logout</h3><LogoutIcon /></Button>
          </Box>
        </Box>
        <Outlet />
      </Box>
    </>
  )
}

export default SideDrawer
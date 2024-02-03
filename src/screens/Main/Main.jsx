import { Box, Toolbar } from "@mui/material"
import './Main.styles.css'
import { useNavigate } from "react-router-dom"
function Main() {
  const navigate = useNavigate();
  return (
    <Box className='flex flex-col w-full h-dvh landingPageContainer justify-center items-center z-0'>
      <Toolbar />
      <Box className='container w-3/5 h-[80%]  mx-auto flex flex-col  justify-center items-center'>
        <h1 className="text-8xl text-center text-purple-500 text-extrabold " style={{ fontFamily: 'Lato' }}>docuTrack PRO</h1>
        <p className="text-center my-10 text-semibold text-2xl w-4/5"><b>DocuTrack PRO</b>  is a digital platform designed to efficiently organize, store, and retrieve documents within an organization. It streamlines document workflows by providing centralized access, version control, and collaboration features.</p>
        <button className="capitalize p-2   bg-black rounded-md hover:bg-[#1565c0] ease-linear duration-200 hover:shadow-lg hover:px-4 hover:shadow-slate-100 hover:-translate-y-1   text-white font-semibold active:shadow-none" onClick={() => navigate('login')}>get started</button>
      </Box>
    </Box>
  )
}

export default Main
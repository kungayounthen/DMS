import { Box, Toolbar } from "@mui/material"
import './Main.styles.css'
import { useNavigate } from "react-router-dom"
function Main() {
  const navigate=useNavigate();
  return (  
    <Box className='flex flex-col w-full h-dvh landingPageContainer justify-center items-center'>
    <Toolbar/>
    <Box className='container w-3/5 h-[80%]  mx-auto flex flex-col items-center '>
    <h1 className="text-8xl text-center text-purple-500 text-bold capitalize" style={{fontFamily:'Lato'}}>document<br/>management<br/>system</h1>
    <p className="text-center my-10 text-semibold text-md">Welcome to our cutting-edge Document Management System (DMS), where organization meets efficiency. Revolutionize the way you handle documents with our intuitive platform designed to streamline document storage, retrieval, and collaboration. Say goodbye to endless paper trails and hello to centralized digital document management. With powerful features like advanced search, version control, and secure access controls, managing your documents has never been easier. Whether you&apos;re a small business, a large corporation, or anything in between, our DMS adapts to your needs, offering scalability and flexibility. Join the future of document management today</p>
    <button className="capitalize p-2   bg-black rounded-md hover:bg-[#1565c0] ease-linear duration-200 hover:shadow-lg hover:px-4 hover:shadow-slate-100 hover:-translate-y-1   text-white font-semibold active:shadow-none" onClick={()=>navigate('login')}>get started</button>
    </Box>
    </Box>
    )
}

export default Main
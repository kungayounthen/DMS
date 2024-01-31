import { Link, Outlet, useNavigate } from 'react-router-dom'
import './Login.styles.css'
import { createTheme,ThemeProvider } from '@mui/material/styles';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { CreadentialsContext } from '../../context/credential';

const theme = createTheme({
  palette: {
    dark: {
      main: '#000000',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});
function Login() {
  const navigate=useNavigate();
  const [temp,setTemp]=useState('');
  const {setName}=useContext(CreadentialsContext);
  const [password,setPassword]=useState('');

  useEffect(()=>{
  setName('');
  },[])
  return (
    <>
    <ThemeProvider theme={theme}>
    <Box className="loginContainer h-dvh" component='main'>
    <Outlet/> 
    <div className='container loginCard p-10 rounded-xl flex flex-col items-center w-2/5'>
    <h3 className='text-center text-purple-500  text-xl font-semibold' style={{fontFamily:'Lato'}}>Login</h3>
    <div className="inputContainer flex flex-col mt-9 w-4/5 mx-auto gap-1">
    <label htmlFor="email" className='text-black font-light text-sm'>Phone number,user name,or email address</label>
    <input type="text" placeholder='Enter Name' className='rounded-md p-2 textInput' id='email' value={temp} onChange={(event)=>setTemp(event.target.value)}/>
    </div>
    
    <div className="inputContainer flex flex-col mt-4 w-4/5 mx-auto gap-1">
    <label htmlFor="password" className='text-black font-light text-sm'>Your Password</label>
      <input type="password" placeholder='Enter Password' className='rounded-md p-2 textInput' id='password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
      </div>
      
      <button className='w-4/5 loginBtn text-white rounded-3xl mt-4 py-2 hover:bg-[#1565c0] active:bg-sky-700' onClick={()=>{ 
        if(!password || !temp){
        alert('Enter the required fields');
        return;
        }
        setName(temp);
        setTemp('');
        setPassword('');
        navigate('/upload')}}>Login</button>
      

      <button className='flex mt-4 bg-white rounded-3xl w-4/5 py-2 items-center justify-center gap-2'><FacebookRoundedIcon color='primary'/><p>Continue with facebook</p></button>

      <Link className='underline underline-offset-1 mt-4 text-black' to='#'>Forget your password?</Link>
      </div>
    
    </Box>
    </ThemeProvider>
    </>
    )
}

export default Login
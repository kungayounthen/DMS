
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './screens/Login/Login.jsx';
import Navbar from './components/Navbar';
import SideDrawer from './components/SideDrawer.jsx';
import UploadPage from './screens/UploadPage/UploadPage.jsx';
import SearchFilePage from './screens/searchFilePage/SearchFilePage.jsx';
import Main from './screens/Main/Main.jsx';
function App() {

  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Main/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='upload' element={<SideDrawer/>}>
        <Route index element={<UploadPage/>}/>
        <Route path='search' element={<SearchFilePage/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App

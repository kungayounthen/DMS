import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, { useContext } from "react";
import { Outlet } from 'react-router-dom';
import { CreadentialsContext } from '../context/credential';

const drawerWidth = 240;
const navItems = ['Home', 'About Us', 'Events', 'Contacts'];

function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} className='capitalize' />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const { name } = useContext(CreadentialsContext);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='fixed' component="nav" sx={{ backgroundColor: 'transparent', boxShadow: 'none', }} className='bg-transparent'>
          <Toolbar className='justify-center bg-transparent relative mx-5'>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 8 }} >
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#000', fontWeight: 'semi-bold' }}>
                  {item}
                </Button>
              ))}
            </Box>
            {name && <Box className='absolute right-0 flex items-center gap-1  bg-white px-2 rounded-full h-10'>
            <Box className=' px-5 border border-slate-400 rounded-full'><h3 className='text-black text-center font-semibold text-md'>{name}</h3></Box>
            <Box>
            <img src='https://images.unsplash.com/photo-1586796676774-c93004ae009f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='w-8 aspect-square rounded-full'/>
            </Box>
          </Box>}
            
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer

            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
      <Outlet />
    </>
  )
}

export default Navbar
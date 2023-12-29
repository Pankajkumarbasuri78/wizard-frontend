import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
            <img src='https://www.supplychainquarterly.com/ext/resources/images/industry_pressroom/uploaded/1_1537806109.jpg?t=1584337397&width=1080' alt='logo' height={30} width={40} />
          </IconButton>
          <Link to={'/'} style={{textDecoration:'none',color:'white'}}>
            WIZARD
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
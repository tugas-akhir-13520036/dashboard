import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Blockchain Dashboard - 13520036
        </Typography>
        <Button color="inherit" onClick={() => navigate('/merchant')}>Merchant</Button>
        <Button color="inherit" onClick={() => navigate('/authority')}>Authority</Button>
        <Button color="inherit" onClick={() => navigate('/payment-provider')}>Payment Provider</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

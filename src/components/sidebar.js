import React from 'react';
import { Drawer, List, ListItem, ListItemText, Box, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ open, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const lightBlue = "#E3F2FD"; // Light blue color from a good palette

  const menuItems = {
    merchant: [
      { text: 'Get Merchant Data', path: '/merchant/get-merchant-data' },
      { text: 'Propose Attribute', path: '/merchant/propose-attribute' },
      { text: 'Pending Attribute', path: '/merchant/pending-attribute' },
      { text: 'Payment Channel List', path: '/merchant/payment-channel-list' },
      { text: 'Payment Process', path: '/merchant/payment-process' },
      { text: 'Attribute History', path: '/merchant/attribute-history' },
      { text: 'Attribute List', path: '/merchant/attribute-list' }
    ],
    authority: [
      { text: 'Merchant List', path: '/authority/merchant-list' },
      { text: 'Activate Attribute', path: '/authority/activated-attribute' },
      { text: 'Deactivate Attribute', path: '/authority/deactivate-attribute' },
      { text: 'Activation Records', path: '/authority/activation-records' },
      { text: 'Eligible Attribute', path: '/authority/eligible-attribute' },
      { text: 'Attributes List', path: '/authority/attributes-list' }
    ],
    'payment-provider': [
      { text: 'Payment Channel Data', path: '/payment-provider/payment-channel-data' },
      { text: 'Modify Policy', path: '/payment-provider/modify-policy' },
      { text: 'Delete Policy', path: '/payment-provider/delete-policy' },
      { text: 'Policy History', path: '/payment-provider/policy-history' },
      { text: 'Attribute List', path: '/payment-provider/attribute-list' }
    ],
  };

  const currentPath = location.pathname;
  const currentSection = location.pathname.split('/')[1];
  const currentMenu = menuItems[currentSection] || [];

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleSidebar}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <Box
          sx={{ width: 240, height: '100%', bgcolor: '#f5f5f5' }}
        >
          <List>
            {currentMenu.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  toggleSidebar();
                }}
                sx={{
                  backgroundColor: currentPath === item.path ? lightBlue : 'inherit',
                  '&:hover': {
                    backgroundColor: currentPath === item.path ? lightBlue : '#e0e0e0',
                  },
                }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    color: currentPath === item.path ? 'primary' : 'textPrimary',
                    fontWeight: currentPath === item.path ? 'bold' : 'normal',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            position: 'sticky',
            height: '100vh',
            backgroundColor: '#f5f5f5',
          },
          display: { xs: 'none', sm: 'block' },
        }}
        open
      >
        <Box
          sx={{ width: 240, height: '100%', bgcolor: '#f5f5f5' }}
        >
          <List>
            {currentMenu.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => navigate(item.path)}
                sx={{
                  backgroundColor: currentPath === item.path ? lightBlue : 'inherit',
                  '&:hover': {
                    backgroundColor: currentPath === item.path ? lightBlue : '#e0e0e0',
                  },
                }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    color: currentPath === item.path ? 'primary' : 'textPrimary',
                    fontWeight: currentPath === item.path ? 'bold' : 'normal',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;

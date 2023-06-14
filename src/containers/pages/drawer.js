import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import drawerItems from './drawerItems';
import { useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { DRAWER_WIDTH } from '../../consts/constants';
import { Outlet, useNavigate } from 'react-router-dom';

const navbarItems = ['Home', 'Category', 'Profile','Logout']

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();
  const navigate2 = useNavigate();
  // const Mobile = useMediaQuery('(min-width:1200px)');
  const Ipad = useMediaQuery('(min-width:900px)')
  const drawer = (
    <div>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            // background: "#283048", 
            // background: "-webkit-linear-gradient(to right, #859398, #283048)",
            background: "linear-gradient(to right, #ec008c, #fc6767)",
            color: "white"
          },
        }}
        variant="permanent"
        anchor="left"
      >

        <Toolbar sx={{ justifyContent: 'space-around' }} >
          {/* <MenuIcon onClick={onToggleSidebar}/> */}
          <img src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-instagram-icon-png-image_6315974.png"
            width={50} height={50} alt="instagram" />
        </Toolbar>
        <Divider />
        <List>
          {drawerItems.map((text, index) => (
            <ListItem key={text.id} disablePadding>
              <ListItemButton onClick={() => navigate(`/${text.label}`)}>
                <ListItemIcon sx={{
                  color: 'white'
                }}>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: Ipad ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%', ml: `${DRAWER_WIDTH}px`,
          background: "linear-gradient(to right, #ec008c, #fc6767)", color: `white`
        }}
      >
        <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="h4" noWrap component="div" sx={{ display: { xs: 'none', md: 'block' } }}>
            Instagram
          </Typography>


          <List sx={{ display: 'flex', flexDirection: 'row' }}>
            {navbarItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate2(`/${item}`)}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        <Outlet />
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          open
        >
          {drawer}

        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
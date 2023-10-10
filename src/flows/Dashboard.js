import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListItems from './ListItems';
import Colevies from './Colevies'; 
import P2P from './P2P';
import Assets from './Assets';
import { useNavigate,useParams } from 'react-router-dom';
import P2ploans from './P2ploans';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import RO2RO from './RO2RO';
import P2R from './P2R';
import Payments from './Payments';
import R2C from './R2C';
import ReceiptRO from './ReceiptRO';
import Termloan from './Termloan';
import Reserves from './Reserves';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

function Dashboard() {
  
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const[mail,setmail]=useState('');
  const[idToken,setidToken]=useState(localStorage.getItem('idToken'));
  const[firstName,setfirstName]=useState('');
  const[lastName,setlastName]=useState('');
  useEffect(() => {

    if(idToken){
      try{
        const d=jwtDecode
        (
          localStorage.getItem('idToken')
        )
        setmail(d.email)
      }
     catch(err){
        console.log('Error',err)
     }
    }
    const accessToken = localStorage.getItem("accessToken");
      const Cookie = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
    axios
      .get(`https://api.p360.build:9003/v1/user/fetchUserDetails/${mail}`,Cookie)
      .then((response) => {
        const { firstName, lastName } = response.data.data;
        setfirstName(firstName);
        setlastName(lastName);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [idToken,mail]);
  
  const handleLogout = () => {
    Navigate('/Logout');
    // Implement your logout logic here
    // For example, clear user session and redirect to the login page
  };

  const handleItemClick = (item) => {
    console.log(`Clicked: ${item.primaryText}`);
    setSelectedItem(item);
  };

  const handleHoverChange = (isHovered) => {
    setOpen(isHovered);
  };
  const Navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, fontFamily: 'open-sans, sans-serif', fontWeight: 'bold' }}
            >
              KMV Group
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: [1],
              backgroundColor: "#1976D2",
              color: '#ffffff',
              cursor: "pointer",
              fontWeight: "bold",
              fontFamily: "open-sans, sans-serif"
            }}
          >
            <h3>Fund Management</h3>
          </Toolbar>
          <List component="nav" style={{padding:"7px"}}>
          <ListItems
            onItemClick={handleItemClick}
            selectedItem={selectedItem}
            onHoverChange={handleHoverChange} // Pass the handleHoverChange function as a prop
          
          />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {selectedItem && selectedItem.primaryText === 'CO Levies' ? (
            <Colevies />
          ) : (
            <div></div>
          )}
          {selectedItem && selectedItem.primaryText === 'P2P Payments' ? (
            <P2P/>
          ) : (
            <div></div>
          )}
           {selectedItem && selectedItem.primaryText === 'Assets Funds' ? (
            <Assets/>
          ) : (
            <div></div>
          )}
          {selectedItem && selectedItem.primaryText === 'P2P Loans' ? (
            <P2ploans firstName={firstName} lastName={lastName}/>
          ) : (
            <div></div>
          )}
           {selectedItem && selectedItem.primaryText === 'RO To RO Loans' ? (
            <RO2RO/>
          ) : (
            <div></div>
          )}
          {selectedItem && selectedItem.primaryText === 'P2R Surplus Funds Transfer' ? (
            <P2R/>
          ) : (
            <div></div>
          )}
           {selectedItem && selectedItem.primaryText === 'Payments' ? (
            <Payments/>
          ) : (
            <div></div>
          )}
          {selectedItem && selectedItem.primaryText === 'R2C Surplus Funds Transfer' ? (
            <R2C/>
          ) : (
            <div></div>
          )}
          {selectedItem && selectedItem.primaryText === 'Receipt From RO' ? (
            <ReceiptRO/>
          ) : (
            <div></div>
          )}
          {selectedItem && selectedItem.primaryText === 'Term Loan Set Off' ? (
            <Termloan/>
          ) : (
            <div></div>
          )}
            {selectedItem && selectedItem.primaryText === 'Reserves' ? (
            <Reserves/>
          ) : (
            <div></div>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;

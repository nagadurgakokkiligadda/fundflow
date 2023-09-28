import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import PaymentIcon from '@mui/icons-material/Payment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SvgIcon from '@mui/material/SvgIcon';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import PixIcon from '@mui/icons-material/Pix';
import SavingsIcon from '@mui/icons-material/Savings';

// Define a custom MoneyTransferIcon
function MoneyTransferIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 16h-2v-4H7l4-4 4 4h-3z" />
    </SvgIcon>
  );
}

const mainListItems = [
  {
    id: 1,
    icon: <PaymentIcon sx={{}} />,
    primaryText: "P2P Payments",
  },
  {
    id: 2,
    icon: <LibraryBooksIcon />,
    primaryText: "P2P Loans",
  },
  {
    id: 3,
    icon: <AccountBalanceIcon />,
    primaryText: "RO To RO Loans",
  },
  {
    id: 4,
    icon: <PriceChangeIcon />,
    primaryText: "P2R Surplus Funds Transfer",
  },
  {
    id: 5,
    icon: <SwapHorizIcon />,
    primaryText: "Payments",
  },
  {
    id: 6,
    icon: <MoneyTransferIcon />,
    primaryText: "R2C Surplus Funds Transfer",
  },
  {
    id: 7,
    icon: <EventNoteIcon />,
    primaryText: "Receipt From RO",
  },
  {
    id: 8,
    icon: <BusinessIcon />,
    primaryText: "CO Levies",
  },
  {
    id: 9,
    icon: <InventoryIcon />,
    primaryText: "Assets Funds",
  },
  {
    id: 10,
    icon: <PixIcon />,
    primaryText: "Term Loan Set Off",
  },
  {
    id: 11,
    icon: <SavingsIcon />,
    primaryText: "Reserves",
  },
];

const ListItems = ({ onItemClick, selectedItem, onHoverChange }) => {
  const getIconForItem = (item) => {
    switch (item.primaryText) {
      case 'P2P Payments':
        return <PaymentIcon sx={{ fontSize: '15px' }} />;
      case 'P2P Loans':
        return <LibraryBooksIcon sx={{ fontSize: '15px' }} />;
      case 'RO To RO Loans':
        return <AccountBalanceIcon sx={{ fontSize: '15px' }} />;
      case 'P2R Surplus Funds Transfer':
        return <PriceChangeIcon sx={{ fontSize: '15px' }} />;
      case 'Payments':
        return <SwapHorizIcon sx={{ fontSize: '15px' }} />;
      case 'R2C Surplus Funds Transfer':
        return <MoneyTransferIcon sx={{ fontSize: '15px' }} />;
      case 'Receipt From RO':
        return <EventNoteIcon sx={{ fontSize: '15px' }} />;
      case 'CO Levies':
        return <BusinessIcon sx={{ fontSize: '15px' }} />;
      case 'Assets Funds':
        return <InventoryIcon sx={{ fontSize: '15px' }} />;
      case 'Term Loan Set Off':
        return <PixIcon sx={{ fontSize: '15px' }} />;
      case 'Reserves':
        return <SavingsIcon sx={{ fontSize: '15px' }} />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      {mainListItems.map((item) => (
        <ListItemButton
          key={item.id}
          sx={{
            fontSize: '5px',
            borderRadius:"14px",
            backgroundColor:
              selectedItem && selectedItem.id === item.id
                ? '#1976D2'
                : 'transparent',
            '&:hover': {
              backgroundColor:
                selectedItem && selectedItem.id === item.id
                  ? '#1976D2'
                  : 'transparent',
              // Add a rule to expand the sidebar width on hover
              '& ~ .MuiDrawer-paper': {
                width: '250px',
              },
            },
          }}
          onClick={() => onItemClick(item)}
          onMouseEnter={() => onHoverChange(true)} // Expand sidebar on mouse enter
          onMouseLeave={() => onHoverChange(false)} // Minimize sidebar on mouse leave
        >
          <ListItemIcon sx={{ marginRight: 0 ,marginLeft:"-7px"}}>
            <Avatar sx={{ width: 25, height: 25 }}>
              {getIconForItem(item)}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={item.primaryText}
            primaryTypographyProps={{
              fontSize: '13px',
              marginLeft: '-10px',
              fontFamily: 'open-sans, sans-serif',
            }}
          />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};

export default ListItems;

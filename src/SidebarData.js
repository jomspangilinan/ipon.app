import React from 'react';
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalance"
import PaymentIcon from '@material-ui/icons/Payment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LogoutIcon from '@mui/icons-material/Logout';
export const SidebarData = [
  {
    title: 'Overview',
    path: '/dashboard',
    icon: <DashboardIcon/>,
    tool: 'Overview charts, adding transaction',
    // cName: 'nav-text'
  },
  {
    title: 'History',
    path: '/history',
    icon: <AccountBalanceWalletIcon/>,
    tool: 'Transaction History',
    // cName: 'nav-text'
  },
  // {
  //   title: 'Payments',
  //   path: '/payables',
  //   icon: <PaymentIcon/>,
  //   tool: 'Test tool tip',
  //   // cName: 'nav-text'
  // },
  // {
  //   title: 'Currency',
  //   path: '/currency',
  //   icon: <MonetizationOnIcon/>,
  //   tool: 'Test tool tip',
  //   //cName: 'nav-text'
  // },
  {
    title: 'Logout',
    path: '/logout',
    icon: <LogoutIcon/>,
    tool: 'Account logout',
    //cName: 'nav-text'
  }
];
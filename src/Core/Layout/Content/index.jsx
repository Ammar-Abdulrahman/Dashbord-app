import * as React from 'react';
import { Box } from "@mui/material"
import Sidebar from '../Sidebar/index';
import { DrawerHeader } from "../../Theme/index.styled"
import { Outlet } from 'react-router';

const Content = () => {
  
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" style={{ backgroundColor:"#ECEFF1" , height:"100%" }} sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
export default Content

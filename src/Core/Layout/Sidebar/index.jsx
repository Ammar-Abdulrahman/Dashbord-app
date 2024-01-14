import * as React from 'react';
import { useTheme , Toolbar , CssBaseline , Typography ,  IconButton } from '@mui/material';
import { AppBar , Drawer , DrawerHeader } from "../../Theme/index.styled"
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Items from './items';

const Sidebar = () => {

  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
    <CssBaseline />
      <AppBar style={{backgroundColor:"white"}} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            style={{color:"#F46609"}}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{color:"#F46609"}} variant="h6" noWrap component="div">
            Believer
          </Typography>

        </Toolbar>
      </AppBar>
    <Drawer variant="permanent" open={open}>
      <div  style={{backgroundColor:"#3246A9" , height:"100%" }}>
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon style={{color:"white"}}  />}
          </IconButton>
        </DrawerHeader>

        <Items />
        </div>
      </Drawer>
    </>
  )
}

export default Sidebar
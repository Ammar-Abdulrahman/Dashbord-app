import React from "react";
import { menuItems , menuBottomItems } from "./items";
import { listIconStyle } from "../../../Theme/login.styled"
import { List , Divider , ListItem , ListItemIcon , ListItemText } from '@mui/material';
import { Link , useLocation } from "react-router-dom"

const Items = () => {

    const location = useLocation()

    return(
        <>
        <List style={{color:"white" , marginLeft:5 }} >
            {menuItems.map((item)=>(
            <ListItem
            button
            key={item.text}
            component={Link}
            to={item.link}
            selected={location.pathname === item.link}
            >
                <ListItemIcon sx={listIconStyle} >
                    <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItem>
        ))}
        </List> 

        <Divider sx={{ marginTop :{xs:10,sm:10,md:10,lg:15,xl:30, }}} />
        
        <List style={{color:"white" , marginLeft:5 }}>
            {menuBottomItems.map((item) => (
            <ListItem
            button
            key={item.text}
            component={Link}
            to={item.link}
            selected={location.pathname === item.link}>
                <ListItemIcon sx={listIconStyle} >
                    <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItem>
            ))}
        </List>

        </>
    )
}

export default Items
import React from 'react'
import { Typography , Toolbar } from "@mui/material"

const PageHeader = ({title}) => {
    
    return (
        <Toolbar>
            <Typography style={{color:"#3E51FA"}} variant='h6'>{title}</Typography>
        </Toolbar>
    )
}

export default PageHeader
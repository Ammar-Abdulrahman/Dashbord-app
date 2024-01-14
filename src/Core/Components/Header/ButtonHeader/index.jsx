import React from 'react'
import { Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

const ButtonHeader = ({ title , func }) => {
    
    return (
        <Button style={{marginTop:-90 , backgroundColor:"#3E51FA" , marginLeft:1020}} onClick={func} variant="contained">
            <AddIcon style={{marginTop:-1 , marginLeft:-7 , marginRight:2}} /> {title}
        </Button>
    )
}

export default ButtonHeader
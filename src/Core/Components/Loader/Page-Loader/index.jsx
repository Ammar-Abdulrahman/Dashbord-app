import React from 'react';
import { CircularProgress, Box} from '@mui/material';
import Lottie from "lottie-react"
import a from "../../../assets/json/app_loader.json"


export default function Loader() {

    return (
    <Box display="flex" marginTop={3} justifyContent="center" minHeight="200px" >
        <CircularProgress style={{color:"#3E51FA"}} size={50} />
    </Box>
);
}

//<CircularProgress color="secondary" size={50} />
{/* <div style={{width:500 }} >
        <Lottie animationData={a} />
        </div> */}
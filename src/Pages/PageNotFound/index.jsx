import React from 'react'
import Lottie from "lottie-react"
import home_Loader_believer from "../../Core/assets/json/home_Loader_believer.json"
import a from "../../Core/assets/json/app_loader.json"
import b from "../../Core/assets/json/home_loader_believer2.json"
import c from "../../Core/assets/json/in_progress.json"
import d from "../../Core/assets/json/not_found.json"
import f from "../../Core/assets/json/page_not_found.json"
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { buttonStyle } from '../../Core/Theme/login.styled'


const PageNotFound = () => {

  const navigate = useNavigate()

  return (
    <div style={{marginLeft:190 , marginTop:-50  , width:1000 , height :80}} >
        <Lottie animationData={d} />
        <div style={{ marginTop:-100 , marginLeft:350 }} >
        <Button style={{backgroundColor:"rgb(43, 17, 138)" , marginLeft:150}} variant="contained" color="secondary" onClick={()=> navigate("/", { replace:true })} >Go Back</Button>
        </div>
    </div>
  )
}

export default PageNotFound
import {React , useState} from 'react'
import Lottie from "lottie-react"
import Loader from "../../../assets/json/app_loader.json"
import { loaderStyle } from "../../../Theme/modal.style"
//import "./index.css"

const AppLoader = () => {
  
  return (
    <>
      <div style={loaderStyle}>
          <Lottie animationData={Loader} />
      </div>
    </>
  )
}

export default AppLoader

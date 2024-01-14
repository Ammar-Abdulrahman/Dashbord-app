import React from "react"
import { Navigate } from "react-router-dom"

const withGuards = (Component) => {
    
    const Wrapper = () =>{
        
        const token = localStorage.getItem("token")
        return token ? ( <Component /> ) : (<Navigate to="/login" replace={true} /> )
    }
    return Wrapper
}

export default withGuards
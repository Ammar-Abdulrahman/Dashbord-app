import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../API/Authentication/AuthContext"

const withGuards = (Component) => {
    
    const Wrapper = () =>{

        const { isAuthenticated } = useAuth()
        console.log(isAuthenticated)
        return sessionStorage.getItem("token") ? ( <Component /> ) : (<Navigate to="/login" replace={true} /> )
    }
    return Wrapper
}

export default withGuards
import React from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes"
import PublicRoutes from "./PublicRoutes"

const RouteHandler = () =>{
    
    const token = sessionStorage.getItem("token")

    return token ? <ProtectedRoutes /> : <PublicRoutes />
}

export default RouteHandler


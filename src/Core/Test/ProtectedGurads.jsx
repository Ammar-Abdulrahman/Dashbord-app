import React from "react";
import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../API/Authentication/authService";

const ProtectedGuards = ({children}) => {
    
    if(isAuthenticated()){
        return children;
    }
    else {
        return <Navigate to="/login" replace />;
    }
}

export default ProtectedGuards
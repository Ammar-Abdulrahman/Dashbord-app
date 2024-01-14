import React from "react";
import { Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes.routes";
import PublicRoutes from "./PublicRoutes.routes";


const AppRouter = () =>{

    return(
        <>
            <PublicRoutes />
            <ProtectedRoutes />
        </>
    )
}

export default AppRouter
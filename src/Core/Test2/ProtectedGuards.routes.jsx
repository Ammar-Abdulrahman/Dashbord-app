import React from "react";
import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../API/Authentication/authService";

const ProtectedGuards = () => {
    
    if(!isAuthenticated()){
        return <Navigate to="/login" replace />;
    }
    return null
}

export default ProtectedGuards


// import React from "react";
// import { Navigate } from "react-router-dom"
// import { isAuthenticated } from "../API/Authentication/authService";

// const ProtectedGuards = ({children}) => {
    
//     if(isAuthenticated()){
//         return children;
//     }
//     else {
//         return <Navigate to="/login" replace={true} />;
//     }
// }

// export default ProtectedGuards
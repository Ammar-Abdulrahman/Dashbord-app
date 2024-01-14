import React from "react";
import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../API/Authentication/authService";

const PublicGuards = () => {
    
    if(isAuthenticated()){
        return <Navigate to="/home" replace />;
    }
    return null
}

export default PublicGuards


// import React from "react";
// import { Navigate } from "react-router-dom"
// import { isAuthenticated } from "../API/Authentication/authService";

// const PublicGuards = ({children}) => {
    
//     if(!isAuthenticated()){
//         return children;
//     }
//     else {
//         return <Navigate to="/home" replace={true} />;
//     }
// }

// export default PublicGuards
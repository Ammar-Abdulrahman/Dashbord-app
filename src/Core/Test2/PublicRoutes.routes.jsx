import React from "react";
import { Route , Routes } from "react-router-dom";
import PublicGuards from "./PublicGuards.routes";
import ProtectedRoutes from "./ProtectedRoutes.routes";

const LoginPage = React.lazy(()=> import("../../Pages/Auth/Login"))

const PublicRoutes = () => {
    return(
        <Routes>
            <Route path="/login" element={<PublicGuards />}>
                    <Route index element={<LoginPage />} />
            </Route>
        </Routes>
    )
}

export default PublicRoutes


// import React from "react";
// import { Route , Routes } from "react-router-dom";
// import PublicGuards from "./PublicGuards.routes";

// const LoginPage = React.lazy(()=> import("../../Pages/Auth/Login"))

// const PublicRoutes = () =>{
//     return(
//     <>
//         <Routes>
//                 <Route path="/login" element={<PublicGuards children={ <LoginPage /> } />} />
//         </Routes>
//     </>
//     )
// }

// export default PublicRoutes

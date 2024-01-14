import React, { Suspense } from "react";
import { Route , Routes } from "react-router-dom";
import Loader from "../Components/Loader/Page-Loader/index";
import ProtectedGuards from "./ProtectedGuards.routes";
import PublicGuards from "./PublicGuards.routes";


const LayoutPage = React.lazy(()=> import("../Layout/index"))
const HomePage = React.lazy(()=> import("../../Pages/Home/index"))
const ExercisesPage = React.lazy(()=> import("../../Pages/Exercises/index"))
const DaysPage = React.lazy(()=> import("../../Pages/Days/index"))


const ProtectedRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<LayoutPage />}>
                <Route path="/home" element={<ProtectedGuards />}>
                        <Route index element={<HomePage />} />
                </Route>
                <Route path="/exercises" element={<ProtectedGuards />}>
                        <Route index element={<ExercisesPage />} />
                </Route>
                <Route path="/days" element={<ProtectedGuards />}>
                        <Route index element={<DaysPage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default ProtectedRoutes

// import React, { Suspense } from "react";
// import { Route , Routes } from "react-router-dom";
// import Loader from "../Components/Loader/Page-Loader";
// import ProtectedGuards from "./ProtectedGuards.routes";

// const LayoutPage = React.lazy(()=> import("../Layout/index"))
// const HomePage = React.lazy(()=> import("../../Pages/Home/index"))
// const ExercisesPage = React.lazy(()=> import("../../Pages/Exercises/index"))
// const DaysPage = React.lazy(()=> import("../../Pages/Days/index"))


// const ProtectedRoutes = () =>{
//     return(
//         <Routes>
//             <Route path="/" element={ <Suspense fallback={<Loader />}> <LayoutPage /> </Suspense>}>
//                 <Route path="/home" element={<Suspense fallback={<Loader />}> <ProtectedGuards children={ <HomePage /> } /> </Suspense>} />
//                 <Route path="/days" element={ <Suspense fallback={<Loader />}> <ProtectedGuards children={ <DaysPage /> } /> </Suspense>} />
//                 <Route path="/exercise" element={ <Suspense fallback={<Loader />}> <ProtectedGuards children={ <ExercisesPage />} /> </Suspense>} />
//             </Route>
//         </Routes>
//     )
// }

// export default ProtectedRoutes
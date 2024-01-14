import React , { lazy , Suspense } from "react";
import { Route , Routes } from "react-router-dom"
import PublicGuards from "./PublicGuards"
import Loader from "../Components/Loader/Page-Loader/index"

const LoginPage = lazy(() =>import("../../Pages/Auth/Login.jsx"))

const PublicRoutes = () => {

    return(
                <PublicGuards>
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </Suspense>
                </PublicGuards>
    )
}

export default PublicRoutes
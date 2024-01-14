import React, { lazy , Suspense } from "react";
import { BrowserRouter as Router , Route , Routes } from "react-router-dom"
import LoginPage from "../../Pages/Auth/Login"
import Layout from "../Layout/index"
import Loader from "../Components/Loader/Page-Loader/index";
import PublicGuards from "./PublicGuards";
import ProtectedGuards from "./ProtectedGurads";

const AppRouter = () => {
    <Router>
        <Suspense fallback={<Loader />} >
            <Routes>
                <PublicGuards path="/login" element={<LoginPage />} />
                <ProtectedGuards path="/home/*" element={<Layout />} />
            </Routes>
        </Suspense>
    </Router>
}

export default AppRouter
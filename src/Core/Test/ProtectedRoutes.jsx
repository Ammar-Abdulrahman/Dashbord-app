import React , { lazy , Suspense } from "react";
import { Route , Routes } from "react-router-dom"
import ProtectedGuards from "./ProtectedGurads"
import Layout from "../Layout/index"
import Loader from "../Components/Loader/Page-Loader/index"

const HomePage = lazy(() =>import("../../Pages/Home/index"))
const UsersPage = lazy(() =>import("../../Pages/Users/index"))
const ExercisesPage = lazy(() =>import("../../Pages/Exercises/index"))
const FoodPage = lazy(() =>import("../../Pages/Food/index"))
const PlansPage = lazy(() =>import("../../Pages/Plans/index"))
const DaysPage = lazy(() =>import("../../Pages/Days/index"))
const NotFoundPage = lazy(() =>import("../../Pages/PageNotFound/index"))


const ProtectedRoutes = () => {

    return(
            <ProtectedGuards>
                <Layout>
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/home/users" element={<UsersPage />} />
                            <Route path="/home/food" element={<FoodPage />} />
                            <Route path="/home/plans" element={<PlansPage />} />
                            <Route path="/home/days" element={<DaysPage />} />
                            <Route path="/home/exercises" element={<ExercisesPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </ProtectedGuards>
    )
}

export default ProtectedRoutes
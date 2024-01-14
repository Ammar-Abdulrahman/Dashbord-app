import React , {Suspense} from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../Components/Loader/Page-Loader";

const Layout = React.lazy(() =>import("../Layout/index"))
const HomePage = React.lazy(() =>import("../../Pages/Home/index"))
const UsersPage = React.lazy(() =>import("../../Pages/Users/index"))
const ExercisesPage = React.lazy(() =>import("../../Pages/Exercises/index"))
const FoodPage = React.lazy(() =>import("../../Pages/Food/index"))
const PlansPage = React.lazy(() =>import("../../Pages/Plans/index"))
const DaysPage = React.lazy(() =>import("../../Pages/Days/index"))


const router = createBrowserRouter([
    {
        path:"/",
        element: <Layout /> ,
        children: [
            {path:"/home" , element:(
            <Suspense fallback={<Loader />} >
                <HomePage />
            </Suspense>) },
            {path:"/users" , element:(
                <Suspense fallback={<Loader />} >
                    <UsersPage />
                </Suspense>) },
            {path:"/food" , element:(
                <Suspense fallback={<Loader />} >
                    <FoodPage />
                </Suspense>) },
            {path:"/exercises" , element:(
                <Suspense fallback={<Loader />} >
                    <ExercisesPage />
                </Suspense>) },
            {path:"/plans" , element:(
                    <Suspense fallback={<Loader />} >
                        <PlansPage />
                    </Suspense>) },
            {path:"/days" , element:(
                <Suspense fallback={<Loader />} >
                    <DaysPage />
                </Suspense>) },
        ]
    }
])

export default router;

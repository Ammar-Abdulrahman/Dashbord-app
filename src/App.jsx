import  React  ,{ useEffect, useState }  from 'react'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './Core/Routes/AppRoutes.routes'
import { AuthProvider } from './Core/API/Authentication/AuthContext'
import Splash from './Core/Components/Loader/Splash-Loader'
import { QueryClientProvider , QueryClient } from "react-query"

function App() {

  const [showApp, setShowApp] = useState(false);

  const handleSplashFinish = () => {
    setShowApp(true);
  }

  const queryClient = new QueryClient()

  return (
    <>
      {showApp ? (
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={AppRouter} />
          </QueryClientProvider>
        </AuthProvider>
      ) : (
        <Splash onFinish={handleSplashFinish} />
      )}
    </>
  )
}

export default App

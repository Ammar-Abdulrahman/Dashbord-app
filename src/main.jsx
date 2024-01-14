import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './Core/Routes/AppRoutes.routes'
import { AuthProvider } from './Core/API/Authentication/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <AuthProvider>
      <RouterProvider router={AppRouter} />
    </AuthProvider> */}
  </React.StrictMode>
  ,
)


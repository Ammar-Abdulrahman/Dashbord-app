import {  createContext , useContext , useState } from "react";

const AuthContext = createContext()

export const useAuth = () => {
    const {token , login , logout} = useContext(AuthContext);
    const isAuthenticated = !!token;
    return {token , login , logout , isAuthenticated};
}

export const AuthProvider = ({children}) =>{
    const [token , setToken] = useState(sessionStorage.getItem("token") || null )

    const login = (newToken) =>{
        sessionStorage.setItem("token" , newToken)
        setToken(newToken)
    }

    const logout = () =>{
        sessionStorage.removeItem("token")
        setToken(null)
    }

    const isAuthenticated = !!token

    return(
        <AuthContext.Provider value={{ token , login , logout , isAuthenticated }} >
            {children}
        </AuthContext.Provider>
    )
}
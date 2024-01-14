import axios from "axios";
import { BASE_URL } from "../../Constant/index" 

export const isAuthenticated = () => {
    const token = localStorage.getItem("token")
    return !!token
}

export const loginAction = (resource,data) =>{
    return axios.post(`${BASE_URL}/${resource}` , data ,{
        headers:{
            'x-is-dashboard': 'true'
        }
    })
}

export const logoutAction = async (resource) => {
    try {
        const response = await axios.get(`${BASE_URL}/${resource}`, {
            headers: {
                'x-is-dashboard': 'true'
            }
        });
        console.log(response);
        sessionStorage.removeItem("token");
    } catch (error) {
        console.log(error);
    }
}

export const TOKEN = sessionStorage.getItem("token");

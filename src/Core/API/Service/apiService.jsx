import axios from "axios";
//import { useQuery , useMutation } from "react-query";
import * as authService from "../Authentication/authService"
import { BASE_URL } from "../../Constant/index"

export const fetchDataList = (resource) =>{
    return axios.get(`${BASE_URL}/${resource}`,{
        headers:{
            "x-auth-token": sessionStorage.getItem("token")
        }
    })
}

export const createDataItem = (resource , data) =>{
    return axios.post(`${BASE_URL}/${resource}`, data ,{
        headers:{
            "x-auth-token": sessionStorage.getItem("token")
        }
    })
}

export const editDataItem = (resource , id , data) =>{
    return axios.put(`${BASE_URL}/${resource}/${id}`, data ,{
        headers:{
            "x-auth-token": sessionStorage.getItem("token")
        }
    })
}

export const fetchDataItemById = (resource , id) =>{
    return axios.get(`${BASE_URL}/${resource}/${id}` , {
        headers:{
            "x-auth-token": sessionStorage.getItem("token")
        }
    })
}

export const deleteItemById = (resource , id) =>{
    return axios.delete(`${BASE_URL}/${resource}/${id}`,{
        headers:{
            "x-auth-token": sessionStorage.getItem("token")
        }
    })
}

// export const fetchDataStatisics = (resource) => {
//     return axios.get(`${BASE_URL}/${resource}`, {
//         headers:{
//             "x-auth-token":sessionStorage.getItem("token")
//         }
//     } )
// }

// // (authService.getAuthToken() ? authService.getAuthToken() : "" )

// // javascript
// import axios from "axios";
// import { useQuery ,useMutation } from "react-query";
// import * as authService from "../Authentication/authService";
// import { BASE_URL } from "../../Constant/index";

// // Fetch data list using React Query
// export const fetchDataList = (resource) => {
//   return useQuery(resource, async () => {
//     const response = await axios.get(`${BASE_URL}/${resource}`, {
//       headers: {
//         "x-auth-token": authService.TOKEN,
//       },
//     });
//     return response.data;
//   });
// };

// // Create data item using React Query
// export const createDataItem = () => {
//   const mutation = useMutation(async ({ resource, data }) => {
//     const response = await axios.post(`${BASE_URL}/${resource}`, data, {
//       headers: {
//         "x-auth-token": authService.TOKEN,
//       },
//     });
//     return response.data;
//   });

//   return mutation;
// };

// // Fetch data item by ID using React Query
// export const fetchDataItemById = (resource, id) => {
//   return useQuery(["dataItem", id], async () => {
//     const response = await axios.get(`${BASE_URL}/${resource}/${id}`, {
//       headers: {
//         "x-auth-token": authService.TOKEN,
//       },
//     });
//     return response.data;
//   });
// };

// // Edit data item by ID using React Query
// export const editItemById = () => {
//   const mutation = useMutation(async ({ resource, id, data }) => {
//     const response = await axios.put(`${BASE_URL}/${resource}/${id}`, data, {
//       headers: {
//         "x-auth-token": authService.TOKEN,
//       },
//     });
//     return response.data;
//   });

//   return mutation;
// };

// export const deleteItemById = () => {
//     const mutation = useMutation(async ({ resource, id }) => {
//       const response = await axios.delete(`${BASE_URL}/${resource}/${id}`, {
//         headers: {
//           "x-auth-token": authService.TOKEN,
//         },
//       });
//       return response.data;
//     });
//     return mutation;
//   };
import * as React from 'react';
import { useState , useEffect} from 'react';
import { Table, TableBody , TableContainer , Paper ,TablePagination} from '@mui/material';
import { fetchDataList , deleteItemById } from "../../Core/API/Service/apiService"
import HeaderTable from './columns';
import PageHeader from '../../Core/Components/Header/PageHeader'
import ErrorModal from "../../Core/Components/Error/index"
import Loader from '../../Core/Components/Loader/Page-Loader';
import ConfirmationModal from '../../Core/Components/Modal/confirmAction';
import withGuards from '../../Core/Routes/withGuards.routes';
import Slider from '../../Core/Components/Slider';
import { StyledTableCell,StyledTableRow } from '../../Core/Theme/table.style';

const UsersPage = () => {

  const [rows , setRows] = useState([])
  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading , setLoading] = useState(true)

  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleOpenConfirmationModal = (userId) => {
    setSelectedUserId(userId)
    setConfirmationModalOpen(true)
  }

  const handleConfirmDeletion = () => {
    if (selectedUserId) {
      deleteItemById("admin/users", selectedUserId)
        .then((response) => {
          fetchData()
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setConfirmationModalOpen(false)
        })
    }
  }

  useEffect(()=>{
    fetchDataList("admin/users").then((response)=>{
      const data = response.data
      setLoading(false)
      console.log(response)
  
      const mappedData = data.map((item,index) =>({
        id:index+1,
        name:item.name,
        email:item.email,
        gender:item.gender,
        height:item.height,
        weight:item.weight,
        birthDate:item.birthDate
  }))

      setRows(mappedData)
  
    }).catch((error)=>{
      console.log(error)
      setLoading(false)
      setErrorMessage( error.message || error.response.data.error)
      setErrorModalOpen(true)
    })
  },[])

  return (
    <>
    <PageHeader title={"Users"} />

    {loading ? ( <Loader /> ): (
    <TableContainer style={{maxWidth:1200}} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <HeaderTable />

        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">{index+1}</StyledTableCell>
              <StyledTableCell align="center">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.gender}</StyledTableCell>
              <StyledTableCell align="center">{row.height}</StyledTableCell>
              <StyledTableCell align="center">{row.weight}</StyledTableCell>
              <StyledTableCell align="center">{row.birthDate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    )}


      {/* <Slider title={"ali"} /> */}

      <ErrorModal open={errorModalOpen} onClose={() => setErrorModalOpen(false)} errorMessage={errorMessage} />
      <ConfirmationModal open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)} onConfirm={handleConfirmDeletion} item={{ name: "user" }} />
    </>
  );
}

export default withGuards(UsersPage)


// To implement authentication using Redux Toolkit, you can create a slice for your authentication state and reducers to handle login and logout actions. Here's a step-by-step guide to refactor your authentication service using Redux Toolkit:

// 1. Install Required Packages:

//    First, make sure you have Redux Toolkit, Redux, and React-Redux installed in your project:

  
// bash
//    npm install @reduxjs/toolkit react-redux

// 2. Set up Redux Toolkit Slice:

//    Create a new file for your authentication slice (e.g., authSlice.js) and define your state and reducers:

  
// javascript
//    // authSlice.js

//    import { createSlice } from '@reduxjs/toolkit';

//    const initialState = {
//      token: sessionStorage.getItem('token') || null,
//    };

//    const authSlice = createSlice({
//      name: 'auth',
//      initialState,
//      reducers: {
//        loginSuccess: (state, action) => {
//          state.token = action.payload.token;
//          sessionStorage.setItem('token', action.payload.token);
//        },
//        logoutSuccess: (state) => {
//          state.token = null;
//          sessionStorage.removeItem('token');
//        },
//      },
//    });

//    export const { loginSuccess, logoutSuccess } = authSlice.actions;
//    export default authSlice.reducer;

// 3. Create Redux Store:

//    In your application, create your Redux store and combine the authentication slice with other slices if necessary. Create a Redux store using the configureStore function:

  
// javascript
//    // store.js

//    import { configureStore } from '@reduxjs/toolkit';
//    import authReducer from './authSlice';

//    const store = configureStore({
//      reducer: {
//        auth: authReducer,
//        // other reducers...
//      },
//    });

//    export default store;

// 4. Dispatch Login and Logout Actions:

//    In your components, use React-Redux to connect to the store and dispatch login and logout actions. Here's how you can dispatch login and logout actions in your login and logout functions:

  
// javascript
//    // Login component
//    import { useDispatch } from 'react-redux';
//    import { loginSuccess } from './authSlice';

//    const handleLogin = async (data) => {
//      try {
//        const response = await loginAction('your_resource', data);

//        // Dispatch login success action
//        dispatch(loginSuccess({ token: response.data.token }));

//        // Continue with your logic...
//      } catch (error) {
//        console.error(error);
//        // Handle login error...
//      }
//    };

//    // Logout component
//    import { useDispatch } from 'react-redux';
//    import { logoutSuccess } from './authSlice';

//    const handleLogout = async () => {
//      try {
//        await logoutAction('your_resource');
//        // Dispatch logout success action
//        dispatch(logoutSuccess());
//        // Continue with your logic...
//      } catch (error) {
//        console.error(error);
//        // Handle logout error...
//      }
//    };


// 5. Pass Token with API Requests:

//    To pass the token with your API requests, you can use Axios interceptors. Add an Axios interceptor to include the token in the request headers:

  
// javascript
//    import axios from 'axios';
//    import store from './store';

//    axios.interceptors.request.use(
//      (config) => {
//        const token = store.getState().auth.token;
//        if (token) {
//          config.headers['x-auth-token'] = token;
//        }
//        return config;
//      },
//      (error) => Promise.reject(error)
//    );

//    This interceptor adds the token from the Redux store's state to the request headers automatically for all your API requests.

// With this setup, you have implemented authentication using Redux Toolkit and made it cleaner and more organized. Make sure to adapt these code snippets to fit your specific project structure.
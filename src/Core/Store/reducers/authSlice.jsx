// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

    const initialState = {
        token: sessionStorage.getItem('token') || null,
    };

    const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            loginSuccess: (state, action) => {
                state.token = action.payload.token;
                sessionStorage.setItem('token', action.payload.token);
        },
            logoutSuccess: (state) => {
                state.token = null;
                sessionStorage.removeItem('token');
        },
    },
})

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
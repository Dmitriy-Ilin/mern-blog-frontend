import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


const initialState = {
    data: null,
    status: 'loading'
};

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
});

export const fetchRegistration = createAsyncThunk('auth/fetchRegistration', async (params) => {
    const {data} = await axios.post('/auth/register', params);
    return data;
});

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async () => {
    const {data} = await axios.get('/auth/me');
    return data;
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchUserData.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUserData.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
        
        [fetchLogin.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchLogin.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },

        [fetchRegistration.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchRegistration.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchRegistration.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
    }
});

export default authSlice.reducer;

export const selectIsAuth = state => Boolean(state.auth.data);

export const { logout } = authSlice.actions;
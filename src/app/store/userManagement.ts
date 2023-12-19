import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jsonData from 'src/url.json';
import { showMessage } from './fuse/messageSlice';

const initialState = {
    data: [],
    dataFetchLoading: false,
    dataUpdatingLoadding: false,
};

const userManagementSlice = createSlice({
    name: 'userManagement',
    initialState,
    reducers: {
        updateUser(state, action) {
            if (Array.isArray(action.payload)) {
                state.data = [...state.data, ...action.payload]
            } else {
                state.data = [...state.data, action.payload]
            }
        },
        setLoader(state) {
            state.dataFetchLoading = !state.dataFetchLoading;
        },
        setUpdatingLoader(state) {
            state.dataUpdatingLoadding = !state.dataUpdatingLoadding
        },
        updateUserById(state, action) {
            const { user_id, ...rest } = action.payload;
            state.data = state.data.map((value) => {
                if (value.user_id === user_id) {
                    return rest;
                }
                return value;
            })
        }
    }
});

export const slice = userManagementSlice.actions;
export const selectUserManagement = ({ userManagement }) => userManagement;

const URL_BASE_LINK = jsonData.API_LOCAL_URL;

// Send OTP API
export const sendOTPMailHandler = (data) => async (dispatch) => {

    const payload = {
        email: data
    };

    await axios.post(`${URL_BASE_LINK}/otp/sendotp`, payload)
        .then(res => dispatch(showMessage({ message: res.data.message, variant: "success" })))
        .catch(err => dispatch(showMessage({ message: err.message, variant: "error" })));
}

//verify otp 
export const verifyOTPMailHandler = (data, navigate) => async (dispatch) => {

    const payload = {
        email: data.email,
        otp: data.otp
    };

    await axios.post(`${URL_BASE_LINK}/otp/validateotp`, payload)
        .then(res => {
            dispatch(showMessage({ message: res.data.message, variant: "success" })),
                navigate("/reset")
        })
        .catch(err => dispatch(showMessage({ message: err.response.data.message, variant: "error" })));
}

// reset password
export const resetPasswordHandler = (data) => async (dispatch) => {

    const payload = {
        email: data.email,
        password: data.password
    };

    await axios.post(`${URL_BASE_LINK}/user/updatepassword`, payload)
        .then(res => {
            dispatch(showMessage({ message: res.data.message, variant: "success" }))
        })
        .catch(err => {
            dispatch(showMessage({ message: err.response.data.message, variant: "error" }))
        });
}


// create user
export const createUserAPI = (data) => async (dispatch) => {
    dispatch(slice.setUpdatingLoader());
    await axios.post(`${URL_BASE_LINK}/user/create`, data)
        .then(res => {
            dispatch(showMessage({ message: res.data.message, variant: "success" }))
            dispatch(slice.updateUser(res.data.data));
            dispatch(slice.setUpdatingLoader());
        })
        .catch(err => {
            dispatch(showMessage({ message: err.response.data.message, variant: "error" }))
            dispatch(slice.setUpdatingLoader());
        });
}

// get user
export const fetchUserAPI = (data = { page: 1, limit: 10 }) => async (dispatch) => {
    dispatch(slice.setLoader());
    const { page = 1, limit = 10 } = data;
    await axios.get(`${URL_BASE_LINK}/user/list?page=${page}&limit=${limit}`)
        .then(res => {
            dispatch(showMessage({ message: res.data.message, variant: "success" }))
            dispatch(slice.updateUser(res.data.data));
            dispatch(slice.setLoader());
        })
        .catch(err => {
            dispatch(showMessage({ message: err.response.data.message, variant: "error" }))
            dispatch(slice.setLoader());

        });
}

// update user
export const updateUserAPI = (id, data) => async (dispatch) => {
    dispatch(slice.setUpdatingLoader());
    const { password, confrimpassword, ...payload } = data
    await axios.patch(`${URL_BASE_LINK}/user/update/${id}`, payload)
        .then(res => {
            dispatch(showMessage({ message: res.data.message, variant: "success" }))
            dispatch(slice.updateUserById(res.data.data));
            dispatch(slice.setUpdatingLoader());
        })
        .catch(err => {
            dispatch(showMessage({ message: err.response.data.message, variant: "error" }))
            dispatch(slice.setUpdatingLoader());
        });
}
export default userManagementSlice.reducer;

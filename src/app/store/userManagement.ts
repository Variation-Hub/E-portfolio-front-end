import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jsonData from 'src/url.json';
import { showMessage } from './fuse/messageSlice';

const initialState = {
    data: [{
        id: "123",
        name: "User 1",
        email: "user@gmail.com",
        role: "admin",
        avatar: ""
    }, {
        id: "124",
        name: "User 2",
        email: "user2@gmail.com",
        role: "trainer",
        avatar: ""
    }],
};

const userManagementSlice = createSlice({
    name: 'userManagement',
    initialState,
    reducers: {

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

export default userManagementSlice.reducer;

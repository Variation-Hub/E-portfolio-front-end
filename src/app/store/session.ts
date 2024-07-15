import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jsonData from 'src/url.json';
import { showMessage } from './fuse/messageSlice';
import { userTableMetaData } from '../contanst/metaData';

const initialState = {
    data: [],
    trainer: [],
    learner: [],
    singleData: {},
    dataFetchLoading: false,
    dataUpdatingLoadding: false,
    dialogType: "",
    meta_data: {
        page: 1,
        items: 0,
        page_size: userTableMetaData.page_size,
        pages: 1
    },
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setLoader(state) {
            state.dataFetchLoading = !state.dataFetchLoading;
        },
        setUpdatingLoader(state) {
            state.dataUpdatingLoadding = !state.dataUpdatingLoadding
        },
        setDialogType(state, action) {
            state.dialogType = action.payload
        },
        setSessiondata(state, action) {
            state.data = action.payload
        },
        setTrainer(state, action) {
            state.trainer = action.payload
        },
        setLearner(state, action) {
            state.learner = action.payload
        },
        setSingledata(state, action) {
            state.singleData = action.payload
        }
    }
});

export const slice = sessionSlice.actions;
export const selectSession = ({ session }) => session;

const URL_BASE_LINK = jsonData.API_LOCAL_URL;

export const getTrainerAPI = (role) => async (dispatch) => {

    try {
        dispatch(slice.setLoader());

        let url = `${URL_BASE_LINK}/user/list?role=${role}`

        const response = await axios.get(url);
        // dispatch(showMessage({ message: response.data.message, variant: "success" }))
        // if(role === "Trainer")
        dispatch(slice.setTrainer(response.data.data))
    // else if(role === "Learner")
    //     dispatch(slice.setLearner(response.data.data))
        dispatch(slice.setLoader());
        return true;

    } catch (err) {
        dispatch(slice.setLoader());
        dispatch(slice.setSessiondata([]))
        return false
    };

}

export const getLearnerAPI = () => async (dispatch) => {

    try {
        dispatch(slice.setLoader());

        let url = `${URL_BASE_LINK}/learner/list`

        const response = await axios.get(url);
        // dispatch(showMessage({ message: response.data.message, variant: "success" }))
        // if(role === "Trainer")
        // dispatch(slice.setTrainer(response.data.data))
    // else if(role === "Learner")
        dispatch(slice.setLearner(response.data.data))
        dispatch(slice.setLoader());
        return true;

    } catch (err) {
        dispatch(slice.setLoader());
        dispatch(slice.setSessiondata([]))
        return false
    };

}

export const getSessionAPI = (id, field) => async (dispatch) => {

    try {
        dispatch(slice.setLoader());

        let url = `${URL_BASE_LINK}/session/list`

        const response = await axios.get(url);
        // dispatch(showMessage({ message: response.data.message, variant: "success" }))
        dispatch(slice.setSessiondata(response.data.data))
        dispatch(slice.setLoader());
        return true;

    } catch (err) {
        dispatch(slice.setLoader());
        dispatch(slice.setSessiondata([]))
        return false
    };

}

// create session 
export const createSessionAPI = (data) => async (dispatch, getStore) => {
    try {
        dispatch(slice.setUpdatingLoader());
        const response = await axios.post(`${URL_BASE_LINK}/session/create`, data)
        dispatch(showMessage({ message: response.data.message, variant: "success" }))
        // if (response.data.status) {
        //     dispatch(getSessionAPI(getStore().user.data.id, ""))
        // }
        dispatch(slice.setUpdatingLoader());
        return true;
    } catch (err) {
        dispatch(showMessage({ message: err.response.data.message, variant: "error" }))
        dispatch(slice.setUpdatingLoader());
        return false;
    }
}

// update session 
export const updateSessionAPI = (id, data) => async (dispatch, getStore) => {
    try {

        dispatch(slice.setUpdatingLoader());
        const { ...payload } = data
        const response = await axios.patch(`${URL_BASE_LINK}/session/update/${id}`, payload)
        dispatch(showMessage({ message: response.data.message, variant: "success" }))
        // if (response.data.status) {
        //     dispatch(getSessionAPI(getStore().user.data.id, ""))
        // }
        dispatch(slice.setUpdatingLoader());
        return true;
    } catch (err) {
        dispatch(showMessage({ message: err.response?.data.message, variant: "error" }))
        dispatch(slice.setUpdatingLoader());
        return false;
    };
}

// delete session 
export const deleteSessionHandler = (id) => async (dispatch, getStore) => {
    try {
        dispatch(slice.setUpdatingLoader());
        const response = await axios.delete(`${URL_BASE_LINK}/session/delete/${id}`)
        console.log(response);
        dispatch(showMessage({ message: response.data.message, variant: "success" }))
        // if (response.data.status) {
        //     dispatch(getSessionAPI(getStore().user.data.id, ""))
        // }
        dispatch(slice.setUpdatingLoader());
        return true;
    } catch (err) {
        dispatch(showMessage({ message: err.response.data.message, variant: "error" }))
        dispatch(slice.setUpdatingLoader());
        return false;
    }
}

// Upload Images
export const uploadImages = (file: any) => async (dispatch) => {
    try {
        const formData = new FormData();
        console.log(file)

        file.forEach(value => formData.append("files", value));

        formData.append('folder', "session");

        dispatch(slice.setUpdatingLoader());
        const response: any = await axios.post(`${URL_BASE_LINK}/upload/files`, formData);
        dispatch(showMessage({ message: response.data.message, variant: "success" }))
        dispatch(slice.setUpdatingLoader());
        return response.data;
    } catch (err) {
        dispatch(showMessage({ message: err.response.data.message, variant: "error" }))
        dispatch(slice.setUpdatingLoader());
        return false;
    }
}



export default sessionSlice.reducer;
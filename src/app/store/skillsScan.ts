import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jsonData from 'src/url.json';
import { showMessage } from './fuse/messageSlice';
import { userTableMetaData } from '../contanst/metaData';
import { dataBase } from '../main/skillsScan/skillsScan';

const initialState = {
    data: dataBase, //[]
    dataFetchLoading: false,
    dataUpdatingLoadding: false,
    meta_data: {
        page: 1,
        items: 0,
        page_size: userTableMetaData.page_size,
        pages: 1
    },
    singleData: {}
};

const skillsScanSlice = createSlice({
    name: 'skillsScan',
    initialState,
    reducers: {
        setLoader(state) {
            state.dataFetchLoading = !state.dataFetchLoading;
        },
        setUpdatingLoader(state) {
            state.dataUpdatingLoadding = !state.dataUpdatingLoadding
        },
        setSkillsScan(state, action) {
            state.data = action.payload
        },
        setSupportMetadata(state, action) {
            state.meta_data = action.payload
        },
        setSingleData(state, action) {
            state.singleData = action.payload
        }
    }
});

export const slice = skillsScanSlice.actions;
export const selectSkillsScan = ({ skillsScan }) => skillsScan;


export default skillsScanSlice.reducer;

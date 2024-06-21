/* eslint-disable import/extensions */
import { combineReducers } from '@reduxjs/toolkit';
import fuse from './fuse';
import i18n from './i18nSlice';
import user from './userSlice';
import userManagement from './userManagement';
import learnerManagement from './learnerManagement';
import courseManagement from './courseManagement';
import resourceManagement from './resourcesManagement';
import cpdPlanning from './cpdPlanning';
import supportData from './supportData';

const createReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        fuse,
        i18n,
        user,
        userManagement,
        learnerManagement,
        courseManagement,
        cpdPlanning,
        resourceManagement,
        supportData,
        ...asyncReducers,
    });


    if (action.type === 'user/userLoggedOut') {
        // state = undefined;
    }

    return combinedReducer(state, action);
};

export default createReducer;
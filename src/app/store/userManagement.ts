import { createSlice } from '@reduxjs/toolkit';

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
export default userManagementSlice.reducer;

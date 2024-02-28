import history from '@history';
import { createSlice } from '@reduxjs/toolkit';
import { authRoles } from '../auth';

const initialState = {
  role: [], // guest
  data: {

  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggedOut(state) {
      state.data = {};
      state.role = []
    },
    setUserDetails(state, action) {
      state.data = action.payload.userData;
      state.role = authRoles[action.payload.role]
    }
  }
});

export const { userLoggedOut } = userSlice.actions;

export const setUser = (user) => async (dispatch) => {

  const userData = {
    id: user?.user_id,
    displayName: user?.first_name+' '+user?.last_name,
    photoURL: user?.avatar?.url,
    email: user?.email,
    first_name: user?.first_name,
    last_name: user?.last_name,
    user_name: user?.user_name,
    mobile: user?.mobile,
    time_zone: user?.time_zone
  }

  dispatch(userSlice.actions.setUserDetails({ userData, role: user.role }))
  const data = window.location.href.split("/");
  if (data[data.length - 1] === "sign-in" || data[data.length - 1] === "forgot" || data[data.length - 1] === "reset") {
    history.push("/home")
  }
  history.push(window.location.href)
}


export const logoutUser = (redirection) => async (dispatch) => {
  if (redirection) {
    history.push('/')
    dispatch(userSlice.actions.userLoggedOut())
  }
}

export const selectUser = ({ user }) => user;

export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

export default userSlice.reducer;

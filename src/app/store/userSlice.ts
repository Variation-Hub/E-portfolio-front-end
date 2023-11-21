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
    displayName: user.data.displayName,
    photoURL: user.data.photoURL,
    email: user.data.email,
  }

  dispatch(userSlice.actions.setUserDetails({ userData, role: user.role }))
  const data = window.location.href.split("/");
  if (data[data.length - 1] === "sign-in") {
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

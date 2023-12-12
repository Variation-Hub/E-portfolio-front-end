import { Paper, TextField, Typography } from "@mui/material";
import { resetPasswordHandler } from "app/store/userManagement";
import Logo from "app/theme-layouts/shared-components/Logo";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SecondaryButton } from "src/app/component/Buttons";

const Reset = () => {

  const[newPassword, setNewPassword] = useState({
    password:"",
    confirmPassword:""
  })

  const dispatch:any = useDispatch();

  const resetHandler = () => {
    if(newPassword.password === newPassword.confirmPassword){
      dispatch(resetPasswordHandler({email:"", password:newPassword.password}));
    }
  };

  const passwordHandler =(e) =>{
    setNewPassword((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-center flex-1 min-w-0">
      <Paper className="h-full flex items-center sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <Logo />
          <Typography className="mt-3 text-2xl font-extrabold tracking-tight leading-tight">
            Reset password
          </Typography>
          <Typography className="mt-3">
            Please enter your new password to continue your account.
          </Typography>
          <div className="flex flex-col justify-center w-full mt-24">
            <TextField
              className="mb-8"
              name="password"
              label="New password"
              value={newPassword.password}
              autoFocus
              type="text"
              variant="outlined"
              size="small"
              required
              fullWidth
              onChange={passwordHandler}
            />

            <TextField
              className="mb-8"
              label="Confirm password"
              name="confrimPassword"
              value={newPassword.confirmPassword}
              type="password"
              variant="outlined"
              size="small"
              required
              fullWidth
              onChange={passwordHandler}
            />

            <SecondaryButton name="Reset" onClick={resetHandler} />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Reset;

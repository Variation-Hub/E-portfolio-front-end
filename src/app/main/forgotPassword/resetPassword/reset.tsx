import { Paper, TextField, Typography } from "@mui/material";
import { resetPasswordHandler } from "app/store/userManagement";
import Logo from "app/theme-layouts/shared-components/Logo";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingButton, SecondaryButton } from "src/app/component/Buttons";
import { passwordReg } from "src/app/contanst/regValidation";

const Reset = () => {

  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: ""
  })

  const [loading, setLoading] = useState(false);

  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const resetHandler = async () => {
    if (newPassword.password === newPassword.confirmPassword && passwordReg.test(newPassword.password)) {
      setLoading(true);
      const response = await dispatch(resetPasswordHandler({ email: "", password: newPassword.password }));
      if (response) {
        navigate(response)
      }
      setLoading(false);
    }
  };

  const passwordHandler = (e) => {
    setNewPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
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
            Please enter a secure password.
            It must be at least 6 characters long, containing at least one lowercase letter, one uppercase letter, and one digit.
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
              name="confirmPassword"
              value={newPassword.confirmPassword}
              type="password"
              variant="outlined"
              size="small"
              required
              fullWidth
              onChange={passwordHandler}
            />
            {loading ? <LoadingButton />
              :
              <SecondaryButton name="Reset" onClick={resetHandler} disable={newPassword.password !== newPassword.confirmPassword || !passwordReg.test(newPassword.password)} />
            }
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Reset;

import { Paper, TextField, Typography } from "@mui/material";
import Logo from "app/theme-layouts/shared-components/Logo";
import React from "react";
import { SecondaryButton } from "src/app/component/Buttons";

const Reset = () => {
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
              label="New password"
              //   value={email}
              autoFocus
              type="text"
              variant="outlined"
              size="small"
              required
              fullWidth
            />

            <TextField
              className="mb-8"
              label="Confirm password"
              //   value={password}
              type="password"
              variant="outlined"
              size="small"
              required
              fullWidth
            />

            <SecondaryButton name="Reset" />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Reset;

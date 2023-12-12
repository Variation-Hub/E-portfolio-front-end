import { Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { SecondaryButton } from "src/app/component/Buttons";
import OtpValidation from "./otpValidation";
import Logo from "app/theme-layouts/shared-components/Logo";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendOTPMailHandler, verifyOTPMailHandler } from "app/store/userManagement";

const forgot = () => {
  const [email, setEmail] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [otp, setOtp] = useState({
    otpValue: "",
    otp: false,
  });
  const dispatch:any = useDispatch();

  const navigate = useNavigate();
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const sendOTPHandler = () => {
    dispatch(sendOTPMailHandler(email));
    setOtp((prev) => ({ ...prev, otp: true }));
    
  };

  const verifyOTPHandler = ()=>{
    dispatch(verifyOTPMailHandler({email, otp: otp.otpValue}, navigate));
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-center flex-1 min-w-0">
      <Paper className="h-full flex items-center sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">

          <Logo />

          <Typography className="mt-3 text-2xl font-extrabold tracking-tight leading-tight">
            Forgot password
          </Typography>
          <Typography className="mt-3">
            Please enter your registered email address to reset your password.
          </Typography>

          <div className="flex flex-col justify-center w-full mt-24">
            <TextField
              className="mb-8"
              label="Email"
              value={email}
              autoFocus
              type="email"
              variant="outlined"
              size="small"
              required
              fullWidth
              onChange={emailHandler}
            />
            {otp.otp && (
              <OtpValidation
                numberOfDigits={6}
                setOtpError={setOtpError}
                setOtp={setOtp}
              />
            )}
            {otp.otp ? (
              <SecondaryButton
                name="Verify"
                disable={otp.otpValue.length === 6 ? false : true}
                onClick={verifyOTPHandler}
              />
            ) : (
              <SecondaryButton
                name="Sent OTP"
                disable={email ? false : true}
                onClick={sendOTPHandler}
              />
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default forgot;

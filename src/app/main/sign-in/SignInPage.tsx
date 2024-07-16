import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import jwtService from "../../auth/services/jwtService";
import { LoadingButton, SecondaryButton } from "src/app/component/Buttons";
import { Link, useNavigate } from "react-router-dom";
import Logo from "app/theme-layouts/shared-components/Logo";
import { useState } from "react";
import { emailReg } from "src/app/contanst/regValidation";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch } from "react-redux";
import { Box, IconButton, InputAdornment } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import SideView from "../../component/Sideview";

const SignInPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    jwtService
      .signInWithEmailAndPassword(credentials, dispatch)
      .then((user) => {
        setLoading(false);
        navigate("/reset");
        sessionStorage.setItem("reset", JSON.stringify(user));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          showMessage({ message: err.response.data.message, variant: "error" })
        );
        setLoading(false);
      });
  }

  const credentialHandler = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickShowPassword = (e) => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <div className="flex h-full">
        {/* <Paper className="flex flex-wrap w-full h-full py-8 px-16 sm:py-48 sm:px-48 md:py-64 md:px-64"> */}
        <div className="w-full md:w-1/2 h-full relative">
          <img
            src="/assets/images/svgImage/signin.svg"
            alt="Description"
            className="object-cover w-full h-full"
            // style={{ objectFit: "cover", height: "100%", minWidth: "100%" }}
          />
        </div>
        <div className="w-full md:w-1/2 h-full flex items-center justify-center py-8 px-16 sm:py-48 sm:px-48 md:py-64 md:px-64">
          <div className="w-full min-w-300 sm:w-320 shadow-md rounded-md">
            <Logo />
            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-auto my-20 mx-20"
              onSubmit={onSubmit}
            >
              <TextField
                className="mb-24"
                label="Email"
                name="email"
                value={credentials.email}
                autoFocus
                type="email"
                variant="outlined"
                size="small"
                required
                fullWidth
                onChange={credentialHandler}
              />

              <TextField
                className="mb-24"
                label="Password"
                name="password"
                value={credentials.password}
                type={showPassword ? "text" : "password"}
                variant="outlined"
                size="small"
                required
                fullWidth
                onChange={credentialHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff
                            sx={{
                              color: "#2D2D2D",
                              opacity: 0.7,
                              fontSize: "16px",
                            }}
                          />
                        ) : (
                          <Visibility
                            sx={{
                              color: "#2D2D2D",
                              opacity: 0.7,
                              fontSize: "16px",
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {loading ? (
                <LoadingButton />
              ) : (
                <SecondaryButton
                  name="Sign in"
                  disable={
                    !emailReg.test(credentials.email) ||
                    credentials.password.length < 1
                  }
                />
              )}

              <Link
                to="/forgot"
                className="mt-2"
                style={{
                  fontSize: "14px",
                  textAlign: "right",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </Link>
            </form>
          </div>
        </div>
        {/* </Paper> */}
      </div>
    </>
  );
};

export default SignInPage;

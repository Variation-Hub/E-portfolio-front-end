import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import jwtService from '../../auth/services/jwtService';
import { SecondaryButton } from 'src/app/component/Buttons';
import { Link } from 'react-router-dom';
import Logo from 'app/theme-layouts/shared-components/Logo';
import { useState } from 'react';

const SignInPage = () => {

  const [credentials, setCredentials] = useState({
    email: "admin@gmail.com",
    password: "123456"
  })

  function onSubmit(e) {
    e.preventDefault();
    jwtService
      .signInWithEmailAndPassword(credentials)
      .then((user) => {
        console.log("user", user)
      })
      .catch((_errors) => {
        console.log(_errors)
      });
  }

  const credentialHandler = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-center flex-1 min-w-0">
      <Paper className="h-full flex items-center sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <Logo />
          <Typography className="mt-3 text-2xl font-extrabold tracking-tight leading-tight">
            Sign in
          </Typography>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
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
              className="mb-2"
              label="Password"
              name="password"
              value={credentials.password}
              type="password"
              variant="outlined"
              size="small"
              required
              fullWidth
              onChange={credentialHandler}
            />
            <Link to="/forgot" className='mb-24'>Forgot password?</Link>

            <SecondaryButton name="Sign in" />

          </form>
        </div>
      </Paper>
    </div>
  );
}

export default SignInPage;

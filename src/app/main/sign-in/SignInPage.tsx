import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import jwtService from '../../auth/services/jwtService';
import { SecondaryButton } from 'src/app/component/Buttons';

const SignInPage = () => {

  const email = "admin@fusetheme.com";
  const password = "admin";

  function onSubmit(e) {
    e.preventDefault();
    jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
      })
      .catch((_errors) => {
        console.log(_errors)
      });
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
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
              value={email}
              autoFocus
              type="email"
              variant="outlined"
              required
              fullWidth
            />

            <TextField
              className="mb-24"
              label="Password"
              value={password}
              type="password"
              variant="outlined"
              required
              fullWidth
            />

            <SecondaryButton name="Sign in" />

          </form>
        </div>
      </Paper>
    </div>
  );
}

export default SignInPage;

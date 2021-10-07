import logo from './logo.svg';
import './Login.css';
import { createMuiTheme,ThemeProvider  } from '@material-ui/core/styles';
import * as React from "react";
import Fade  from "@mui/material/Fade";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import {
Button,
TextField,
Grid,
Paper,
Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword,registerWithEmailAndPassword, signInWithGoogle,sendPasswordResetEmail } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const useStyles = makeStyles((theme) => ({
  customBorderRadius: {
    borderRadius: 5,
    width: '396px',
    padding: '30px 0px 28px',
    margin: '40% auto',
    textAlign: 'center',
    alignItems: 'center',
  },
  customTextBox:
  {
    width: '90%',
  },
  customBorderRadius_Over: {
    borderRadius: 5,
    width: '396px',
    padding: '30px 0px 28px',
    margin: '-117% auto',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#FBBD14',
    color:'#FFF',
  },
  customTextBox_Over:
  {
    width: '90%',
  },

  textFieldLabel: {
    // this will be applied when input focused (label color change)
    '&$textFieldLabelFocused': {
      color: 'white',
    },
  },
  textFieldLabelFocused: {},
  textFieldRoot: {
    // this will be applied when hovered (input text color change)
    '&:hover': {
      color: 'white',
    },
    // this will applied when hovered (input border color change)
    '&:hover $textFieldNotchedOutline': {
      borderColor: 'white',
    },
    // this will be applied when focused (input border color change)
    '&$textFieldFocused $textFieldNotchedOutline': {
      borderColor: 'white',
    },
  },
  textFieldFocused: {},
  textFieldNotchedOutline: {},

}));

const theme = createMuiTheme({
  
  typography: {
    fontFamily: ['"Montserrat Medium"'].join(','),
    button:
    {
      textTransform: 'none',
      width:'90%',
      palette:
      {
        primary: '#FBBD14'
      }
    },
   },
 },
)


function Login() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  
  const history = useHistory();

  
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading,history]);
  const [forgot, setForgot] = React.useState(false);

  const handleForgotOpen = () => {
    setForgot(true);
  };

  const handleForgotClose = () => {
    setForgot(false);
  };
  
  return (
    <div className="main">
      <Grid container justify="center" direction="row" className="login-form">
      <Grid item>
          <Grid container justify="center" direction="column" className="logo-comp">
            <Grid item>
              <img src={logo} className="App-logo-login" alt="logo" />
            </Grid>
            <Grid item>
              <h1 class="large">
              ipon.app
              </h1>
            </Grid>
            <Grid item>
            <p class="tag-large">
            Simplest way to track your expenses.
            </p>
            </Grid>
            
            <Grid item>
            <p class="tag-next-large">
              Because every peso counts.
            </p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
        <Fade  transitionDuration={ 1000 } in={!checked}>
        <div className="loob">
        <ThemeProvider theme={theme}>
          <Paper variant="elevation" elevation={10} className={classes.customBorderRadius}>
          <Grid container direction="row" spacing={0} className="test">
          <Grid item>
            <div className="sign">
                Don't have an account yet? </div>
                </Grid>
                <Grid item>
              <Link href="#" onClick={handleChange}>
              <div  className="sign-link">
              Sign Up!
              </div>
              </Link>
                </Grid>
            </Grid>
            <Grid container direction="column" spacing={2} >
              
              <Grid item>
                <TextField
                  id="outlined-email"
                  label="Email"
                  variant="outlined"
                  className = {classes.customTextBox}
                  onChange={(e) => setEmail(e.target.value)}
                  // inputProps={{style: {fontSize: 40}}} // font size of input text
                  // InputLabelProps={{style: {fontSize: 40}}} // font size of input label
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-pw"
                  label="Password"
                  type="password"
                  variant="outlined"
                  className = {classes.customTextBox}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item>
              <Button
              variant="contained"              
              type="submit"
              className="button-block"
              style = {{background: '#FBBD14',
                        color:'#FFFFFF',
                        fontFamily:'Montserrat SemiBold',
                        fontSize: '16px'}}
              onClick={() => signInWithEmailAndPassword(email, password)}
              >Login</Button>

              </Grid>
              <Grid item>
              <Link onClick={handleForgotOpen} className="fpw">
              Forgot Password?
              </Link>

              <Dialog open={forgot} onClose={handleForgotClose}>
                <DialogTitle>Forgot Password</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                        Submit the email you signed up with to reset your password.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="standard"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </DialogContent>
                    <DialogActions>
                      <Button onClick={handleForgotClose}>Close</Button>
                      <Button onClick={() => sendPasswordResetEmail(email)}>Reset Password</Button>
                    </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Paper>
          </ThemeProvider>
          </div>
          </Fade>
          <Fade in={checked}>
          <div className="loob">
        <ThemeProvider theme={theme}>
          <Paper variant="elevation" elevation={10} className={classes.customBorderRadius_Over}>
          <Grid container direction="row" spacing={0} className="test-reg">
          <Grid item>
            <div className="reg">
                Already have an account? </div>
                </Grid>
                <Grid item>
              <Link onClick={handleChange}>
              <div  className="reg-link">
              Sign In!
              </div>
              </Link>
                </Grid>
            </Grid>
            <Grid container direction="column" spacing={2} >
              
              <Grid item>
                <TextField
                  id="outlined-name"
                  label="Name"
                  variant="outlined"
                  className = {classes.customTextBox_Over}
                   //inputProps={{style: {backgroundColor: 'white'}}} // font size of input text
                   //InputLabelProps={{style: {backgroundColor: 'white'}}} // font size of input label
                   InputLabelProps={{
                    classes: {
                      root: classes.textFieldLabel,
                      focused: classes.textFieldLabelFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      focused: classes.textFieldFocused,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-email"
                  label="Email"
                  variant="outlined"
                  className = {classes.customTextBox_Over}
                  InputLabelProps={{
                    classes: {
                      root: classes.textFieldLabel,
                      focused: classes.textFieldLabelFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      focused: classes.textFieldFocused,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-pw"
                  label="Password"
                  type="password"
                  variant="outlined"
                  className = {classes.customTextBox_Over}
                  InputLabelProps={{
                    classes: {
                      root: classes.textFieldLabel,
                      focused: classes.textFieldLabelFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      focused: classes.textFieldFocused,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item>
              <Button
              variant="outlined"              
              type="submit"
              className="button-block"
              style = {{background: '#FBBD14',
                        border: 'solid 1px #FFF',
                        color: '#FFF',
                        fontFamily:'Montserrat SemiBold',
                        fontSize: '16px'}}
                onClick={register}
              >
                Sign Up
              </Button>

              </Grid>
            </Grid>
          </Paper>
          </ThemeProvider>
          </div>
            </Fade>
        </Grid>
      </Grid>
  </div>
  );
}

export default Login;

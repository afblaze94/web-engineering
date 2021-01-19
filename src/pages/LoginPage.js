import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useHistory, Redirect, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { loginAction } from "../redux/actions/authActions";
import ForgetPasswordDialog from "../components/layout/ForgetPasswordDialog";
import OtherLogin from "../components/layout/OtherLogin";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright ©OSMeS "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    display: "block",
    width: "auto",
    height: "110%",
  },
  logoNew: {
    display: "block",
    width: "75%",
    height: "50%",
    padding: "20px 50px ",
  },
}));

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  const firebase = useSelector((state) => state.firebase);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
    dispatch(loginAction(credentials));
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  if (!firebase.auth.isEmpty && firebase.auth.isLoaded)
    return <Redirect to="/" />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid align="center">
          <NavLink position="static" className={classes.link} to="/">
            <img
              alt="osmes"
              src={"images/logo.png"}
              className={classes.logoNew}
            />
          </NavLink>
        </Grid>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {firebase.authError ? (
          <Typography
            style={{ color: "red", paddingTop: "5px" }}
            variant="body2"
          >
            {firebase.authError}
          </Typography>
        ) : null}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={handleClickOpen}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => history.push("/signup")}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <OtherLogin />
      <Box mt={8}>
        <Copyright />
      </Box>

      <ForgetPasswordDialog open={open} setOpen={setOpen} />
    </Container>
  );
}

import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory, Redirect, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { signupAction } from "../redux/actions/authActions";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    display: "block",
    width: "auto",
    height: "auto",
  },
  logoNew: {
    display: "block",
    width: "75%",
    height: "50%",
    padding: "20px 50px",
  },
}));

export default function SignupPage() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "female",
  });
  const classes = useStyles();
  const history = useHistory();
  const firebase = useSelector((state) => state.firebase);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupAction(newUser, history));
  };

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.id]: e.target.value,
    });
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="Phone Number"
                type="tel"
                id="phone"
                autoComplete="phone"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={newUser.gender}
                  onChange={handleChange}
                >
                  <Grid>
                    <FormControlLabel
                      value="female"
                      control={<Radio id="gender" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio id="gender" />}
                      label="Male"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => history.push("/login")}
              >
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

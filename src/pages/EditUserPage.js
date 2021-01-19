import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../configs/firebaseConfig"
import { useHistory, useParams, Redirect, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
import TextField from "@material-ui/core/TextField";
import { useFirestoreConnect } from "react-redux-firebase";

import { editUserAction} from "../redux/actions/authActions"
import userEvent from "@testing-library/user-event";
import { isLoaded } from "react-redux-firebase";
import ButtonAppBar from "../components/ButtonAppBar"
import { FontDownload } from "@material-ui/icons";


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
    root: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    formControl: {
        width: "100%",
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
        width: "50%",
        height: "50%",
        padding: "20px 50px 10px 50px",
    },

    label: {
        
    },

    input: {
        width: "100%",
        height: "50px",
        padding: "5px",
        borderRadius: "5px",
        borderWidth: "1px",
        fontSize: "16px",
        borderColor: "#003cbd"
    },
}));


export default function EditUserPage() {
    const [editUser, setUser] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        gender: "",
        lastView: "",
        lastSecondView: "",
    });

    const auth = useSelector((state) => state.firebase.profile);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    useFirestoreConnect([
        {
            collection: "users",
            doc: id,
            storeAs: "ep",
        },
    ]);

    useEffect(() => {
        if (auth) {
            setUser({
                firstName: auth.firstName,
                lastName: auth.lastName,
                phone: auth.phone,
                gender: auth.gender,
                lastView: auth.lastView,
                lastSecondView: auth.lastSecondView,
          });
        }
    }, [auth]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editUserAction(editUser, history));
    };

    const handleChange = (e) => {
        setUser({
        ...editUser,
        [e.target.id]: e.target.value,
        });
    };
    var logoURL = "images/logo.png";
    return (
        <React.Fragment>
            <CssBaseline />
            <ButtonAppBar />
            <Container component="main" maxWidth="xs">
                <div className={classes.root}>
                    <Typography component="h1" variant="h4" align="center">
                        <h4>Profile Management</h4>
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2} >
                            <Grid item xs={12} >
                                <Typography variant="body2" color="textSecondary" align="left">
                                    {"First Name*"}
                                </Typography>
                                <label>
                                    <input className={classes.input} type="text" id="firstName" name="firstName" defaultValue={auth.firstName} onChange={handleChange} />
                                </label>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="body2" color="textSecondary" align="left" >
                                    {"Last Name*"}
                                </Typography>
                                <label>
                                    <input className={classes.input} type="text" id="lastName" name="lastName" defaultValue={auth.lastName} onChange={handleChange} />
                                </label>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="body2" color="textSecondary" align="left">
                                    {"Phone Number*"}
                                </Typography>
                                <label>
                                    <input className={classes.input} type="text" id="phone" name="phone" defaultValue={auth.phone} on onChange={handleChange} />
                                </label>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup 
                                    name="gender"
                                    value={auth.gender}
                                    onChange={handleChange}>
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
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Save
                        </Button>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </React.Fragment>
    );
}

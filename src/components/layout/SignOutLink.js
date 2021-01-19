import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "300px",
  },
}));

const SignOutLink = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Button color="inherit" onClick={() => history.push("/login")}>
        Log In
      </Button>
      <div
        style={{
          display: "inline",
          borderLeft: "1px solid blue",
          height: "30px",
        }}
      ></div>
      <Button color="inherit" onClick={() => history.push("/signup")}>
        Sign Up
      </Button>
    </div>
  );
};

export default SignOutLink;

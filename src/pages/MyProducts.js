import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

import ButtonAppBar from "../components/ButtonAppBar";
import MyProductsTabs from "../components/Product/MyProductsTabs";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: "10px",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    textAlign: "right",
    padding: "0px 0px 10px",
  },
}));

export default function MyProducts() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <CssBaseline />
      <ButtonAppBar />
      <Container component="main">
        <div className={classes.main}>
          <div className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/addproduct")}
            >
              Add New Product
            </Button>
          </div>
          <MyProductsTabs />
        </div>
      </Container>
    </React.Fragment>
  );
}

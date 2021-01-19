import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import ButtonAppBar from "../components/ButtonAppBar";
import ViewProduct from "../components/Product/ViewProduct";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: "10px",
    flexDirection: "column",
    alignItems: "center",
  },

}));

export default function LandingPage() {
  const classes = useStyles();

    return (
      <React.Fragment>
        <CssBaseline />
        <ButtonAppBar />
        <Container component="main">
          <div className={classes.main}>
            <ViewProduct/>
          </div>
        </Container>
      </React.Fragment>
    );
  
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from "react-redux";
import ButtonAppBar from "../components/ButtonAppBar";
import ViewProduct from "../components/Product/ViewProduct";
import Recommendation from "../components/Product/Recommendation"
import { isEmpty } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: "10px",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function LandingPage() {
  const classes = useStyles();
  const auth = useSelector((state) => state.firebase.profile);

  if(isEmpty(auth)){
    return (
      <React.Fragment>
        <CssBaseline />
        <ButtonAppBar />
        <Container component="main">
          <div className={classes.main}>
            {/* <Recommendation/> */}
            <ViewProduct/>
          </div>
        </Container>
      </React.Fragment>
    );
  }

  if(!isEmpty(auth)){
    return (
      <React.Fragment>
        <CssBaseline />
        <ButtonAppBar />
        <Container component="main">
          <div className={classes.main}>
            <Recommendation/>
            <ViewProduct/>
          </div>
        </Container>
      </React.Fragment>
    );
  } 
}

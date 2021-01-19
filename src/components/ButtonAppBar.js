import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import { themeColors } from "../styles/colors";

import { Link } from "react-router-dom";
import SignInLink from "./layout/SignInLink";
import SignOutLink from "./layout/SignOutLink";
import ViewProduct from "./Product/ViewProduct";
import Container from "@material-ui/core/Container";
import ProductSummary from "./Product/ProductSummary";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    background: `linear-gradient(${themeColors.blue2},transparent)`,
    backgroundColor: `${themeColors.blue3}` /*this your primary color*/,
    height: "130px",
  },
  logo: {
    // display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block"
    // }
    display: "block",
    width: "auto",
    height: "80%",
    padding: "20px 50px",
  },
  logoNew: {
    display: "block",
    width: "auto",
    height: "80%",
    padding: "20px 50px 10px 50px",
  },
  link: {
    display: "block",
    width: "auto",
    height: "110%",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const trending = [
    "Face Mask 3ply",
    "Hand Sanitizer 50ml",
    "Paracetamol 50mg",
  ];
  const auth = useSelector((state) => state.firebase.auth);
  const filteredProducts = useSelector(
    (state) => state.firestore.ordered.products
  );
  // console.log("fil",filteredProducts);
  const history = useHistory();

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    console.log(search);
    const x = "8MwcWMEEmd5nouWLt0kO";
    let path = "searchProduct/" + search;
    //let path = "Product/"+x;
    console.log("to push", path);
    history.push(path);

    //setQuery(search);
    // return (
    //   <div>
    //     helloooooooooooooooooooooooo
    //     <Container component="main">
    //            <div>
    //             <Grid container spacing={2} justify="center">
    //               {filteredProducts &&
    //                 filteredProducts.map((products) => {
    //                   return (
    //                     <Link to={"/product/" + products.id}>
    //                       <ProductSummary
    //                         products={products}
    //                         key={products.id}
    //                       />
    //                     </Link>
    //                   );
    //                 })}
    //             </Grid>
    //           </div>
    //         </Container>
    //   </div>
    // );
  };

  // handleChange = (e) =>{
  //   console.log(e)
  // }
  var logoURL = "images/logo.png";

  if (history.location.pathname !== "/") {
    var len = history.location.pathname.split("/").length - 1;
    for (var i = 0; i < len; i++) {
      logoURL = "../" + logoURL;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Link position="static" className={classes.link} to="/">
            <img src={logoURL} alt="osmes" className={classes.logoNew} />
          </Link>
          {/* //press ther image then will navigate to homepage */}
          {/* <img src={"images/logo.png"} alt="tms" className={classes.logo} /> */}
          <Grid container spacing={1} style={{ margin: "0px 0px 0px 30px" }}>
            <Grid item xs={12}>
              {trending.map((str, i) => (
                <div key={i} style={{ display: "inline", marginRight: "30px" }}>
                  {str}
                </div>
              ))}
            </Grid>
            <Grid item xs={12}>
              {/* <SearchBar
                type = "text"
                value={search}
                onChange={updateSearch}
                //onRequestSearch={getSearch}
                // value={this.state.value}
                 //onChange={this.handleChange}
              /> */}
              <form
                onSubmit={() => history.push("/searchProduct", { search })}
                className="App"
              >
                <input
                  className="search-bar"
                  type="text"
                  placeholder="Product Name"
                  value={search}
                  onChange={updateSearch}
                ></input>
              </form>
            </Grid>
          </Grid>

          {isLoaded(auth) && !isEmpty(auth) ? <SignInLink /> : <SignOutLink />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

import { Divider } from "@material-ui/core";
import React, {useEffect, useState} from 'react'
import { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProductList from "./ProductList";
import ProductSummary from "./ProductSummary";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import SearchBar from "../SearchBar";
//import firebase from "./configs/firebaseConfig";
import firebase from "../../configs/firebaseConfig";
import { Link } from "react-router-dom";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import ViewSearchProduct from "./ViewSearchProduct"
import ButtonAppBar from "../ButtonAppBar";


export default ({history,location}) => {

  var searchQuery = JSON.stringify(location.state);
  var query = searchQuery.substring(11, searchQuery.length - 2);


   // const filteredProducts = products.filter(products => {
  //   return products.name.toLowerCase().includes(search.toLowerCase())
  // })

  //console.log("quert", searchQuery);
  
  //  filteredProducts = products.filter((products) => {
  //   return (
  //     products.name
  //       .toLowerCase()
  //       .indexOf(this.state.search.toLowerCase()) !== -1
  //   );
  // });

  

  
  return (
    <React.Fragment>
      <CssBaseline />
      {/* <ButtonAppBar /> */} 
      {/* cannot put app bar because cannot read the search query after it rerendered */}
      <Container component="main">
        <div>
          <ViewSearchProduct keyword={query}/>
        </div>
      </Container>
    </React.Fragment>
  );

}
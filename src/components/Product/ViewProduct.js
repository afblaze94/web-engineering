import { Divider } from "@material-ui/core";
import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProductList from "./ProductList";
import ProductSummary from "./ProductSummary";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import SearchBar from "../SearchBar";
import firebase from "../../configs/firebaseConfig";
import { Link } from "react-router-dom";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {
  Box,
  CssBaseline,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

class ViewProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
    };
  }

  updateSearch(event) {
    if(event.target.value=="View All"){
      this.setState({ search: "" });
    }else{
      this.setState({ search: event.target.value });
    }
  }

  render() {
    let filteredProducts = this.props.products;
    let productscategory = this.props.category;
    if (this.state.search === "") {
      return (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4" align="center" style={{fontSize:"30px", marginTop:"30px"}}>
              <b>View Products</b>
            </Typography>
          </div>
          <div style={{ paddingLeft: "65px" }}>
            {/* <input
              style={{ width: "250px", paddingLeft: "80px" }}
              type="text"
              placeholder="Category"
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
            /> */}
            <Grid item xs={12} sm={6}>
              <FormControl style={{width:"35%"}} required>
                <InputLabel>Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  value={this.state.search}
                  onChange={this.updateSearch.bind(this)
                    //setProduct({ ...product, category: e.target.value });
                  }
                  >
                  {productscategory &&
                    productscategory.map((category, index) => (
                      <MenuItem key={index} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
          </div>
          <div>
            <Container component="main">
              <div>
                <Grid container spacing={2} justify="center">
                  {filteredProducts &&
                    filteredProducts.map((products) => {
                      return (
                        <Link key={products.id} to={"/product/" + products.id} style={{ textDecoration: 'none' }}>
                          <ProductSummary
                            products={products}
                            key={products.id}
                          />
                        </Link>
                      );
                    })
                  }
                </Grid>
              </div>
            </Container>
          </div>
        </div>
      );
    } 
    else {
      let filteredProducts = this.props.products.filter((products) => {
        return (
          products.category
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1
        );
      });
      return (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            >
            <Typography component="h1" variant="h4" align="center" style={{fontSize:"30px", marginTop:"30px"}}>
              <b>View Products</b>
            </Typography>
          </div>
          <div style={{ paddingLeft: "65px" }}>
            {/* <input
              style={{ width: "250px", paddingLeft: "80px" }}
              type="text"
              placeholder="Category"
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
            /> */}
            <Grid item xs={12} sm={6}>
              <FormControl style={{width:"35%"}} required>
                <InputLabel>Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  value={this.state.search}
                  onChange={this.updateSearch.bind(this)
                    //setProduct({ ...product, category: e.target.value });
                  }
                  >
                  {productscategory &&
                    productscategory.map((category, index) => (
                      <MenuItem key={index} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>  
          </div>
          <div>
            <Container component="main">
              <div>
                <Grid container spacing={2} justify="center">
                  {filteredProducts &&
                    filteredProducts.map((products) => {
                      return (
                        <Link to={"/product/" + products.id} style={{ textDecoration: 'none' }}>
                          <ProductSummary
                            products={products}
                            key={products.id}
                          />
                        </Link>
                      );
                    })
                  }
                </Grid>
              </div>
            </Container>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.firestore.ordered.products,
    filteredProducts: state.firestore.ordered.products,
    category: state.firestore.ordered.category,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "products" },{
    collection: "categories",
    storeAs: "category",
  },])
)(ViewProduct);

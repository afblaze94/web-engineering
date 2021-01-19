import { Divider } from "@material-ui/core";
//import React, {useEffect, useState} from 'react'
import React, { Component } from "react";
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

class ViewProduct extends React.Component {
    constructor() {
        super();
        this.state = {
        search: "",
        };
    }

    updateSearch(event) {
        this.setState({ search:event.target.value });
    }

    render() {
        const x = this.props.keyword;

        if (this.state.search === "") {
            this.state.search = x;
        }

    console.log("search query",this.state.search)
    let filteredProducts = this.props.products.filter((products) => {
        return (
            products.name
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
                    <h2>Search Results</h2>
                </div>
                {/* <div style={{ paddingLeft: "150px" }}>
                    <input
                    style={{ width: "250px", paddingLeft: "80px" }}
                    type="text"
                    placeholder="Product Name"
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
                    />
                    <input
                    style={{ width: "250px", paddingLeft: "80px" }}
                    type="text"
                    placeholder="Product Name"
                    value={this.props.keyword}
                    onMouseOverCapture={this.updateSearch.bind(this)}
                    onChange={this.updateSearch.bind(this)}
                    />
                </div> */}
                <div>
                    {/* <ProductList products = {products} /> */}
                    <Container component="main">
                    <div>
                        <Grid container spacing={2} justify="center">
                        {/* {products && products.map(products => { */}
                        {filteredProducts &&
                            filteredProducts.map((products) => {
                            return (
                                <Link to={"/product/" + products.id}>
                                <ProductSummary
                                    products={products}
                                    key={products.id}
                                />
                                </Link>
                            );
                            })}
                        </Grid>
                    </div>
                    </Container>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    products: state.firestore.ordered.products,
    filteredProducts: state.firestore.ordered.products,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "products" }])
)(ViewProduct);

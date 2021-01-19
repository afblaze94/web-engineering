import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import ProductSummary from './ProductSummary'
import {Link} from 'react-router-dom'
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    main: {
        paddingTop: "20px",
        flexDirection: "column",
        alignItems: "center",
    },
}));

  
const ProductList = ({products}) => {
    console.log({products});
    const classes = useStyles();
    return(
        <Container component="main">
            <div className={classes.main}>
                <Grid container spacing={2} justify="center">
                    {products && products.map(products => {
                        return(
                            <Link to ={'/product/' + products.id}>
                                <ProductSummary products = {products} key={products.id} />
                            </Link>
                        )
                    })}
                </Grid>
            </div>
        </Container>
    )
}

export default ProductList

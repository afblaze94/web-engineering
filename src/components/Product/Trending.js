import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RecommendProductSummary from "./RecommendProductSummary";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import firebase from "../../configs/firebaseConfig";
import { Link } from "react-router-dom";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    tabs: {
        padding: "30px 0px",
        flexGrow: 1,
        borderRight: `1px solid ${theme.palette.divider}`,
        maxWidth: "250px",
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
    trending: {
        color:"000000",
    },
}));
  
export default function Trending() {

    const classes = useStyles();
    const auth = useSelector((state) => state.firebase.profile);
    const lastView = auth.lastView;
    const lastSecondView = auth.lastSecondView;

    useFirestoreConnect([
        {
            collection: "products",
            where: [["category", "==", "Face Masks"]],
            orderBy: "brand",
            storeAs: "trendingProducts",
            limit: "2"
        },
        {
            collection: "products",
            where: [["category", "==", "Thermometer"]],
            orderBy: "brand",
            storeAs: "trendingProducts2",
            limit: "1"
        },
    ]);

    const trendingProducts = useSelector((state) => state.firestore.ordered.trendingProducts);
    const trendingProducts2 = useSelector((state) => state.firestore.ordered.trendingProducts2);

    return (
        <div>
            <Grid item xs={12}>                    
                <Grid container justify="center" spacing={0}>
                    {trendingProducts &&
                        trendingProducts.map((products) => {
                            return (
                                <div style={{display: "inline", marginRight:"30px", marginBottom:"10px"}}> 
                                    <Link key={products.id} to={"/product/" + products.id} 
                                        style={{ textDecoration: 'none', color:'#FFFFFF', fontSize:'15px' }}
                                        >
                                        {products.name}
                                    </Link>
                                </div>
                            );
                        })
                    }
                    {trendingProducts2 &&
                        trendingProducts2.map((products) => {
                            return (
                                <div style={{display: "inline", marginRight:"30px", marginBottom:"10px"}}>
                                    <Link key={products.id} to={"/product/" + products.id} 
                                        style={{ textDecoration: 'none', color:'#FFFFFF', fontSize:'15px' }}
                                        >
                                        {products.name}
                                    </Link>
                                </div>
                            );
                        })
                    }
                </Grid>                
            </Grid>                                
        </div>
    );    
}
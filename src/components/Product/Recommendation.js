import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RecommendProductSummary from "./RecommendProductSummary";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
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
}));
  
export default function Recommendation() {

    const classes = useStyles();
    const auth = useSelector((state) => state.firebase.profile);
    const lastView = auth.lastView;
    const lastSecondView = auth.lastSecondView;

    useFirestoreConnect([
        {
            collection: "products",
            where: [["category", "==", lastView]],
            orderBy: "brand",
            storeAs: "recommendProducts",
            limit: "3"
        },
        {
            collection: "products",
            where: [["category", "==", lastSecondView]],
            orderBy: "brand",
            storeAs: "recommendProducts2",
            limit: "3"
        },
    ]);

    const recommendProducts = useSelector((state) => state.firestore.ordered.recommendProducts);
    const recommendProducts2 = useSelector((state) => state.firestore.ordered.recommendProducts2);

    if (isEmpty(auth)) {
        return (
            <div    
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5" align="center">
                    <h4>Recommendations</h4>
                    <h5>Loading...</h5>
                </Typography>            
            </div>
        ); ;
      }

    if (!isLoaded(recommendProducts)) {
        return (
            <div    
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5" align="center">
                    <h4>Recommendations</h4>
                    <h5>Loading...</h5>
                </Typography>            
            </div>
        ); 
      }

    return (
        <div>
            <div    
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography component="h3" variant="h4" align="center" style={{fontSize:"25px", margin:"15px"}}>
                    <b>Recommendations</b>
                </Typography>            
            </div>
            <Grid item xs={12}>                    
                <Grid container justify="center" spacing={0}>
                    {recommendProducts &&
                        recommendProducts.map((products) => {
                            return (
                                <Link key={products.id} to={"/product/" + products.id} style={{ textDecoration: 'none' }}>
                                    <RecommendProductSummary
                                        products={products}
                                        key={products.id}
                                    />
                                </Link>
                            );
                        })
                    }
                    {recommendProducts2 &&
                        recommendProducts2.map((products) => {
                            return (
                                <Link key={products.id} to={"/product/" + products.id} style={{ textDecoration: 'none' }}>
                                    <RecommendProductSummary
                                        products={products}
                                        key={products.id}
                                    />
                                </Link>
                            );
                        })
                    }
                </Grid>                
            </Grid>                                
        </div>
    );    
}
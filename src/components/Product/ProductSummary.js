import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";



const useStyles = makeStyles((theme) => ({
    main: {
      paddingTop: "20px",
      flexDirection: "column",
      alignItems: "center",
    },
    media: {
        height: 50,
        paddingTop: '100%',
      },
      root: {
        maxWidth: 400,
        maxHeight: 400,
        width: 250,
        height:400,
      },
  }));

  const BlueTextTypography = withStyles({
    root: {
      color: "#001eb3"
    }
  })(Typography);


const ProductSummary = ({products}) => {
    const classes = useStyles();
    //console.log(products);
    return (
        <React.Fragment>
            <CssBaseline />
            <Container component="main">
                <div className={classes.main}>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={10} key={products.id}>
                            <Card  className={classes.root}>
                            <CardMedia
                            className={classes.media}
                            image= {products.images?products.images[0].url:null}
                            title= {products.name}
                            />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" align="center">
                                        {products.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                        >
                                        {products.desc}    
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                        >
                                        <b>RM: {products.price} </b>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default ProductSummary

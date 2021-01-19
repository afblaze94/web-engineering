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
import { Height } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    main: {
        paddingTop: "20px",
        flexDirection: "column",
        alignItems: "center",
    },
    media: {
        paddingRight: '100%',
        width: 10,
        height: 10,
        paddingTop: '100%',
    },
      root: {
        maxWidth: 360,
        maxHeight: 700,
        width: 155,
        height: 290
    },
}));

const BlueTextTypography = withStyles({
    root: {
        color: "#001eb3"
    }
})(Typography);


const RecommendProductSummary = ({products}) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <Container component="main">
                <div className={classes.main}>
                    <Grid container spacing={1}>
                        <Grid item xs={1} key={products.id}>
                            <Card  className={classes.root}>
                                <CardMedia
                                className={classes.media}
                                image= {products.images?products.images[0].url:null}
                                title= {products.name}
                                />
                                <CardContent>
                                    <div style={{height:"90px", align:"center"}}>
                                        <Typography gutterBottom variant="h5" component="h2" align="center" style={{fontSize:"20px"}}>
                                            {products.name.slice(0, 43)}
                                        </Typography>
                                    </div>
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

export default RecommendProductSummary

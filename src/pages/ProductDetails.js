import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect, NavLink } from "react-router-dom";
import { clickProductAction} from "../redux/actions/authActions"

import ButtonAppBar from "../components/ButtonAppBar";
import { CssBaseline } from '@material-ui/core';
import ReactImages from "../components/Utils/ReactImages";
import ReactCarousel from "../components/Utils/ReactCarousel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";


const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 50,
    paddingTop: '100%', 
  },
  main: {
      paddingTop: "20px",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: "35%",
      paddingBottom: "20px",
  },
});

const BlueTextTypography = withStyles({
  root: {
    color: "#001eb3"
  }
})(Typography);
 
const  ProductDetails = (props) => {
  const classes = useStyles();
  const { product } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.profile);

  var images = [];
  product.images.forEach((image) => {
    images.push(image.url);
  });
  const [category, setCategory] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    lastView: "",
    lastSecondView: "",
});

  const loadProduct = () => {
    dispatch(clickProductAction(category, history));
  };

  useEffect(() => {
    if (product) {
      if(auth.lastView==product.category){
        setCategory({
          firstName: auth.firstName,
          lastName: auth.lastName,
          phone: auth.phone,
          gender: auth.gender,
          lastSecondView: auth.lastSecondView,
          lastView: auth.lastView,
        });
      } else{
          setCategory({
            firstName: auth.firstName,
            lastName: auth.lastName,
            phone: auth.phone,
            gender: auth.gender,
            lastSecondView: auth.lastView,
            lastView: product.category,
          });
        }
    }
  }, [product]);

  if (product) {
    loadProduct();
      return (
        <React.Fragment>
          <CssBaseline />
          <ButtonAppBar />
          <div className={classes.main}>
            <Card className={classes.root}>
              <CardActionArea>
                <div style={classes.images}>
                  <ReactCarousel images={images} />
                </div>
                <CardContent>
                  <BlueTextTypography gutterBottom variant="h5" component="h2" align="center">
                    {product.name}
                  </BlueTextTypography>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableBody>
                      <TableRow>
                          <TableCell component="th" scope="row">
                            Price (RM)
                          </TableCell>
                          <TableCell align="right">
                            <b>{product.price}</b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Category
                          </TableCell>
                          <TableCell align="right">
                            <b>{product.category}</b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell width="250px" component="th" scope="row">
                            Stock
                          </TableCell>
                          <TableCell align="right">
                            <b>{product.stock}</b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Brand
                          </TableCell>
                          <TableCell align="right">
                            <b>{product.brand}</b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Ship From
                          </TableCell>
                          <TableCell align="right">
                            <b>{product.shipFrom}</b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Seller
                          </TableCell>
                          <TableCell align="right">
                            <b>{product.sellerName}</b>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
                <Button size="small" color="primary">
                  Buy Now
                </Button>
              </CardActions>
            </Card>
          </div>
        </React.Fragment>
      );
  } else {
      return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      )
    }
}

const mapStateToProps = (state, ownProps) =>{
  const id = ownProps.match.params.id;
  const products = state.firestore.data.products;
  const product = products ? products[id] : null
  return {
    product: product
  }
}


export default compose (
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'products'}
  ])
)(ProductDetails)

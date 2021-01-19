import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";


import ButtonAppBar from "../components/ButtonAppBar";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DropzoneArea } from "material-ui-dropzone";

import { addProduct } from "../redux/actions/productActions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formControl: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddProductFrom() {
  const [product, setProduct] = useState({
    name: "",
    stock: 0,
    price: 0.0,
    category: "",
    brand: "Shopee",
    shipFrom: "",
    // spec: {},
    desc: "",
  });
  const [images, setImages] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.firestore.ordered.categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(product);
    // console.log(images);
    dispatch(addProduct(product, images, history));
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.id]: e.target.value,
    });
  };

  const handleImages = (img) => {
    setImages(img);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ButtonAppBar />
      <Container component="main" maxWidth="sm">
        <div className={classes.root}>
          <Typography component="h1" variant="h5">
            Fill in Product Detail
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* name */}
              <Grid item xs={12}>
                <TextField
                  label="Product Name"
                  id="name"
                  required
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              {/* stock */}
              <Grid item xs={12} sm={6}>
                <Input
                  id="stock"
                  label="Stock"
                  type="number"
                  value={product.stock}
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  placeholder="Product Stock"
                  style={{height:'48px'}}
                  required
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              {/* price */}
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} required>
                  <InputLabel>Price</InputLabel>
                  <Input
                    id="price"
                    value={product.price}
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="start">RM </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              {/* categories */}
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    value={product.category}
                    onChange={(e) => {
                      setProduct({ ...product, category: e.target.value });
                    }}
                  >
                    {categories &&
                      categories.map((category, index) => (
                        <MenuItem key={index} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* brand */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product Brand"
                  id="brand"
                  required
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              {/* shipfrom */}
              <Grid item xs={12}>
                <TextField
                  label="Ship From"
                  id="shipFrom"
                  required
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              {/* desc */}
              <Grid item xs={12}>
                <TextField
                  id="desc"
                  label="Product Description"
                  multiline
                  fullWidth
                  variant="outlined"
                  required
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box height="5px" />
            <DropzoneArea onChange={handleImages} />

            <Grid container justify="flex-end">
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}

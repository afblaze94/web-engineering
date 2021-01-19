import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

import ReactCarousel from "../Utils/ReactCarousel";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
    border: "1px solid skyblue",
  },
  tabs: {
    padding: "30px 0px",
    flexGrow: 1,
    borderRight: `1px solid ${theme.palette.divider}`,
    maxWidth: "250px",
  },
}));

export default function MyProductsTabs() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const uid = useSelector((state) => state.firebase.auth.uid);
  useFirestoreConnect([
    {
      collection: "products",
      where: [["seller", "==", uid]],
      storeAs: "myproducts",
    },
  ]);

  const myProducts = useSelector((state) => state.firestore.ordered.myproducts);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!isLoaded(myProducts)) {
    return <div>Loading</div>;
  }

  if (isEmpty(myProducts)) {
    return <div>You do not have any products on sales</div>;
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        indicatorColor="primary"
        textColor="primary"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {myProducts.map((product, index) => (
          <Tab key={product.id} label={product.name} {...a11yProps(index)} />
        ))}
      </Tabs>
      <div style={{ flexGrow: "2" }}>
        {myProducts.map((product, index) => (
          <TabPanel key={product.id} value={value} index={index}>
            {MyProductDetail(product, history)}
          </TabPanel>
        ))}
      </div>
    </div>
  );
}

function MyProductDetail(product, history) {
  const classes = {
    root: {},
    images: {
      height: "auto",
      maxWidth: "300px",
      width: "100%",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
  };

  var images = [];
  product.images.forEach((image) => {
    images.push(image.url);
  });

  return (
    <div style={classes.root}>
      <Typography variant="h6" gutterBottom>
        {product.name}
      </Typography>
      {/* <div style={classes.images}>
        <ReactImages images={images} />
      </div> */}
      <div style={classes.images}>
        <ReactCarousel images={images} />
      </div>

      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Stock
              </TableCell>
              <TableCell align="right">
                <b>{product.stock}</b>
              </TableCell>
            </TableRow>
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
          </TableBody>
        </Table>
      </TableContainer>
      <p align="right">
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => history.push(`/editproduct/${product.id}`)}
        >
          Edit
        </Button>
      </p>
    </div>
  );
}

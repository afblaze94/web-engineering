import React, { useState } from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import ButtonAppBar from "../components/ButtonAppBar";
import { CssBaseline } from '@material-ui/core';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { deleteItem } from '../redux/actions/cartActions';
import { addOrder } from '../redux/actions/productActions';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
const  CheckoutList = (props) => {
    console.log(props);
    // props.cart.cartReducer.map(item)
  const [openVar,setOpenVar]=useState({
    open:false
  })
  const [address, setAddress] = useState('');
  const deleteId=(deleteid)=>{
    const { deleteItem } = props;
    deleteItem(deleteid);
  }
  const handleChange = (e) => {
      console.log(e.target.value);
    setAddress(e.target.value);
  };
  const createOrder=(cartItems,totalPrice)=>{
    const { addOrder } = props;
    addOrder(cartItems,totalPrice,address);
  }
  const addClick = (product) => {
    console.log("in add click");
    setOpenVar({ open: true });
    // console.log(props.match.params.id+'');
    // var productOld=product;
    // var newProduct=Object.assign({id:props.match.params.id+''},productOld);
    // product.id=props.match.params.id;
    // const { addItem } = props;
    //  addItem(newProduct);
  };
    const classes = useStyles();
  
    const  product  = true;
  
    if (product) {
        return (
          <React.Fragment>
            <CssBaseline />
            <ButtonAppBar />
            <div className={classes.main} style={{padding:'15px'}}>
                <h3>Checkout</h3>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cart.cartReducer.cartItems.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">          <img className="img-fluid" width="50px" src={row.images[0].url} alt={row.name} />
</TableCell>
              <TableCell align="right">{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.price*row.qty}</TableCell>
              <TableCell align="right" onClick={()=>deleteId(row.id)} ><DeleteForeverIcon  /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <h2 style={{float:'right'}}> Total <strong>RM {props.cart.cartReducer.totalPrice}</strong></h2>
    <br></br>
    <br></br>
    <br></br>
    {props.cart.cartReducer.cartItems.length>0?(  <div className="text-center">
          
    <TextField id="standard-basic" label="Enter Address" onChange={handleChange} style={{width:'600px'}} variant="outlined" />
          <Button variant="contained" onClick={()=>createOrder(props.cart.cartReducer.cartItems,props.cart.cartReducer.totalPrice)} style={{marginLeft:'10px',marginTop:'8px'}} color="primary" >
            Pay 
          </Button>
        </div>):(  <div className="text-center">
          <button type="button" className="btn-custom disabled" disabled>
            No Items to Checkout
          </button>
        </div>)}
        <br></br>
            </div>
          </React.Fragment>
        );
    } 
    

    else {
        return (
            <div className="container center">
                <p>Sorry No Cart Items Available in the checkout list...</p>
            </div>
        )
    }
    
}

const mapStateToProps = (state, ownProps) =>{
   return {
       cart:state,
       
   }
    
}


export default compose (
    connect(mapStateToProps,{deleteItem,addOrder}),
    firestoreConnect([
        {collection: 'products'}
    ])
)(CheckoutList)

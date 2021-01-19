import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import { makeStyles } from '@material-ui/core/styles';

import ButtonAppBar from "../components/ButtonAppBar";
import { CssBaseline } from '@material-ui/core';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const MyPurchase = (props) => {
    const [orders, setOrders] = useState(props.orders);
    console.log(orders);
    console.log(props);
    // // props.cart.cartReducer.map(item)
    //  setOrders(props.orders)
    const classes = useStyles();

    const product = true;


    return (
        <React.Fragment>
            <CssBaseline />
            <ButtonAppBar />
            <div className={classes.main} style={{ margin: '30px' }}>
                <h3>My Orders</h3>
                {props?.orders?.map((row, index) => (
                    <>
                        <div className="row" style={{ 'backgroundColor': 'white', borderRadius: '6px', 'padding': '21px' }}>
                            <div className="col-8" style={{'borderBottom':'1px solid'}}><h5>ORDER ID : <strong>{row.id}</strong></h5></div>
                            <div className="col-2" style={{'borderBottom':'1px solid'}}><h6> {row.address}</h6></div>
                            <div className="col-2" style={{'borderBottom':'1px solid'}}>
                                {/* <div 
                                
                                style={{backgroundColor: '#171b17',height: '26px',width: '110px',padding: '4px',color: 'white',fontFamily: 'Lato',borderRadius: '4px'}}
                                
                                
                                ><h6><strong>
                                {row.deliveryStatus}
                                </strong></h6></div> */}
                                <span class="badge bg-primary" style={{paddingTop:'12px',backgroundColor:'#073d8c!important'}}><h6><strong>
                                {row.deliveryStatus}
                                </strong></h6></span>
                                </div>
                            {row.cartitems.map((item, index) => (
                                <div className="row">
                                    <div className="col-1">          <img className="img-fluid" width="100px" src={item.images[0].url} alt={item.name} />
                                    </div>
                                    <div className="col-9"><br></br>{item.name } ({item.category})<br></br>
                                    X {item.qty}
                                    </div>
                                    <div className="col-2"><br></br>RM {item.price*item.qty}</div>
                                </div>
                            ))}
                        <div className="row">
                        <div className="col-10" style={{float:'right'}}> </div>
                        <div className="col-2" style={{float:'right'}}> <h6>Order Total  : <strong>{row.totalPrice}</strong></h6></div>
                        </div>
                        </div>
                        
                        <br></br>
                    </>
                ))}
                <br></br>

                <br></br>
            </div>
        </React.Fragment>
    );



}

const mapStateToProps = (state, ownProps) => {
    return {
        cart: state,
        orders: state.firestore.ordered.ordershipped,
    }

}


export default compose(
    connect(mapStateToProps, {}),
    firestoreConnect(props => [
        {
            collection: 'orders',
            storeAs: 'ordershipped',
            where: [['purchaser', '==', props.cart.firebase.auth.uid]],
        }
    ])
)(MyPurchase)

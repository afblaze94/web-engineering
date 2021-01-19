import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePrice } from '../../redux/actions/cartActions';
import Button from "@material-ui/core/Button";
import { Link, Redirect } from 'react-router-dom';
import { RotateRightSharp } from '@material-ui/icons';
import { showCart } from '../../redux/actions/cartActions';

class TotalAmount extends Component {
  state={
    redirect:false
  }
  setRedirect = () => {
    this.props.showCart();
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/checkout' />
    }
  }
 
  render() {
    console.log(this.props);
    const { totalPrice,cartItems } = this.props.cart.cartReducer;
    return (
      <div>
        {this.renderRedirect()}  
       {!this.state.redirect? <div className="total-amount">
        {/* <p style={{'color':'black'}}>
          <strong>Delivery</strong>
          <span>Free</span>
        </p> */}
        <p style={{'color':'black'}}>
          <strong>Total </strong>
         <strong>RM {totalPrice} </strong>
        </p>
        {cartItems.length>0?(  <div className="text-center">
          <Button variant="contained" onClick={this.setRedirect} color="primary" >
            Go to checkout
          </Button>
        </div>):(  <div className="text-center">
          <button type="button"  className="btn-custom disabled" disabled>
            No Items to Checkout
          </button>
        </div>)}
      
      </div>: <div></div> } 
    
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state
});

export default connect(
  mapStateToProps,
  { updatePrice,showCart }
)(TotalAmount);

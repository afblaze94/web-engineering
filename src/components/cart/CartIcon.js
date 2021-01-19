import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showCart, updatePrice } from '../../redux/actions/cartActions';
import PropTypes from 'prop-types';
import './cart.scss'
import Badge from '@material-ui/core/Badge';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cart from './Cart';

class CartIcon extends Component {
  //  useStyles =
  
  showCart = () => {
    console.log(this.props);
    const { showCart } = this.props;
    showCart();
  };

  render() {
    const StyledBadge  = withStyles((theme) => ({
      badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
      },
    }))(Badge);
    const EMPTY_CART = { cartItems: [],totalPrice:0 };
     const { cartItems, totalPrice } = this.props.cart.cartReducer;
    // const cartItems=[];
    // const totalPrice=0;

    return (
      // <div className="cart-icon ml-auto">
      //   <button type="button" onClick={this.showCart}>
      //   <i className="material-icons">shopping_cart</i>
      //     <span className="badge badge-primary">
      //       {cartItems?.reduce((acc, curr) => acc + curr.qty, 0)}
      //     </span>
      //     <span className="sr-only">products</span>
      //   </button>
      //   <p>{totalPrice} €</p>
      // </div>
      <div className="">
     <IconButton aria-label="cart" onClick={this.showCart}>
      <StyledBadge badgeContent={cartItems?.reduce((acc, curr) => acc + curr.qty, 0)} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
    <Cart/>
    </div>
    );
  }
}

CartIcon.propTypes = {
  showCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state
});

export default connect(
  mapStateToProps,
  { showCart, updatePrice }
)(CartIcon);

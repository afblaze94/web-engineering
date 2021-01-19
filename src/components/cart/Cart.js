import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { showCart, addItem } from '../../redux/actions/cartActions';
import CartItem from './CartItem';
import TotalAmount from './TotalAmount';
import {v1 as uuid} from "uuid";
import './cart.scss'
import Button from "@material-ui/core/Button";

class Cart extends Component {
  showCart = () => {
    console.log(this.props);
    const { showCart } = this.props;
    showCart();
  };

  render() {
    console.log(this.props);
    const { isOpen, cartItems } = this.props.cart.cartReducer;
    return (
      <div className={`cart ${!isOpen ? 'transparent' : ''}`}>
        <div className={`cart-inside ${isOpen ? 'active' : ''}`}>
          <h2 style={{'color':'black'}}>Shopping cart</h2>
          <Button type="button"  className="close" onClick={this.showCart}>
            &#xd7;
          </Button>
          <Scrollbars style={{ height: '65%' }}>
            <div className="items">
              {cartItems.length === 0 ? (
                <h3>
                  Nothing was added yet <i className="far fa-frown" />
                </h3>
              ) : (
                <ul>
                  {cartItems.map(item => (
                    <li key={uuid()}>
                      <CartItem item={item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Scrollbars>
          <TotalAmount />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state
});

export default connect(
  mapStateToProps,
  { showCart, addItem }
)(Cart);

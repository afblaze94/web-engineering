import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteItem, addItem, decrement } from '../../redux/actions/cartActions';
import './cart.scss'
import Button from "@material-ui/core/Button";

class CartItem extends Component {
  onClick = id => {
    const { deleteItem } = this.props;
    deleteItem(id);
  };

  increment = () => {
    const { addItem } = this.props;
    addItem(this.props.item);
  };

  decrement = id => {
    const { item } = this.props;
    if (item.qty > 1) {
      const { decrement } = this.props;
      decrement(this.props.item);
    } else {
      const { deleteItem } = this.props;
      deleteItem(id);
    }
  };

  render() {
    const { item } = this.props;
    return (
      <React.Fragment>
        <div className="img-wrapper">
          <img className="img-fluid" width="50px" src={item.images[0].url} alt={item.name} />
        </div>
        <h4 className="name" style={{'color':'black'}}>{item.name}</h4>
        <div className="quantity">
          <p style={{'color':'black'}}>
            Quantity:{' '}
            <button
              className="btn subtract"
              onClick={this.decrement.bind(this, item.id)}
            >
              -
            </button>
            {item.qty}
            <button className="btn add" onClick={this.increment.bind(this)}>
              +
            </button>
          </p>
        </div>
        <small className="price">RM {(item.price * item.qty).toFixed(2)} </small>
        <Button
          type="button"
          size="small"
          className="close"
          style={{'margin':'-12px'}}
          onClick={this.onClick.bind(this, item.id)}
        >
          &#xd7;
        </Button>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { deleteItem, addItem, decrement }
)(CartItem);

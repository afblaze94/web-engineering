import {
  SHOW_CART,
  ADD_ITEM,
  DELETE_ITEM,
  CLEAR_ITEM,
  UPDATE_PRICE,
  DECREMENT_QTY
} from './types';

export const showCart = () => {
  return { type: SHOW_CART };
};

export const addItem = product => dispatch => {
  console.log(product);
  dispatch({
    type: ADD_ITEM,
    payload: product
  });
  dispatch(updatePrice());
};

export const deleteItem = id => dispatch => {
  dispatch({
    type: DELETE_ITEM,
    payload: id
  });
  dispatch(updatePrice());
};
export const clearItem = id => dispatch => {
  dispatch({
    type: CLEAR_ITEM
  });
  
};

export const updatePrice = () => {
  return {
    type: UPDATE_PRICE
  };
};

export const decrement = product => dispatch => {
  dispatch({
    type: DECREMENT_QTY,
    payload: product
  });
  dispatch(updatePrice());
};

import {
  SHOW_CART,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_PRICE,
  CLEAR_ITEM,
  DECREMENT_QTY
} from '../actions/types';

const initialState = {
  isOpen: false,
  cartItems: [],
  totalPrice: 0
};

// eslint-disable-next-line import/no-anonymous-default-export
const cartReducer=(state = initialState, action) => {
  switch (action.type) {
    case SHOW_CART:
      console.log('inshow cart');
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case ADD_ITEM:
      const isAlreadyAdded = state.cartItems.find(
        product => product.id === action.payload.id
      );
      var oldProduct=action.payload;
      var newProduct={};
       if (!isAlreadyAdded) 
       {
         //if()
        newProduct=Object.assign({qty:1},oldProduct)
          
       }
       
        console.log(state.cartItems);
      return {
        ...state,
        cartItems: !isAlreadyAdded
          ? [newProduct, ...state.cartItems]
          : state.cartItems.map(
              item =>
                item.id === action.payload.id
                  ? {...item,qty:++item.qty}
                  : item
            )
      };
    case DELETE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
    case DECREMENT_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map(
          item =>
            item.id === action.payload.id ? { ...item, qty: --item.qty } : item
        )
      };
    case UPDATE_PRICE:
      return {
        ...state,
        totalPrice: state.cartItems
          .reduce((acc, val) => acc + val.qty * parseFloat(val.price), 0)
          .toFixed(2)
      };
    case CLEAR_ITEM:
      return {
        ...state,
        cartItems: [],
        totalPrice:0
      };
    default:
      return state;
  }
};

export default cartReducer;
const initState = {}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'RATE_PRODUCT':
        console.log('rate product', action.product)
        return state;
    case 'RATE_PRODUCT_ERROR':
        console.log('create proect error', action.err);
        return state;
    default:
        return state;
  }
}

export default productReducer
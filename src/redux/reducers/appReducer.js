const initialState = {
  loading: false,
};

export const appReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "TOGGLE_GLOBAL_LOADING":
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
};

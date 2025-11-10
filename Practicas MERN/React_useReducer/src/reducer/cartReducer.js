export const ACTIONS = {
  ADD_PRODUCT: "ADD_PRODUCT",
  REMOVE_PRODUCT: "REMOVE_PRODUCT",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_PRODUCT:
      return [...state, { ...action.payload, quantity: 1 }];

    case ACTIONS.REMOVE_PRODUCT:
      return state.filter(item => item.id !== action.payload);

    case ACTIONS.UPDATE_QUANTITY:
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    default:
      return state;
  }
};
import Type from "./action.type";

export const initialState = {
  basket: [],
  user: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      // * check if the item exists
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });

        return {
          ...state,
          basket: updatedBasket,
        };
      }
    }

    case Type.REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      }
      return {
        ...state,
        basket: newBasket,
      };
    }

    case Type.EMPTY_BASKET :
      return {
        ...state,
        basket: [],
      };
    // check the action type and set it to the new state
    case Type.SET_USER:
      return {
        // use the current State
        ...state,
        // and update the user property data
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;

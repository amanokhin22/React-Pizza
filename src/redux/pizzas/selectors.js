import {RootState} from "@reduxjs/toolkit/src/query/core/apiState";

export const selectPizza = (state: RootState) => state.pizzaSlice;

// export const selectCartItemById = (id: string) => (state: RootState) =>
//     state.cart.items.find((obj) => obj.id === id);

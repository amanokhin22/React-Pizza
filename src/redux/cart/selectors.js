import {RootState} from "@reduxjs/toolkit/src/query/core/apiState";

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cart.items.find((obj) => obj.id === id);

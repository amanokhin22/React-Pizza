
export const selectCart = (state) => state.cartSlice;

export const selectCartItemById = (id) => (state) =>
    state.cartSlice.items.find((obj) => obj.id === id);

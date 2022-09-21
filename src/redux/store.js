import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./filter/filterSlice";
import cartSlice from "./cart/cartSlice";
import pizzaSlice from "./pizzas/pizzaSlice";


export const store = configureStore({
    reducer: {
        filterSlice,
        cartSlice,
        pizzaSlice
    },
});


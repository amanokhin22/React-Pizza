import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./filter/filterSlice";


export const store = configureStore({
    reducer: {
        filterSlice
    },
});


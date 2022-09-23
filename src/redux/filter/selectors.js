import {RootState} from "@reduxjs/toolkit/src/query/core/apiState";


export const selectFilter = (state: RootState) => state.filterSlice;


import {createAsyncThunk} from "@reduxjs/toolkit";
import {PizzaItem, SearchPizzaParams} from "./types";
import axios from "axios";
import {identity, pickBy} from "lodash";

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {sortBy, category, order, search, currentPage} = params;
        const {data} = await axios.get<PizzaItem[]>(
            `https://6322e53da624bced308118bc.mockapi.io/items`,{
            params: pickBy(
                {
                    page: currentPage,
                    limit: 4,
                    category,
                    sortBy,
                    order,
                    search,
                },
                identity,
            ),
        });

        return data;
    },
);



// export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
//     'pizza/fetchPizzasStatus',
//     async (params) => {
//         const {sortBy, category, order, search, currentPage} = params;
//         const {data} = await axios.get<PizzaItem[]>(
//             `https://6322e53da624bced308118bc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
//         );
//         return data;
//     });
import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId (state, action)  {
            state.categoryId = action.payload;
        },
        // setCategoryId: (state) => {
        //     state.count += 1
        // }, Или так можно создать эту функцию. Это по редакс-тулкиту сделано, а не по редаксу
        setSort (state, action)  {
            state.sort = action.payload;
        },
    },
})

export const { setCategoryId, setSort } = filterSlice.actions

export default filterSlice.reducer
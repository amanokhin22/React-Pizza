export type PizzaItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
    rating: number;
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type SearchPizzaParams = {
    sortBy: string,
    category: string,
    order: string,
    search: string,
    currentPage: string,
};

export interface PizzaSliceState {
    items: PizzaItem[],
    status: Status,
}




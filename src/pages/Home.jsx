import React, {useContext, useEffect, useState} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/pizza-block/Skeleton";
import PizzaBlock from "../components/pizza-block/PizzaBlock";
import Pagination from "../components/pagination/pagination";
import {SearchContext} from "../App";

const Home = () => {
    const {searchValue} = useContext(SearchContext)
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    });

    useEffect(() => {
        setIsLoading(true);

        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(
            `https://6322e53da624bced308118bc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false)
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    //Такая фильтрация годится при наличии небольшого, статичного массива, тогда можно сделать поиск на базе JS без BE
    // const pizzas = items.filter(obj => {
    //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //         return true;
    //     }
    //     return false
    // }).map((obj) => <PizzaBlock key={obj.id} {...obj} />);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);


    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)}/>
                <Sort sortValue={sortType} onChangeSort={(index) => setSortType(index)}/>
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {isLoading
                    ? skeletons
                    : pizzas
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    )
}

export default Home
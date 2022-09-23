import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/filter/filterSlice";
import qs from 'qs';
import {useNavigate} from "react-router-dom";

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/pizza-block/Skeleton";
import PizzaBlock from "../components/pizza-block/PizzaBlock";
import Pagination from "../components/pagination/pagination";
import {fetchPizzas} from "../redux/pizzas/pizzaSlice";
import {selectPizza} from "../redux/pizzas/selectors";



const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {items, status} = useSelector(selectPizza);
    const {categoryId, sort, currentPage, searchValue} = useSelector((state) => state.filterSlice);


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    };

    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    };

    const getPizzas = async () => {

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

           dispatch(
               fetchPizzas({
               sortBy, category, order, search, currentPage
           }));

        window.scrollTo(0, 0);
    };
//Если не было первого рендера - не нужно указывать весь УРЛ,
// а когда рендер прошел - рисуем УРЛ страницы полный,
// если что-то поменялось
    //Если параметры изменились и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);
//Если был первый рендер, то проверяем  URL-параметры и сохраняем в редуксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);
            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
    }, [])
//Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        if (!window.location.search) {
            fetchPizzas();
        }
        isSearch.current = false;

    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    useEffect(() => {
            getPizzas();
    }, []);


    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить пиццы.
                        Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home


//связь с сервером через fetch
// fetch(
//     `https://6322e53da624bced308118bc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
//     .then((res) => res.json())
//     .then((arr) => {
//         setItems(arr);
//         setIsLoading(false)
//     });


//Такая фильтрация годится при наличии небольшого, статичного массива, тогда можно сделать поиск на базе JS без BE
// const pizzas = items.filter(obj => {
//     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
//         return true;
//     }
//     return false
// }).map((obj) => <PizzaBlock key={obj.id} {...obj} />);
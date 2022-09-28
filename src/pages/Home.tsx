import React, {useCallback, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import Categories from "../components/Categories";
import {Sort} from "../components/Sort";
import Skeleton from "../components/pizza-block/Skeleton";
import {PizzaBlock} from "../components/pizza-block/PizzaBlock";
import {Pagination} from "../components/pagination/pagination";

import {useAppDispatch} from "../redux/store";
import {setCategoryId, setCurrentPage} from "../redux/filter/filterSlice";
import {fetchPizzas} from "../redux/pizzas/asyncActions";
import {selectPizzaData} from "../redux/pizzas/selectors";
import {selectFilter} from "../redux/filter/selectors";


const Home: React.FC = () => {
    //const navigate = useNavigate();
    const dispatch = useAppDispatch();
    //const isSearch = useRef(false);
    //const isMounted = useRef(false);

    const {items, status} = useSelector(selectPizzaData);
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);


    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx));
    }, []);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    };

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? String(categoryId) : '';
        const search = searchValue;

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            }),
        );
        window.scrollTo(0, 0);
    };

// Если изменили параметры и был первый рендер
    useEffect(() => {
        // if (isMounted.current) {
        //   const params = {
        //     categoryId: categoryId > 0 ? categoryId : null,
        //     sortProperty: sort.sortProperty,
        //     currentPage,
        //   };

        //   const queryString = qs.stringify(params, { skipNulls: true });

        //   navigate(`/?${queryString}`);
        // }

        // const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
        // const sortObj = sortList.find((obj) => obj.sortProperty === params.sortBy);
        // dispatch(
        //   setFilters({
        //     searchValue: params.search,
        //     categoryId: Number(params.category),
        //     currentPage: Number(params.currentPage),
        //     sort: sortObj || sortList[0],
        //   }),
        // );

        getPizzas();
        // isMounted.current = true;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    // Парсим параметры при первом рендере
    // React.useEffect(() => {
    //   if (window.location.search) {
    //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
    //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
    //     dispatch(
    //       setFilters({
    //         searchValue: params.search,
    //         categoryId: Number(params.category),
    //         currentPage: Number(params.currentPage),
    //         sort: sort || sortList[0],
    //       }),
    //     );
    //   }
    //   isMounted.current = true;
    // }, []);

    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;


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
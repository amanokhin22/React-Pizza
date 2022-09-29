import * as React from "react";
import Loadable from 'react-loadable';
import "./scss/app.scss";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import {lazy, Suspense} from "react";

const Cart = Loadable({
    loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
    loading: () => <div>Идёт загрузка корзины...</div>,
});
const FullPizza = lazy(() => import(/*webpackChunkName: "FullPizza"*/'./pages/FullPizza').then((m) =>
    ({default: m.FullPizza}))); //Если зачем-то экспортируешь по имени, а не по дефолту, тогда делай так. Но это бред, как по мне
const NotFound = lazy(() => import(/*webpackChunkName: "NotFound"*/'./pages/NotFound'));


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="" element={<Home/>}/>
                <Route path="/cart" element={
                    <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                        <Cart/>
                    </Suspense>
                }/>
                <Route path="/pizza/:id" element={
                    <Suspense fallback={<div>Идёт загрузка пиццы...</div>}>
                        <FullPizza/>
                    </Suspense>
                }/>
                <Route path="*" element={
                    <Suspense fallback={<div>Идёт загрузка...</div>}>
                        <NotFound/>
                    </Suspense>
                }/>
            </Route>
        </Routes>
    );
}
export default App;

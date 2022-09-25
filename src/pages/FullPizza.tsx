import * as React from "react";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";


const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://6322e53da624bced308118bc.mockapi.io/items' + id)
                setPizza(data)
            } catch (error) {
                alert('Ошибка при получении пиццы');
                navigate('/')
            }
        }

        fetchPizza().then(() => {});
    }, []); // Нужен ли then???

    if (!pizza) {
        return <>Загрузка...</>;
    }

    return (
        <div className="container">
            <img alt="" src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} $</h4>
            <Link to="/">
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    );
};

export default FullPizza;
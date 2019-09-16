import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Layout from './Layout'
import Card from "./Card";
import {getCart} from "./cartHelpers";


const Cart = () => {
    const [ items, setItems ] = useState([]);
    const [cartSize, setCartSize] = useState(0);

    const changeCartSize = () => {
        setCartSize(getCart().length);
    };

    useEffect(() => {
        setItems(getCart());
        changeCartSize();
    }, [cartSize]);

    const showItems = items => {
        return(
            <div>
                <h2>Your cart has {`$items.length`} items</h2>
                <hr/>
                {items.map((product, i) => (
                        <Card
                            key={i}
                            product={product}
                            showAddToCartButton={false}
                            cartUpdate={true}
                            showRemoveProductButton={true}
                        />
                    ))}
            </div>
        );
    };

    const noItemMessage = () => (
        <h2>Your cart is empty. <br/> <Link to="shop" >Continue shopping</Link> </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add, remove, checkout or continue shopping"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemMessage()}
                </div>
                <div className="col-6">
                    <p>show check out options/shipping address/total/update...</p>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from "./core/Home";
import PrivateRoute from './auth/PrivateRoute'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from "./auth/AdminRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>

                <Route exact path="/" component={Home} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/product/:productId" component={Product} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <PrivateRoute exact path="/user/dashboard" component={UserDashboard}/>
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
                <AdminRoute exact path="/create/category" component={AddCategory}/>
                <AdminRoute exact path="/create/product" component={AddProduct}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

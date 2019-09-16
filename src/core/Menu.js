import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

const isActive = (history, path) => {
    if (history.location.pathname === path ) {
        return { color: '#ff9900' }
    } else {
        return { color: '#fff' }
    }
};

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link
                    className="nav-link m-1"
                    style={isActive(history, '/')}
                    to="/"
                >
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link m-1"
                    style={isActive(history, '/shop')}
                    to="/shop"
                >
                    Shop
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link m-1"
                    style={isActive(history, '/cart')}
                    to="/cart"
                >
                    Cart{" "} <sup className="cart-badge">{" "+itemTotal()+" "}</sup>
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link m-1"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        className="nav-link m-1"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link m-1" style={isActive(history, '/signin')} to="/signin">Sign in</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link m-1" style={isActive(history, '/signup')} to="/signup">Sign up</Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link m-1"
                        style={{cursor: 'pointer', color: '#fff'}}
                        onClick={() => signout(() => {
                            history.push("/");
                        })}
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </div>
);

export default withRouter(Menu)

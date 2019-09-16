import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth"

const Signin = () => {
    const [values, setValues] = useState({
        email: 'ali2@ali.com',
        password: 'khar22khar',
        error: '',
        laoding: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    };


    const ClickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({  email, password })
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, loading: false})
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        });
                    });
                }
            });
    };

    const SignUpForm = () => (
        <form>
            <div className="form-group">
                <label htmlFor="tect-muted">Email</label>
                <input
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label htmlFor="tect-muted">Password</label>
                <input
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={ClickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-info">Loading...</div> )
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if(user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    };

    return (

        <Layout
            title="Sign in"
            description="Sign in to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {SignUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;

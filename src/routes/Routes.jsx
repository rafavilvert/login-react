import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from '../components/context/Auth';

import Login from '../components/Login/Login';
import RegisterNewUser from '../components/RegisterNewUser/RegisterNewUser';
import HomePage from '../pages/HomePage/HomePage';
import api from '../services/api';

const Routes = (props) => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const login = async () => {
        const response = await api.get('/logins')

        response.data.filter(({ authenticated }) => {
            console.log(authenticated);
            if (authenticated === true) {
                setIsAuthenticated(true)
            }
        })
    }
    useEffect(() => {
        login();
    }, [])

    return (
        <Router>
            <Switch>
                {!isAuthenticated && <Route path="/" exact component={Login} />}
                {isAuthenticated && <Route path="/" exact component={HomePage} />}
                {!isAuthenticated && <Route path="/new-user" exact component={RegisterNewUser} />}
            </Switch>
        </Router>
    );
}

export default Routes;
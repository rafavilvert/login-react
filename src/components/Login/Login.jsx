import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from 'reactstrap';
import './Login.css'
import { useAuth } from '../context/Auth';

import api from '../../services/api'

const Login = (props) => {
    const { setIsAuthenticated } = useAuth(true);

    const history = useHistory()

    const [emailUser, setEmailUser] = useState('');
    const [passwordUser, setPasswordUser] = useState('');

    const login = async () => {
        try {

            const response = await api.get('/logins')

            response.data.filter(({ user, email, password, authenticated, avatar, id }) => {
                console.log(user, email, password, authenticated, id);
                if (email === emailUser && password === passwordUser && authenticated === false) {
                    setIsAuthenticated(true)
                    const handleSetLogin = async () => {
                        await api.patch(`/logins/${id}`, {
                            "authenticated": true
                        })
                    }
                    handleSetLogin()
                    localStorage.setItem('Datauser', JSON.stringify({ user: user, avatar: avatar, authenticated: true, id: id }))
                    history.go('/')

                } else {
                    alert("Usuário ou senha incorreto")
                }
            })

        } catch (error) {
            alert('Ocorreu um erro')
        }
    }

    return (
        <>
            <main className="container container-login d-flex flex-column justify-content-center align-items-center rounded">
                <h2 className="text-dark mt-5">
                    Login
                </h2>
                <form action="">
                    <div className="d-flex flex-column">
                        <label className="align-self-start mb-0" htmlFor="floatingInput">Email address</label>
                        <input type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(e) => setEmailUser(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column">
                        <label className="align-self-start mt-1 mb-0" htmlFor="floatingPassword">Password</label>
                        <input type="password"
                            className="form-control"
                            id="floatingPassword"
                            laceholder="Password"
                            onChange={(e) => setPasswordUser(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <Button className="w-100 mt-3 mb-1" color="primary" onClick={login} >login</Button>
                        <Link className="mb-5" to='/new-user'>Cria sua conta</Link>
                    </div>
                </form>
            </main>
        </>
    );
}

export default Login;
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Button } from 'reactstrap';

import api from '../../services/api'

const RegisterNewUser = (props) => {
    const [getUsers, setGetUsers] = useState([])
    const [isUSerExist, setIsUSerExist] = useState()

    const history = useHistory()

    const [nameUser, setlNameUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [avatarUser, setAvatarUser] = useState('');
    const [passwordUser, setPasswordUser] = useState('');

    const registerNewUser = () => {
        console.log(getUsers.length - getUsers.length);

        getUsers.forEach(({ user, email, password }) => {
            if (user === nameUser || email === emailUser || password === passwordUser) {
                setIsUSerExist(true)
                console.log("Passou no true");
            }
        })

        console.log(isUSerExist);
        if (isUSerExist) {
            alert("Usuário já cadastrado")
            console.log("Entrou no usuário existe?");
            setlNameUser('');
            setEmailUser('');
            setAvatarUser('');
            setPasswordUser('');
        } else {
            console.log("Entrou no POST");
            alert("Cadastrado com sucesso")
            api.post('/logins', {
                "user": nameUser,
                "email": emailUser,
                "password": passwordUser,
                "authenticated": false,
                "avatar": avatarUser
            })
            setlNameUser('');
            setEmailUser('');
            setAvatarUser('');
            setPasswordUser('');
        }
        setIsUSerExist(false)
        history.goBack('/')


    }

    const getNewUser = async () => {
        try {

            const response = await api.get('/logins')
            setGetUsers(response.data)

        } catch (error) {
            alert('Ocorreu um erro')
        }
    }

    useEffect(() => {
        getNewUser();
    }, [])

    return (
        <>
            <main className="container container-login d-flex flex-column justify-content-center align-items-center bg-light rounded">
                <h2 className="text-dark mt-5">
                    Login
                </h2>
                <form action="">
                    <div className="d-flex flex-column">
                        <label className="align-self-start mb-0" htmlFor="floatingInput">Nome</label>
                        <input type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="nome"
                            onChange={(e) => setlNameUser(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column">
                        <label className="align-self-start mt-1 mb-0" htmlFor="floatingPassword">Email</label>
                        <input type="email"
                            className="form-control"
                            id="floatingEmail"
                            placeholder="email"
                            onChange={(e) => setEmailUser(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column">
                        <label className="align-self-start mt-1 mb-0" htmlFor="floatingPassword">Url imagem</label>
                        <input type="text"
                            className="form-control"
                            id="floatingText"
                            placeholder="https://foto.com/foto.png"
                            onChange={(e) => setAvatarUser(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column">
                        <label className="align-self-start mt-1 mb-0" htmlFor="floatingPassword">Senha</label>
                        <input type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder=""
                            onChange={(e) => setPasswordUser(e.target.value)} />
                    </div>
                    <div className="mt-3 mb-5 d-flex justify-content-between">
                        <Button className="mr-2" color="primary" onClick={registerNewUser} >Cadastrar</Button>
                        <Button onClick={() => { history.goBack('/') }}>Voltar</Button>
                    </div>
                </form>
            </main>

            {/* <main className="container container-login d-flex flex-column justify-content-center align-items-center bg-light border border-primary rounded">
                <h2 className="text-dark mt-5">
                    Cadastro
                </h2>
                <form action="">
                    <div className="form-floating d-flex flex-column">
                        <label className="align-self-start mb-0" htmlFor="floatingInput">Usuário</label>
                        <input type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="nome"
                            onChange={(e) => setlNameUser(e.target.value)} />
                    </div>
                    <div className="form-floating d-flex flex-column">
                        <label className="align-self-start mb-0" htmlFor="floatingInput">Email address</label>
                        <input type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="email"
                             />
                    </div>
                    <div className="form-floating d-flex flex-column">
                        <label className="align-self-start mb-0" htmlFor="floatingInput">Url de imagem</label>
                        <input type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="https://foto.com/foto.png"
                             />
                    </div>
                    <div className="form-floating d-flex flex-column mb-3">
                        <label className="align-self-start mt-1 mb-0" htmlFor="floatingPassword">Password</label>
                        <input type="password"
                            className="form-control"
                            id="floatingPassword"
                            laceholder="Password"
                             />
                    </div>
                    <div className="mb-5">

                    </div>
                </form>
            </main> */}
        </>
    );
}

export default RegisterNewUser;
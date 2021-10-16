import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'reactstrap';
import api from '../../services/api';

import imgLogout from '../../assets/logout.png'

const Logout = (props) => {
    const [data, setData] = useState([])

    const history = useHistory()

    const handleGetId = () => {
        setData(JSON.parse(localStorage.getItem('Datauser')));
    }

    const handleLogoutSystem = async () => {

        try {

            console.log(data);

            await api.patch(`/logins/${data.id}`, {
                "authenticated": false,
            })

            history.go('/')

            localStorage.clear();

        } catch (error) {
            alert('Ocorreu um erro')
        }


    }

    useEffect(() => {
        handleGetId()
    }, [])

    return (
        <Button type="button"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Sair" color="primary"
            onClick={handleLogoutSystem}>
            <img className="align-self-end" width="15px" height="10px" src={imgLogout} alt="sair" />
        </Button>
    );
}

export default Logout;
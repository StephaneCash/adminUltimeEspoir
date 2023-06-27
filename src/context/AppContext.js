import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import App from '../App';
import { baseUrl } from '../bases/basesUrl';
import { decodeToken } from "react-jwt";

export const ContextApp = createContext();

const AppContext = () => {

    const [userConnected, setUserConnected] = useState(null);
    const [categories, setCategories] = useState(null);
    const [uid, setUid] = useState(null);
    const [token, setToken] = useState(null);
    const [stepCurrent, setStepCurrent] = useState(0);
    const [dataBoutiqueCreate, setDataCreateBoutique] = useState(null);

    const jwt = JSON.parse(localStorage.getItem('tokenUser'));

    useEffect(() => {
        if (jwt) {
            setUid(decodeToken(jwt));
            setToken(jwt);
        }
    }, [jwt]);

    useEffect(() => {
        if (uid) {
            axios.get(`${baseUrl}/users/${uid && uid.id}`)
                .then(res => {
                    setUserConnected(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [uid]);

    useEffect(() => {
        axios.get(`${baseUrl}/categories`)
            .then(res => {
                setCategories(res.data && res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <ContextApp.Provider
            value={{
                userConnected, setUserConnected, categories, token, setToken, stepCurrent, setStepCurrent,
                dataBoutiqueCreate, setDataCreateBoutique
            }}
        >
            <App />
        </ContextApp.Provider>
    )
}

export default AppContext
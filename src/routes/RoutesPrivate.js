import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";

const RoutesPrivate = () => {

    const userConnected = JSON.parse(localStorage.getItem('tokenUser'));

    let data = {}

    if (userConnected) {
        data = decodeToken(userConnected && userConnected)
    } else {
        data = null;
    }
    
    return (
        Number.isSafeInteger(data.id) ? <Outlet /> : <Navigate to="/" />
    )
}

export default RoutesPrivate
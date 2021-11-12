import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";
import { SessionContext } from '../sesion/Sesion';

export default function PrivateRoute({ path, component }) {
    const { state: { isAuthenticated } } = useContext(SessionContext);
    if (!isAuthenticated) return <Redirect to="/ingreso" />;
    
    return (
        <Route path={ path } component={ component }/> 
    )
}
import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { AUTH_CHECK } from '../utils/querys';
import Dashboard from '../pages/adminDashboard'

const ProtectedRoute = () =>{ 
    const auth = localStorage.getItem('token');
 

    const {loading,data,error} = useQuery(AUTH_CHECK, {variables:{
        Key: auth,
        
    },  skip:!auth,
        fetchPolicy: 'network-only'
});

    if(loading){
        return <div>loading...</div>
    }
    const isAuthenticated = data?.AuthCheck?.success;

    // we not letting anything through 
    if(error || !isAuthenticated || isAuthenticated === undefined || isAuthenticated === null || isAuthenticated === false){
        return <Navigate to='/Login'/>;
    }

    
    if(isAuthenticated) return <Outlet/>;
    

};

export default ProtectedRoute;
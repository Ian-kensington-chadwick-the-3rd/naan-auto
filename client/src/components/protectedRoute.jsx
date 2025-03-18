import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { AUTH_CHECK } from '../utils/querys';

const ProtectedRoute = () =>{ 
    const auth = localStorage.getItem('token');
    console.log(auth)

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
        console.log('not auth!!!', isAuthenticated)
        return <Navigate to='/Login'/>;
    }

    
    if(isAuthenticated === true) return <Outlet/>;
    

};

export default ProtectedRoute;
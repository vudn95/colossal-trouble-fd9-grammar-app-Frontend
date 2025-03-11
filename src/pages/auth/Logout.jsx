import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Logout = () => {
    Cookies.remove('token');
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/login');
    },[])
    return (<></>)
}

export default Logout;
import React, { useEffect, useState } from 'react';
import API from '../../apis/clientAPI';
import { Button, CircularProgress, FormControl, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await API.post('/auth/login', { email, password });
      Cookies.set('token', response.data.token);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      alert('Login failed!');
    }
  };

  return (
    <div className='login-container'>
      <div className='login-body'>
        <h2>Login</h2>
        <form onSubmit={handleLogin} className='login-form'>
          <FormControl className='form-control'>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </FormControl>
          <FormControl className='form-control'>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
          >
            Login
            {isLoading && <CircularProgress
              size={12}
            />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

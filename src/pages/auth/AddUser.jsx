import React, { useEffect, useState } from 'react';
import API from '../../apis/clientAPI';
import { Button, CircularProgress, FormControl, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import './Login.css';

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    try {
      const decoded = jwtDecode(token);
      if (!decoded.role || decoded.role !== 'admin') {
        navigate('/');
      };
    } catch (error) {
      navigate('/');
    }
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    API.post('/auth/add-user', { email, password, role: "user" })
      .then(response => {
        setIsLoading(false);
        setEmail('');
        setPassword('');
        alert('User added successfully!');
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response.status === 401) {
          return navigate('/logout');
        }
        console.error('Error checking text:', error);
        alert('Failed to add user');
      });
  };

  return (
    <div className='login-container'>
      <div className='login-body'>
        <h2>Add User</h2>
        <form onSubmit={handleAdd} className='login-form'>
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
            Submit
            {isLoading && <CircularProgress
              size={12}
            />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

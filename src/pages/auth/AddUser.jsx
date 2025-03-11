import React, { useEffect, useState } from 'react';
import API from '../../apis/clientAPI';
import { Button, CircularProgress, FormControl, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    try {
      const decoded = jwtDecode(token);
      if (!decoded.is_admin) {
        navigate('/');
      };
    } catch (error) {
      navigate('/');
    }
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await API.post('/auth/add-user', { email, password });
      setIsLoading(false);
      setEmail('');
      setPassword('');
      alert('User added successfully!');
    } catch (error) {
      setIsLoading(false);
      alert('Failed to add user');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%',
      overflow: 'auto',
    }}>
      <div style={{
        textAlign: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',

      }}>
        <h2>Add User</h2>
        <form onSubmit={handleAdd} style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
        }}>
          <FormControl style={{
            marginBottom: '10px',
          }}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </FormControl>
          <FormControl style={{
            marginBottom: '10px',
          }}>
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
              style={{
                marginLeft: '10px',
              }}
            />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

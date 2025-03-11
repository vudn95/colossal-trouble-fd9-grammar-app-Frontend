import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import API from '../../apis/clientAPI';
import './Home.css';

const Home = () => {
    const [text, setText] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login');
        };
    }, [])

    const handleCheckText = async () => {
        setIsLoading(true);
        API.post('/grammar/check-grammar', { text })
            .then(response => {
                setIsLoading(false);
                setOutput(response.data.data?.trim());
            })
            .catch(error => {
                setIsLoading(false);
                if (error.response.status === 401) {
                    return navigate('/logout');
                }
                console.error('Error checking text:', error);
                alert('Error checking text');
            });
    };

    return (
        <div className='home-container'>
            <div className='home-header'>
                <h2>Grammer Correction App</h2>
                <Button
                    variant='contained'
                    color="secondary"
                    onClick={() => {
                        navigate('/logout');
                    }}
                >
                    Logout
                </Button>
            </div>
            <div className='home-content'>
                <div className='output-body'>
                    <p className='title'>Output</p>
                    <div className='output-content'>
                        <p dangerouslySetInnerHTML={{ __html: output }}></p>
                    </div>
                </div>
                <div className='input-body'>
                    <textarea
                        className='input-content'
                        placeholder='Enter your text here'
                        disabled={isLoading}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    />
                    {isLoading && <CircularProgress
                        size={12}
                        className='loading'
                    />}
                </div>
                <Button
                    variant='contained'
                    disabled={isLoading || !text.trim()}
                    onClick={() => {
                        handleCheckText();
                    }}
                >
                    Check Grammar
                    {isLoading && <CircularProgress
                        size={12}
                        className='loading'
                    />}
                </Button>
            </div>
        </div>
    );
}

export default Home;
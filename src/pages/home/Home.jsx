import React, { useEffect, useRef, useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import API from '../../apis/clientAPI';
import './Home.css';
import useDebounce from '../../hook/useDebounce';

const Home = () => {
    const [text, setText] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const queuedText = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login');
        };
    }, [])

    const debouncedText = useDebounce(text, 500);

    const checkGrammar = async (textToCheck) => {
        if (!textToCheck.trim()) return;

        setIsLoading(true);

        try {
            const response = await API.post("/grammar/check-grammar", { text: textToCheck });
            setOutput(response.data.data?.trim());
            setIsLoading(false);

            if (queuedText.current !== null) {
                const nextText = queuedText.current;
                queuedText.current = null;
                checkGrammar(nextText);
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response?.status === 401) {
                return navigate("/logout");
            }
            console.error("Error checking text:", error);
            alert("Error checking text");
        }
    };

    useEffect(() => {
        if (!debouncedText.trim()) return;

        if (isLoading) {
            queuedText.current = debouncedText;
        } else {
            checkGrammar(debouncedText);
        }
    }, [debouncedText]);

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
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    />
                    {isLoading && <CircularProgress
                        size={12}
                        className='loading'
                    />}
                </div>
            </div>
        </div>
    );
}

export default Home;
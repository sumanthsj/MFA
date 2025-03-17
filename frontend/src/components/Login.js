import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice'; // Import your Redux action

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const API_BASE_URL = 'http://localhost:8080';

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { username, password });
            console.log('Login successful:', response.data);
            localStorage.setItem('user', JSON.stringify(response.data)); // Store user data
            dispatch(login(response.data)); // Dispatch Redux login action
            navigate('/home'); // Redirect to home
        } catch (error) {
            console.error('Login failed:', error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('Login failed. Please try again.');
            }
        }
    };

    //Login.js
    const handleSignup = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, { username, password });
            console.log('Signup successful:', response.data);
            navigate('/home');
        } catch (error) {
            console.error('Signup failed:', error);
            if (error.response && error.response.status === 400 && error.response.data) {
                setErrorMessage(error.response.data); // Set error from backend
            } else {
                setErrorMessage('Signup failed. Please try again.');
            }
        }
    };

    return (
        <div>
            <h2>Login/Signup</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}

export default Login;
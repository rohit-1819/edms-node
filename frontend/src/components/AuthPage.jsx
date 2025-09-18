// src/components/AuthPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Get the API base URL from the environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleAuth = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Clear previous errors
        setSuccessMessage('');

        const endpoint = isLogin ? '/api/login' : '/api/signup';
        const data = { username, password };

        try {
            const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
            
            if (isLogin) {
                // Assuming the backend returns a token and user role
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userRole', response.data.role);

                // Redirect based on the user's role
                if (response.data.role === 'DM') {
                    navigate('/dm-dashboard');
                } else if (response.data.role === 'HOD') {
                    navigate('/hod-dashboard');
                }
            } else {
                setSuccessMessage('HOD account created successfully! You can now log in.');
                setIsLogin(true); // Switch to the login form after successful signup
            }

        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Electronic Data Management System (EDMS)</h2>
            <h3>{isLogin ? 'Login' : 'Signup for HODs'}</h3>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            
            <form onSubmit={handleAuth}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>

            <p className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Log In'}
            </p>
        </div>
    );
};

export default AuthPage;
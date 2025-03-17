// src/components/Home.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div>
            <div style={{ textAlign: 'right', padding: '10px' }}>
                {user ? (
                    <span>Welcome, {user.username}! <button onClick={handleLogout}>Logout</button></span>
                ) : (
                    <span>
                        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
                        <Link to="/login" style={{ marginRight: '10px' }}>Signup</Link>
                    </span>
                )}
            </div>
            <h1>This is the Home Page</h1>
            <p>Welcome to your home page.</p>
            {!user && <p>Please log in or sign up to access all features.</p>}
        </div>
    );
}

export default Home;
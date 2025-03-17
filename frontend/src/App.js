// src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';
import React, { useEffect } from 'react';
import { login } from './redux/userSlice';

// Create a separate component for the routes
function AppRoutes() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(login(JSON.parse(storedUser)));
        }
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/home"
                element={<Home />}
            />
            {/* Add any protected routes here */}
            <Route path="/protected" element={
                user ? <Home /> : <Navigate to="/login" />
            } />
        </Routes>
    );
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <AppRoutes />
            </Router>
        </Provider>
    );
}

export default App;
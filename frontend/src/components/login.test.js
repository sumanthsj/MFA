// src/components/Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  // Add other methods you use
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('Login Component', () => {
    beforeEach(() => {
        localStorage.clear(); // Clear localStorage before each test
        jest.clearAllMocks(); // Clear mock calls
    });

    it('should render the login form', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('should handle successful login', async () => {
        axios.post.mockResolvedValue({ data: { token: 'test-token', username: 'testuser' } });
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        await waitFor(() => {
            expect(localStorage.getItem('user')).toEqual(JSON.stringify({ token: 'test-token', username: 'testuser' }));
        });
    });

    it('should handle failed login', async () => {
        axios.post.mockRejectedValue({ response: { data: 'Invalid credentials' } });
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });
});
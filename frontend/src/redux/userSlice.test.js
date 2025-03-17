// src/redux/userSlice.test.js
import userReducer, { login, logout } from './userSlice';

describe('userSlice', () => {
    const initialState = {
        user: null,
    };

    it('should handle login', () => {
        const payload = { token: 'test-token', username: 'testuser' };
        const nextState = userReducer(initialState, login(payload));
        expect(nextState.user).toEqual(payload);
    });

    it('should handle logout', () => {
        const stateWithUser = { user: { token: 'test-token', username: 'testuser' } };
        const nextState = userReducer(stateWithUser, logout());
        expect(nextState.user).toBeNull();
    });
});
import { combineReducers } from 'redux';

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null, // Initialize from localStorage
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            localStorage.removeItem("user"); // Clear localStorage on logout
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    auth: authReducer,
    // Add your other reducers here
});

export default rootReducer;

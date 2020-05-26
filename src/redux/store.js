import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducer/userReducer';
import uiReducer from './reducer/uiReducer';
import dataReducer from './reducer/dataReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
});

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
);

export default store;

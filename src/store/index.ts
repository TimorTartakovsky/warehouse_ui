import loginReducer from './login';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    login: loginReducer,
});

export default rootReducers;
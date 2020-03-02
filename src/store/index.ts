import loginReducer, { ILogin } from './login';
import { combineReducers } from 'redux';

export type RootState = {
    login: ILogin;
}

const rootReducers = combineReducers({
    login: loginReducer,
});

export default rootReducers;
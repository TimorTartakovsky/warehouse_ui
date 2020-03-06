import loginReducer, { ILogin } from './login';
import optionsReducer, { IThemeOptionState } from './theme-options';
import userReducer, { IUserState } from './user';
import { combineReducers } from 'redux';

export interface IRootState {
    login: ILogin;
    theme: IThemeOptionState;
    user: IUserState;
}

const rootReducers = combineReducers({
    login: loginReducer,
    theme: optionsReducer,
    user: userReducer,
});

export default rootReducers;
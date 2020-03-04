import loginReducer, { ILogin } from './login';
import optionsReducer, { IThemeOptionState } from './theme-options';
import { combineReducers } from 'redux';

export interface IRootState {
    login: ILogin;
    theme: IThemeOptionState;
}

const rootReducers = combineReducers({
    login: loginReducer,
    theme: optionsReducer,
});

export default rootReducers;
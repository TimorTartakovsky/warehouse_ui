import loginReducer, { ILogin } from './login';
import optionsReducer, { IThemeOptionState } from './theme-options';
import userReducer from './user';
import { IUserState } from './user/user.types';
import bolReducer from './bol';
import { IBOLState } from './bol/types';
import { combineReducers } from 'redux';

export interface IRootState {
    login: ILogin;
    theme: IThemeOptionState;
    user: IUserState;
    bol: IBOLState;
}

const rootReducers = combineReducers({
    login: loginReducer,
    theme: optionsReducer,
    user: userReducer,
    bol: bolReducer,
});

export default rootReducers;
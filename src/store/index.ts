import loginReducer, { ILogin } from './login';
import optionsReducer, { IThemeOptionState } from './theme-options';
import userReducer from './user';
import { IUserState } from './user/user.types';
import bolReducer from './bol';
import { IBOLState } from './bol/types';
import monitoringReducer from './monitoring';
import { IMonitoringState } from './monitoring/types';
import orderTypeReducer from './order-type'
import { IOrderType } from './order-type/types';

import { combineReducers } from 'redux';

export interface TableItem {
    [k: string]: {
     source?: any;
     value?: React.ReactElement | React.ReactElement[];
     isSearchable?: boolean;
    } | number;
 }

export interface IRootState {
    login: ILogin;
    theme: IThemeOptionState;
    user: IUserState;
    bol: IBOLState;
    monitoring: IMonitoringState;
    orderType: IOrderType;
}

const rootReducers = combineReducers({
    login: loginReducer,
    theme: optionsReducer,
    user: userReducer,
    bol: bolReducer,
    monitoring: monitoringReducer,
    orderType: orderTypeReducer,
});

export default rootReducers;
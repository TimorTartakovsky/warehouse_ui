import { Action } from 'redux';

import * as LOGIN_ACTIONS from './login.action';
import * as USER_ACTIONS from './user.action';

export interface IActionBasic extends Action {
    type: string;
}

export interface IActionPayload extends IActionBasic {
    payload: {
        [k: string]: any;
    }
}

export {
    LOGIN_ACTIONS,
    USER_ACTIONS,
}
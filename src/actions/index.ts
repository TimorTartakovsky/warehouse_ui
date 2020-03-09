import { Action } from 'redux';

import * as LOGIN_ACTIONS from './login.action';
import * as USER_ACTIONS from './user.action';
import * as LOCATION_ACTIONS from './location.action';
import * as BOL_ACTIONS from './bol.action';

export interface IActionBasic extends Action {
    type: string;
}

export interface IActionPayload extends IActionBasic {
    payload?: {
        [k: string]: any;
    }
}

export {
    LOGIN_ACTIONS,
    USER_ACTIONS,
    LOCATION_ACTIONS,
    BOL_ACTIONS,
}
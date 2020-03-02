import { IActionPayload, IActionBasic } from ".";

export const LOGIN_TO_WAREHOUSE_STARTED = 'LOGIN_ACTION_STARTED';
export const LOGIN_TO_WAREHOUSE_SUCCESS = 'LOGIN_ACTION_SUCCESS';
export const LOGIN_TO_WAREHOUSE_REQUEST = 'LOGIN_ACTION_REQUEST';
export const LOGIN_TO_WAREHOUSE_SET_USERNAME = 'LOGIN_ACTION_SET_USERNAME';
export const LOGIN_TO_WAREHOUSE_FAIL = 'LOGIN_ACTION_FAIL';

export const TOKEN_TO_WAREHOUSE_SUCCESS = 'TOKEN_ACTION_SUCCESS';
export const TOKEN_TO_WAREHOUSE_REQUEST = 'TOKEN_ACTION_REQUEST';
export const TOKEN_TO_WAREHOUSE_FAIL = 'TOKEN_ACTION_FAIL';


export const doLoginBasicStart = (): IActionBasic => ({
    type: LOGIN_TO_WAREHOUSE_STARTED,
});

export const setUserName = (username: string): IActionPayload => ({
    type: LOGIN_TO_WAREHOUSE_SET_USERNAME,
    payload: { username }
});

export const loginBasicSuccess = (param: { username: string, password: string})
: IActionPayload => ({
    type: LOGIN_TO_WAREHOUSE_SUCCESS,
    payload: param
});

export const loginBasicFailed = (): IActionBasic => ({
    type: LOGIN_TO_WAREHOUSE_FAIL,
});


export const loginBasicRequest = (param: { username: string, password: string, history: History})
: IActionPayload => ({
    type: LOGIN_TO_WAREHOUSE_REQUEST,
    payload: param
});


export const tokenBasicSuccess = (token: string)
: IActionPayload => ({
    type: TOKEN_TO_WAREHOUSE_SUCCESS,
    payload: { token }
});

export const tokenBasicFailed = (): IActionBasic => ({
    type: TOKEN_TO_WAREHOUSE_FAIL,
});


export const tokenBasicRequest = (token: string)
: IActionPayload => ({
    type: TOKEN_TO_WAREHOUSE_REQUEST,
    payload: { token }
});


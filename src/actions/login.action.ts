
export const LOGIN_TO_WAREHOUSE_STARTED = 'LOGIN_ACTION_STARTED';
export const LOGIN_TO_WAREHOUSE_SUCCESS = 'LOGIN_ACTION_SUCCESS';
export const LOGIN_TO_WAREHOUSE_FAIL = 'LOGIN_ACTION_FAIL';


export const doLoginBasicStart = () => ({
    type: LOGIN_TO_WAREHOUSE_STARTED,
});

export const loginBasicSuccess = (param: any) => ({
    type: LOGIN_TO_WAREHOUSE_SUCCESS,
    payload: param
});


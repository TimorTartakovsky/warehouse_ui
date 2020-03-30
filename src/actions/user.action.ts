import { IActionPayload, IActionBasic } from ".";
import { IUser } from "../store/user/user.types";

export const USER_ACTION_START = 'USER_ACTION_START';
export const USER_ACTION_REQUEST = 'USER_ACTION_REQUEST';
export const USER_ACTION_REQUEST_SUCCESS = 'USER_ACTION_REQUEST_SUCCESS';
export const USER_ACTION_REQUEST_FAILED = 'USER_ACTION_REQUEST_FAILED';


export const userStart = (): IActionBasic => ({
    type: USER_ACTION_START,
});

export const userRequestWhoAmI = (history: History)
: IActionPayload => ({
    type: USER_ACTION_REQUEST,
    payload: { history }
});

export const userRequestWhoAmISuccess = (user: IUser)
: IActionPayload => ({
    type: USER_ACTION_REQUEST_SUCCESS,
    payload: { user },
});

export const userRequestWhoAmIFail = (error: Error)
: IActionPayload => ({
    type: USER_ACTION_REQUEST_FAILED,
    payload: { error },
});
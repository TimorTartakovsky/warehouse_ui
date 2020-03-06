import { IActionPayload, IActionBasic } from ".";
import { ILocationResponse } from "../store/user/location.types";

export const LOCATION_ACTION_START = 'LOCATION_ACTION_START';
export const LOCATION_ACTION_REQUEST_SUCCESS = 'LOCATION_ACTION_REQUEST_SUCCESS';
export const LOCATION_ACTION_REQUEST_FAILED = 'LOCATION_ACTION_REQUEST_FAILED';


export const locationStart = (): IActionBasic => ({
    type: LOCATION_ACTION_START,
});

export const locationRequestSuccess = (r: ILocationResponse): IActionPayload => {
    return {
        type: LOCATION_ACTION_REQUEST_SUCCESS,
        payload: {
            location: r,
        },
    }
};

export const locationRequestFailed = (e: Error): IActionPayload => ({
    type: LOCATION_ACTION_REQUEST_FAILED,
    payload: {
        error: e
    },
});

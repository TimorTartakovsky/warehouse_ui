import { IActionPayload, IActionBasic } from ".";
import { IOrderType } from '../store/order-type/types';

export const ORDER_TYPE_ACTION_START =           'ORDER_TYPE_ACTION_START';
export const ORDER_TYPE_ACTION_REQUEST =         'ORDER_TYPE_ACTION_REQUEST';
export const ORDER_TYPE_ACTION_REQUEST_SUCCESS = 'ORDER_TYPE_ACTION_REQUEST_SUCCESS';
export const ORDER_TYPE_ACTION_REQUEST_FAILED =  'ORDER_TYPE_ACTION_REQUEST_FAILED';


export const orderTypeStart = (): IActionBasic => ({
    type: ORDER_TYPE_ACTION_START,
});

export const orderTypeRequest = (locationId: number)
: IActionPayload => ({
    type: ORDER_TYPE_ACTION_REQUEST,
    payload: { locationId }
});

export const orderTypeSucceeded = (orderTypes: IOrderType[])
: IActionPayload => ({
    type: ORDER_TYPE_ACTION_REQUEST_SUCCESS,
    payload: { orderTypes }
});

export const orderTypeFailed = (error: Error)
: IActionPayload => ({
    type: ORDER_TYPE_ACTION_REQUEST_FAILED,
    payload: { error }
});
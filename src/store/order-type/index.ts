import { IOrderTypeState, initMonitoring } from "./types";
import { IActionPayload, ORDER_TYPE_ACTIONS } from "../../actions";


const orderTypeReducer = (state: IOrderTypeState = initMonitoring, actions: IActionPayload) => {
    switch (actions.type) {
        case ORDER_TYPE_ACTIONS.ORDER_TYPE_ACTION_START:
        case ORDER_TYPE_ACTIONS.ORDER_TYPE_ACTION_REQUEST:
            return state;
        case ORDER_TYPE_ACTIONS.ORDER_TYPE_ACTION_REQUEST_SUCCESS:
            return {
                isRequestFailed: false, 
                failRequestMessage: '',
                orderTypes: actions.payload && actions.payload.orderTypes,
            };
        case ORDER_TYPE_ACTIONS.ORDER_TYPE_ACTION_REQUEST_FAILED:
            return {
                isRequestFailed: true, 
                failRequestMessage: actions.payload && actions.payload.error,
                orderTypes: state.orderTypes,
            }
        default: return state;
    }
}

export default orderTypeReducer;
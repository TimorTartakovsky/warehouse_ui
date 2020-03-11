import { IMonitoringState, initMonitoring } from "./types";
import { IActionPayload, MONITORING_ACTIONS } from "../../actions";


const monitoringReducer = (state: IMonitoringState = initMonitoring, actions: IActionPayload) => {
    switch (actions.type) {
        case MONITORING_ACTIONS.MONITORING_ACTION_START:
        case MONITORING_ACTIONS.MONITORING_ACTION_REQUEST:
            return state;
        case MONITORING_ACTIONS.MONITORING_ACTION_REQUEST_SUCCESS:
            return {
                isRequestFailed: false, 
                failRequestMessage: '',
                monitoringArray: actions.payload && actions.payload.monitoringArray,
            };
        case MONITORING_ACTIONS.MONITORING_ACTION_REQUEST_SUCCESS:
            return {
                isRequestFailed: true, 
                failRequestMessage: actions.payload && actions.payload.error,
                monitoringArray: state.monitoringArray,
            }
        default: return state;
    }
}

export default monitoringReducer;
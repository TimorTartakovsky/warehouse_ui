import { IMonitoringState, initMonitoring } from "./types";
import { IActionPayload, MONITORING_ACTIONS } from "../../actions";


const monitoringReducer = (state: IMonitoringState = initMonitoring, actions: IActionPayload) => {
    switch (actions.type) {
        case MONITORING_ACTIONS.MONITORING_ACTION_START:
            return {
                ...state,
                ...initMonitoring
            };
        case MONITORING_ACTIONS.MONITORING_ACTION_REQUEST:
            return {
                ...state,
                ...initMonitoring
            };
        case MONITORING_ACTIONS.MONITORING_ACTION_REQUEST_SUCCESS:
            return {
                ...state,
                isRequestFailed: false, 
                failRequestMessage: '',
                monitoringArray: actions.payload && actions.payload.monitoringArray,
            };
        case MONITORING_ACTIONS.MONITORING_ACTION_REQUEST_FAILED:
            return {
                ...state,
                isRequestFailed: true, 
                failRequestMessage: actions.payload && actions.payload.error,
                monitoringArray: state.monitoringArray,
            }
        case MONITORING_ACTIONS.MONITORING_UPDATE_CURRENT_TABS:
            return {
                ...state,
                currentTab: actions.payload && actions.payload.currentTab,
                currentSubTab: actions.payload && actions.payload.currentSubTab,
            }
        case MONITORING_ACTIONS.MONITORING_UPDATE_PRIMARY_COLUMN: 
            return {
                ...state,
                primaryColumn: actions.payload && actions.payload.primaryColumn,
            }
        default: return state;
    }
}

export default monitoringReducer;
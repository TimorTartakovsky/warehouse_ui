import { BOL_ACTIONS, IActionPayload } from '../../actions';
import { initBOLState, IBOLState } from './types';

const bolReducer = (state: IBOLState = initBOLState, actions: IActionPayload) => {
    switch(actions.type) {
        case BOL_ACTIONS.BOL_MONITORING_ACTION_START:
        case BOL_ACTIONS.BOL_PROCESSING_ACTION_START:
            return state;
        case BOL_ACTIONS.BOL_MONITORING_ACTION_REQUEST_SUCCESS:
            return {
                ...state,
                monitoring: actions.payload && actions.payload.monitoring,
            }
        case BOL_ACTIONS.BOL_MONITORING_ACTION_REQUEST_FAILED:
            return {
                ...state,
                isMonitoringBolRequestFailed: true,
                monitoringBolRequestErrorMessage: actions.payload && actions.payload.error,
            }
        case BOL_ACTIONS.BOL_PROCESSING_ACTION_REQUEST_SUCCESS:
            return {
                ...state,
                processing: actions.payload && actions.payload.processing,
            }
        case BOL_ACTIONS.BOL_PROCESSING_ACTION_REQUEST_FAILED:
            return {
                ...state,
                isProcessingBolRequestFailed: true,
                processingBolRequestErrorMessage: actions.payload && actions.payload.error,
            }
        case BOL_ACTIONS.BOL_MONITORING_RECALL_SUCCESS_ACTION:
            const recall = actions.payload && actions.payload.recall;
            console.log(recall);
            if (!recall) {
                return state;
            }
            const foundIndex = state.monitoring ? state.monitoring
            .findIndex(m => m.orderNumbers[0] === recall.orderNumbers[0]) : -1;
            if (foundIndex === -1 || !state.monitoring || !state.monitoring[foundIndex]) {
                return state;
            } else {
                if (recall.status === 4) {
                    state.monitoring[foundIndex].bolStatus = 6;
                } else {
                    state.monitoring[foundIndex].bolStatus = 4;
                }
                return {
                    ...state,
                    monitoring: [...state.monitoring],
                }
            }
        default: return state;
    }
}

export default bolReducer;
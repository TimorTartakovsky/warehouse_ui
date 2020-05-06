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
        case BOL_ACTIONS.BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST_START:
            return {
                ...state,
                billings: [],
            }
        case BOL_ACTIONS.BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST_SUCCESS:
            return {
                ...state,
                billings: actions.payload && actions.payload.billings,
            }
        case BOL_ACTIONS.BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST_START:
            return {
                ...state,
                shippings: [],
            }
        case BOL_ACTIONS.BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST_SUCCESS:
            return {
                ...state,
                shippings: actions.payload && actions.payload.shippings,
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
        case BOL_ACTIONS.BOL_PROCESSING_GET_CONFLICTING_ADDRESS_UPDATE_ACTION_REQUEST_SUCCESS:
            return {
                ...state,
                conflictAddress: actions.payload && actions.payload.conflictAddress
            }
        case BOL_ACTIONS.BOL_PROCESSING_GET_iNFO_REQUEST_SUCCESS:
            return {
                ...state,
                processInfo: actions.payload && actions.payload.processInfo,
                billings: [],
                shippings: [],
            }
        default: return state;
    }
}

export default bolReducer;
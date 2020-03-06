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
                monitoring: actions.payload.monitoring,
            }
        case BOL_ACTIONS.BOL_MONITORING_ACTION_REQUEST_FAILED:
            return {
                ...state,
                isMonitoringBolRequestFailed: true,
                monitoringBolRequestErrorMessage: actions.payload.error,
            }
        case BOL_ACTIONS.BOL_PROCESSING_ACTION_REQUEST_SUCCESS:
            return {
                ...state,
                processing: actions.payload.processing,
            }
        case BOL_ACTIONS.BOL_PROCESSING_ACTION_REQUEST_FAILED:
            return {
                ...state,
                isProcessingBolRequestFailed: true,
                processingBolRequestErrorMessage: actions.payload.error,
            }
        default: return state;
    }
}

export default bolReducer;
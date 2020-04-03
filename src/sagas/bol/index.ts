import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { BOL_ACTIONS, IActionPayload } from '../../actions';
import BOLService from '../../api/BOLService';
import { IBOLMonitoring, IBOLProcessing } from '../../store/bol/types';


function* monitoringAsync(action: IActionPayload) {
    try {
        const { props } = action.payload || {};
        const monitoring: IBOLMonitoring[] = yield call(BOLService.getBOLMonitoring, props);
        yield put(BOL_ACTIONS.bolMonitoringRequestSuccess(monitoring));
    } catch(e) {
        yield put(BOL_ACTIONS.bolMonitoringRequestFailed(e));
    }
}

function* monitoringRecallAsync(action: IActionPayload) {
    try {
        const { props } = action.payload || {};
        const monitoring: IBOLMonitoring[] = yield call(BOLService.recallMonitoring, props);
        // yield put(BOL_ACTIONS.bolMonitoringRequestSuccess(monitoring));
    } catch(e) {
        yield put(BOL_ACTIONS.bolMonitoringRecallRequestFailed(e));
    }
}

function* processingAsync(action: IActionPayload) {
    try {
        const { props } = action.payload || {};
        const processing: IBOLProcessing[] =  yield call(BOLService.getBOLProcessing, props);
        yield put(BOL_ACTIONS.bolProcessingRequestSuccess(processing));
    } catch(e) {
        yield put(BOL_ACTIONS.bolProcessingRequestFailed(e));
    }
}

function* watchBOLMonitoringRequests() {
    yield takeLatest(BOL_ACTIONS.BOL_MONITORING_ACTION_REQUEST, monitoringAsync);
}
function* watchBOLMonitoringRecallRequests() {
    yield takeLatest(BOL_ACTIONS.BOL_MONITORING_RECALL_REQUEST_ACTION, monitoringRecallAsync);
}
function* watchBOLProcessingRequests() {
    yield takeLatest(BOL_ACTIONS.BOL_PROCESSING_ACTION_REQUEST, processingAsync);
}

const bolSagas = [
    fork(watchBOLMonitoringRequests),
    fork(watchBOLProcessingRequests),
    fork(watchBOLMonitoringRecallRequests),
];

export default bolSagas;
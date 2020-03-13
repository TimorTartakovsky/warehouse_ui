import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { MONITORING_ACTIONS, ORDER_TYPE_ACTIONS, IActionPayload } from '../../actions';
import MonitoringService from '../../api/MonitoringService';
import OrderTypeService from '../../api/OrderTypeService';
import { getMonitoringMask } from './helper';

function* fetchMonitoring(a: IActionPayload) {
    try {
        yield put(MONITORING_ACTIONS.monitoringStart());
        const { locationId, currentTab, currentSubTab, branchId} = a.payload || {};
        const mask = getMonitoringMask(currentTab, currentSubTab);
        const monitoring = yield call(MonitoringService.getMonitoring, {
            locationId,
            branchId,
            type: mask?.type || 0,
            subtype: mask?.subtype || 0,
        });
        yield put(MONITORING_ACTIONS.monitoringRequestSucceeded(monitoring));
    } catch (e) {
        console.error(`Monitoring order types cannot be fetched.`);
    }
}

function* fetchMonitoringAndOrderType(a: IActionPayload) {
    try {
        yield put(ORDER_TYPE_ACTIONS.orderTypeStart());
        yield put(MONITORING_ACTIONS.monitoringStart());
        console.log(a.payload);
        const { locationId, currentTab, currentSubTab, branchId} = a.payload || {};
        const mask = getMonitoringMask(currentTab, currentSubTab);
        console.log(mask);
        const types = yield call(OrderTypeService.getOrderTypes, locationId);
        const monitoring = yield call(MonitoringService.getMonitoring, {
            locationId,
            branchId,
            type: mask?.type || 0,
            subtype: mask?.subtype || 0,
        });
        yield put(ORDER_TYPE_ACTIONS.orderTypeSucceeded(types));
        yield put(MONITORING_ACTIONS.monitoringRequestSucceeded(monitoring));
    } catch (e) {
        console.error(`Monitoring order types cannot be fetched.`);
    }
}

function* watchMonitoring() {
    yield takeLatest(MONITORING_ACTIONS.MONITORING_ACTION_REQUEST, fetchMonitoring);
}

function* watchMonitoringAndOrderTypes() {
    yield takeLatest(MONITORING_ACTIONS.MONITORING_AND_ORDER_TYPE_ACTION_START, fetchMonitoringAndOrderType)
}

const monitoringSagas = [
    fork(watchMonitoring),
    fork(watchMonitoringAndOrderTypes),
];

export default monitoringSagas;
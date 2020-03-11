import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { ORDER_TYPE_ACTIONS, IActionPayload } from "../../actions";
import OrderTypeService from '../../api/OrderTypeService';

function* fetchMonitoringOrderType(a: IActionPayload) {
    try {
        yield put(ORDER_TYPE_ACTIONS.orderTypeStart());
        const { locationId } = a.payload || {};
        const types = yield call(OrderTypeService.getOrderTypes, locationId);
        yield put(ORDER_TYPE_ACTIONS.orderTypeSucceeded(types));
    } catch (e) {
        console.error(`Monitoring order types cannot be fetched.`);
    }
}

function* watchMonitoringOrderType() {
    yield takeLatest(ORDER_TYPE_ACTIONS.ORDER_TYPE_ACTION_REQUEST, fetchMonitoringOrderType);
}

const orderTypeSagas = [
    fork(watchMonitoringOrderType),
];

export default orderTypeSagas;
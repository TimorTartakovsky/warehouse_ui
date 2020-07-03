import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { BOL_ACTIONS, IActionPayload } from '../../actions';
import BOLService from '../../api/BOLService';
import { IBOLMonitoring, IBOLProcessing, IBOLBilling, IBOLShipping } from '../../store/bol/types';


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
        if (props && props.status >= 4) {
            yield call(BOLService.recallMonitoringChangeStatus, props);
            yield put(BOL_ACTIONS.bolMonitoringRecallRequestSuccess(props));
            
        } else {
            yield call(BOLService.recallMonitoringReSign, props);
            yield put(BOL_ACTIONS.bolMonitoringRecallRequestSuccess(props));
        }
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

function* processingUpdateAsync(action: IActionPayload) {
    try {
        const { props } = action.payload || {};
        const updatedData = yield call(BOLService.updateProcess, props);
        if (updatedData) {
            yield put(BOL_ACTIONS.bolProcessingRequest({
                locationId: props.locationId,
                branchId: props.branchId,
            }));
            yield put(BOL_ACTIONS.bolProcessingUpdateRequestSuccess(updatedData));
        } else {
            throw new Error(`Update Process was failed.`);
        }
    } catch(e) {
        yield put(BOL_ACTIONS.bolProcessingUpdateRequestFail(e));
    }
}

function* processingConflictAddress(action: IActionPayload) {
    try {
        const { props } = action.payload || {};
        const conflicts = yield call(BOLService.getProcessConflictAddress, props);
        yield put(BOL_ACTIONS.bolProcessingConflictingAddressRequestSuccess(conflicts));
    } catch(e) {
        yield put(BOL_ACTIONS.bolProcessingConflictingAddressRequestFail(e));
    }
}

function* processingUpdateAddress(action: IActionPayload) {
    try {
        const { props } = action.payload || {};
        const conflicts = yield call(BOLService.updateAddress, props);
        yield put(BOL_ACTIONS.bolProcessingUpdateAddressRequestSuccess(conflicts));
    } catch(e) {
        yield put(BOL_ACTIONS.bolProcessingUpdateAddressRequestFail(e));
    }
}

function* processingGetInfo(action: IActionPayload) {
    try {
        const { props } = action.payload || {};
        const processInfo = yield call(BOLService.getInfo, props);
        yield put(BOL_ACTIONS.bolProcessingGetInfoRequestSuccess(processInfo));
    } catch(e) {
        yield put(BOL_ACTIONS.bolProcessingGetInfoRequestFail(e));
    }
}

function* processingGetBillingInfo(action: IActionPayload) {
    try {
        const { props } = action.payload || {};
        yield put(BOL_ACTIONS.bolProcessingGetBillingInfoRequestStart());
        const billings: IBOLBilling[] = yield call(BOLService.getFindBillings, props);
        yield put(BOL_ACTIONS.bolProcessingGetBillingInfoRequestSuccess(billings));
    } catch(e) {
        yield put(BOL_ACTIONS.bolProcessingGetBillingInfoRequestFail(e));
    }
}

function* processingGetShippingInfo (action: IActionPayload) {
    try {
        const { props } = action.payload || {};
        yield put(BOL_ACTIONS.bolProcessingGetShippingInfoRequestStart());
        const shippings: IBOLShipping[] = yield call(BOLService.getFindShippings, props);
        yield put(BOL_ACTIONS.bolProcessingGetShippingInfoRequestSuccess(shippings));
    } catch(e) {
        yield put(BOL_ACTIONS.bolProcessingGeShippingInfoRequestFail(e));
    }
}

function* processingUpdateBillingAddress(action: IActionPayload) {
    try {
        const { props } = action.payload || {};
        yield put(BOL_ACTIONS.bolProcessingUpdateBillingAddressRequestStart());
        const billingAddress = yield call(BOLService.updateLocationAddress, props);
        yield put(BOL_ACTIONS.bolProcessingUpdateBillingAddressRequestSuccess(billingAddress));
        // have no idea what to do with it
    } catch(e) {
        yield put(BOL_ACTIONS.bolProcessingGeShippingInfoRequestFail(e));
    }
}

function* processingUpdateShippingAddress(action: IActionPayload) {
    try {
        const { props } = action.payload || {};
        yield put(BOL_ACTIONS.bolProcessingUpdateShippingAddressRequestStart());
        const shippingAddress = yield call(BOLService.updateLocationAddress, props);
        yield put(BOL_ACTIONS.bolProcessingUpdateShippingAddressRequestSuccess(shippingAddress));
    } catch(e) {
        yield put(BOL_ACTIONS.bolProcessingUpdateShippingAddressRequestFail(e));
    }
}

function* processingUpdateLocationInfo(action: IActionPayload) {
    try {
        const { props } = action.payload || {};
        yield put(BOL_ACTIONS.bolProcessingUpdateLocationStart());
        const billingAddress = yield call(BOLService.updateLocationInfo, props);
        yield put(BOL_ACTIONS.bolProcessingUpdateLocationSuccess(billingAddress));
        // have no idea what to do with it
    } catch(e) {
        yield put(BOL_ACTIONS.bolProcessingUpdateLocationFail(e));
    }
}

function* processingSplitShipment(action: any) {
    try {
        const { props } = action.payload || {};
        yield put(BOL_ACTIONS.bolProcessingSplitShipmentRequestStart());
        const split = yield call(BOLService.splitBolShipment, props);
        yield put(BOL_ACTIONS.bolProcessingSplitShipmentRequestSuccess(split));
        // have no idea what to do with it
    } catch(e) {
        yield put(BOL_ACTIONS.bolProcessingSplitShipmentRequestFail(e));
    }
}

function* watchBOLProcessingSplitShipment() {
    yield takeLatest(BOL_ACTIONS.BOL_PROCESSING_SPLIT_SHIPMENT_REQUEST, processingSplitShipment);
}

function* watchBOLProcessingUpdateLocationInfo() {
    yield takeLatest(BOL_ACTIONS.BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST, processingUpdateLocationInfo);
}

function* watchBOLProcessingUpdateShippingAddress() {
    yield takeLatest(BOL_ACTIONS.BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST, processingUpdateShippingAddress);
}

function* watchBOLProcessingUpdateBillingAddress() {
    yield takeLatest(BOL_ACTIONS.BOL_PROCESSING_UPDATE_ADDRESS_REQUEST, processingUpdateBillingAddress);
}

function* watchBOLProcessingGetShippingInfo() {
    yield takeLatest(BOL_ACTIONS.BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST, processingGetShippingInfo);
}

function* watchBOLProcessingGetBillingInfo() {
    yield takeLatest(BOL_ACTIONS.BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST, processingGetBillingInfo);
}

function* watchBOLProcessingGetInfo() {
    yield takeLatest(BOL_ACTIONS.BOL_PROCESSING_GET_iNFO_REQUEST, processingGetInfo);
}

function* watchBOLProcessingUpdateAddressRequest() {
    yield takeLatest(BOL_ACTIONS.BOL_PROCESSING_UPDATE_ADDRESS_ACTION_REQUEST, processingUpdateAddress);
}

function* watchBOLProcessingConflictAddressRequest() {
    yield takeLatest(
        BOL_ACTIONS.BOL_PROCESSING_GET_CONFLICTING_ADDRESS_UPDATE_ACTION_REQUEST,
        processingConflictAddress);
}

function* watchBOLProcessingUpdateRequests() {
    yield takeLatest(BOL_ACTIONS.BOL_PROCESSING_UPDATE_ACTION_REQUEST, processingUpdateAsync);
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
    fork(watchBOLProcessingSplitShipment),
    fork(watchBOLProcessingUpdateShippingAddress),
    fork(watchBOLProcessingUpdateLocationInfo),
    fork(watchBOLProcessingUpdateBillingAddress),
    fork(watchBOLProcessingGetShippingInfo),
    fork(watchBOLProcessingGetBillingInfo),
    fork(watchBOLProcessingGetInfo),
    fork(watchBOLProcessingUpdateAddressRequest),
    fork(watchBOLProcessingConflictAddressRequest),
    fork(watchBOLProcessingUpdateRequests),
    fork(watchBOLMonitoringRequests),
    fork(watchBOLProcessingRequests),
    fork(watchBOLMonitoringRecallRequests),
];

export default bolSagas;
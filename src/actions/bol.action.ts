import { IActionPayload, IActionBasic } from ".";
import { IBOLMonitoring, IBOLProcessing } from "../store/bol/types";

export const BOL_MONITORING_ACTION_START = 'BOL_MONITORING_ACTION_START';
export const BOL_MONITORING_ACTION_REQUEST = 'BOL_MONITORING_ACTION_REQUEST';
export const BOL_MONITORING_ACTION_REQUEST_SUCCESS = 'BOL_MONITORING_ACTION_REQUEST_SUCCESS';
export const BOL_MONITORING_ACTION_REQUEST_FAILED = 'BOL_MONITORING_ACTION_REQUEST_FAILED';

export const BOL_PROCESSING_ACTION_START = 'BOL_PROCESSING_ACTION_START';
export const BOL_PROCESSING_ACTION_REQUEST = 'BOL_PROCESSING_ACTION_REQUEST';
export const BOL_PROCESSING_ACTION_REQUEST_SUCCESS = 'BOL_PROCESSING_ACTION_REQUEST_SUCCESS';
export const BOL_PROCESSING_ACTION_REQUEST_FAILED = 'BOL_PROCESSING_ACTION_REQUEST_FAILED';

export type BOLRequestProps = {
    locationId: number;
    branchId: number;
}

export const bolMonitoringStart = (): IActionBasic => ({
    type: BOL_MONITORING_ACTION_START,
});

export const bolMonitoringRequestSuccess = (monitoring: IBOLMonitoring[])
: IActionPayload => ({
    type: BOL_MONITORING_ACTION_REQUEST_SUCCESS,
    payload: { monitoring }
});

export const bolMonitoringRequest = (props: BOLRequestProps)
: IActionPayload => ({
    type: BOL_MONITORING_ACTION_REQUEST,
    payload: { props }
});

export const bolMonitoringRequestFailed = (error: Error)
: IActionPayload => ({
    type: BOL_MONITORING_ACTION_REQUEST_FAILED,
    payload: { error }
});

export const bolProcessingStart = (): IActionBasic => ({
    type: BOL_PROCESSING_ACTION_START,
});

export const bolProcessingRequest = (props: BOLRequestProps)
: IActionPayload => ({
    type: BOL_PROCESSING_ACTION_REQUEST,
    payload: { props }
});

export const bolProcessingRequestSuccess = (processing: IBOLProcessing[])
: IActionPayload => ({
    type: BOL_PROCESSING_ACTION_REQUEST_SUCCESS,
    payload: { processing }
});

export const bolProcessingRequestFailed = (error: Error)
: IActionPayload => ({
    type: BOL_PROCESSING_ACTION_REQUEST_FAILED,
    payload: { error }
});
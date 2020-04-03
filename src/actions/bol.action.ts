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

export const BOL_MONITORING_RECALL_ACTION = 'BOL_MONITORING_RECALL_ACTION';
export const BOL_MONITORING_RECALL_REQUEST_ACTION = 'BOL_MONITORING_RECALL_REQUEST_ACTION';
export const BOL_MONITORING_RECALL_SUCCESS_ACTION = 'BOL_MONITORING_RECALL_SUCCESS_ACTION';
export const BOL_MONITORING_RECALL_FAILED_ACTION = 'BOL_MONITORING_RECALL_FAILED_ACTION';


export type RecallMonitoringProps = {
    orderNumber: string[];
    bolWorkIds: string[];
    carrier: string;
    locationId: number;
}

export const bolMonitoringRecallStart = (): IActionBasic => ({
    type: BOL_MONITORING_RECALL_ACTION,
});

// TODO: understand what is returned and how it should be used after....
export const bolMonitoringRecallRequestSuccess = (monitoring: IBOLMonitoring[])
: IActionPayload => ({
    type: BOL_MONITORING_RECALL_SUCCESS_ACTION,
    payload: { monitoring }
});

export const bolMonitoringRecallRequestFailed = (error: Error)
: IActionPayload => ({
    type: BOL_MONITORING_RECALL_FAILED_ACTION,
    payload: { error }
});

export const bolMonitoringRecallRequest = (props: RecallMonitoringProps)
: IActionPayload => ({
    type: BOL_MONITORING_RECALL_REQUEST_ACTION,
    payload: { props }
});


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
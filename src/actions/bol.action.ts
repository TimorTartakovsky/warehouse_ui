import { IActionPayload, IActionBasic } from ".";
import { IBOLMonitoring, IBOLProcessing, IBOLBilling, IBOLShipping } from "../store/bol/types";

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

export const BOL_PROCESSING_UPDATE_ACTION_START = 'BOL_PROCESSING_UPDATE_ACTION_START';
export const BOL_PROCESSING_UPDATE_ACTION_REQUEST = 'BOL_PROCESSING_UPDATE_ACTION_REQUEST';
export const BOL_PROCESSING_UPDATE_ACTION_REQUEST_SUCCESS = 'BOL_PROCESSING_UPDATE_ACTION_REQUEST_SUCCESS';
export const BOL_PROCESSING_UPDATE_ACTION_REQUEST_FAILED = 'BOL_PROCESSING_UPDATE_ACTION_REQUEST_FAILED';

export const BOL_PROCESSING_GET_CONFLICTING_ADDRESS_ACTION_START = 'BOL_PROCESSING_GET_CONFLICTING_ADDRESS_ACTION_START';
export const BOL_PROCESSING_GET_CONFLICTING_ADDRESS_UPDATE_ACTION_REQUEST = 'BOL_PROCESSING_GET_CONFLICTING_ADDRESS_UPDATE_ACTION_REQUEST';
export const BOL_PROCESSING_GET_CONFLICTING_ADDRESS_UPDATE_ACTION_REQUEST_SUCCESS = 'BOL_PROCESSING_GET_CONFLICTING_ADDRESS_UPDATE_ACTION_REQUEST_SUCCESS';
export const BOL_PROCESSING_GET_CONFLICTING_ADDRESS_UPDATE_ACTION_REQUEST_FAILED = 'BOL_PROCESSING_GET_CONFLICTING_ADDRESS_UPDATE_ACTION_REQUEST_FAILED';

export const BOL_PROCESSING_UPDATE_ADDRESS_ACTION_REQUEST = 'BOL_PROCESSING_UPDATE_ADDRESS_ACTION_REQUEST';
export const BOL_PROCESSING_UPDATE_ADDRESS_ACTION_REQUEST_SUCCESS = 'BOL_PROCESSING_UPDATE_ADDRESS_ACTION_REQUEST_SUCCESS';
export const BOL_PROCESSING_UPDATE_ADDRESS_ACTION_REQUEST_FAILED = 'BOL_PROCESSING_UPDATE_ADDRESS_ACTION_REQUEST_FAILED';

export const BOL_PROCESSING_GET_iNFO_REQUEST = 'BOL_PROCESSING_GET_iNFO_REQUEST';
export const BOL_PROCESSING_GET_iNFO_REQUEST_SUCCESS = 'BOL_PROCESSING_GET_iNFO_REQUEST_SUCCESS';
export const BOL_PROCESSING_GET_iNFO_REQUEST_FAIL = 'BOL_PROCESSING_GET_iNFO_REQUEST_FAIL';

export const BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST = 'BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST';
export const  BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST_START = 'BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST_START';
export const BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST_SUCCESS = 'BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST_SUCCESS';
export const BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST_FAIL = 'BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST_FAIL';

export const BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST = 'BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST';
export const BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST_START = 'BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST_START';
export const BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST_SUCCESS = 'BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST_SUCCESS';
export const BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST_FAIL = 'BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST_FAIL';

export const BOL_PROCESSING_UPDATE_ADDRESS_REQUEST = 'BOL_PROCESSING_UPDATE_ADDRESS_REQUEST';
export const BOL_PROCESSING_UPDATE_ADDRESS_REQUEST_START = 'BOL_PROCESSING_UPDATE_ADDRESS_REQUEST_START';
export const BOL_PROCESSING_UPDATE_ADDRESS_REQUEST_SUCCESS = 'BOL_PROCESSING_UPDATE_ADDRESS_REQUEST_SUCCESS';
export const BOL_PROCESSING_UPDATE_ADDRESS_REQUEST_FAIL = 'BOL_PROCESSING_UPDATE_ADDRESS_REQUEST_FAIL';

export const BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST = 'BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST';
export const BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST_START = 'BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST_START';
export const BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST_SUCCESS = 'BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST_SUCCESS';
export const BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST_FAIL = 'BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST_FAIL';

export const BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST = 'BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST';
export const BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST_START = 'BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST_START';
export const BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST_SUCCESS = 'BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST_SUCCESS';
export const BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST_FAIL = 'BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST_FAIL';


export interface IUpdateShippingAddress {
    bolIds: string[];
    locationId: number;
    shipToCountry: string;
    updateParams: {
        shipToAddressId?: string;
        shipToCustomerId?: string;
        shipToCustomerName?: string;
        shipToCustomerNumber?: string;
    };
}

export const bolProcessingUpdateShippingAddressRequest = (props: IUpdateShippingAddress): IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST,
    payload: { props }
});

export const bolProcessingUpdateShippingAddressRequestSuccess = (shipping: any): IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST_SUCCESS,
    payload: { shipping }
});

export const bolProcessingUpdateShippingAddressRequestFail = (error: Error): IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST_FAIL,
    payload: { error }
});

export const bolProcessingUpdateShippingAddressRequestStart = (): IActionBasic => ({
    type: BOL_PROCESSING_UPDATE_SHIPPING_ADDRESS_REQUEST_START,
});

export interface IBOLUpdateLocationInfo {
    classRate: string;
    description: string;
    eta: string | null;
    ids: number[];
    internalRemark: string;
    quoteAmount: string;
    quoteNumber: string;
    revisedWeight: number;
    shipperName: string;
    specInst: string;
}

export const bolProcessingUpdateLocationStart = (): IActionBasic => ({
    type: BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST_START,
});

export const bolProcessingUpdateLocationRequest = (props: IBOLUpdateLocationInfo): IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST,
    payload: { props }
});

export const bolProcessingUpdateLocationSuccess = (billing: any): IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST_SUCCESS,
    payload: { billing }
});

export const bolProcessingUpdateLocationFail = (error: Error): IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_LOCATION_INFO_REQUEST_FAIL,
    payload: { error }
});

export interface IUpdateBillingAddress {
    bolIds: string[];
    locationId: number;
    shipToCountry: string;
    updateParams: {
        billToAddressId?: string;
        billToCustomerId?: string;
        billToCustomerName?: string;
        billToCustomerNumber?: string;
    }
}

export const bolProcessingUpdateBillingAddressRequest = (props: IUpdateBillingAddress): IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_ADDRESS_REQUEST,
    payload: { props }
});

export const bolProcessingUpdateBillingAddressRequestSuccess = (billing: any): IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_ADDRESS_REQUEST_SUCCESS,
    payload: { billing }
});

export const bolProcessingUpdateBillingAddressRequestFail = (error: Error): IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_ADDRESS_REQUEST_FAIL,
    payload: { error }
});

export const bolProcessingUpdateBillingAddressRequestStart = (): IActionBasic => ({
    type: BOL_PROCESSING_UPDATE_ADDRESS_REQUEST_START,
});

export const bolProcessingGetBillingInfoRequestStart = (): IActionBasic => ({
    type: BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST_START,
});

export const bolProcessingGetBillingInfoRequest = (props: string)
: IActionPayload => ({
    type: BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST,
    payload: { props }
});

export const bolProcessingGetBillingInfoRequestSuccess = (billings: IBOLBilling[])
: IActionPayload => ({
    type: BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST_SUCCESS,
    payload: { billings }
});

export const bolProcessingGetBillingInfoRequestFail = (error: Error)
: IActionPayload => ({
    type: BOL_PROCESSING_GET_BILLINGS_iNFO_REQUEST_FAIL,
    payload: { error }
});


export const bolProcessingGetShippingInfoRequestStart = (): IActionBasic => ({
    type: BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST_START,
});

export const bolProcessingGetShippingInfoRequest = (props: string)
: IActionPayload => ({
    type: BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST,
    payload: { props }
});

export const bolProcessingGetShippingInfoRequestSuccess = (shippings: IBOLShipping[])
: IActionPayload => ({
    type: BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST_SUCCESS,
    payload: { shippings }
});

export const bolProcessingGeShippingInfoRequestFail = (error: Error)
: IActionPayload => ({
    type: BOL_PROCESSING_GET_SHIPPINGS_iNFO_REQUEST_FAIL,
    payload: { error }
});

export type ProcessingInfo = {
    id: number;
    quoteAmount: number;
    classRate: number;
    description: string;
    internalRemark: string;
    quoteNumber: string;
    shipperName: string;
    specialInstruction: string;
    eta: string;
    revisedWeight: string;
    billToAddress1: string;
    billToAddress2: string;
    billToAddress3: string;
    billToAddress4: string;
    billToCity: string;
    billToState: string;
    billToZip: string;
    billToCountry: string;
    billToPhone: string;
    shipToAddress1: string;
    shipToAddress2: string;
    shipToAddress3: string;
    shipToAddress4: string;
    shipToCity: string;
    shipToState: string;
    shipToZip: string;
    shipToCountry: string;
    shipToPhone: string;
}

export type ProcessingGetInfo = {
    bolId: number;
    bolIds: number[];
    billToAddressId: number;
    shipToAddressId: number;
}

export const bolProcessingGetInfoRequest = (props: ProcessingGetInfo)
: IActionPayload => ({
    type: BOL_PROCESSING_GET_iNFO_REQUEST,
    payload: { props }
});

export const bolProcessingGetInfoRequestSuccess = (processInfo: ProcessingInfo)
: IActionPayload => ({
    type: BOL_PROCESSING_GET_iNFO_REQUEST_SUCCESS,
    payload: { processInfo }
});

export const bolProcessingGetInfoRequestFail = (error: Error)
: IActionPayload => ({
    type: BOL_PROCESSING_GET_iNFO_REQUEST_FAIL,
    payload: { error }
});

export type UpdateAddress = {
    bolIds: string[];
    shipToCountry: string;
    locationId: number;
    newAddressBolId: string;
    updateParams: {
        shipToAddressId: string;
        shipToCustomerName: string;
        shipToCustomerNumber: string;
        shipToCustomerId: string;
        freightTerms: string;
    }
}

export const bolProcessingUpdateAddressRequest = (props: UpdateAddress)
: IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_ADDRESS_ACTION_REQUEST,
    payload: { props }
});

export const bolProcessingUpdateAddressRequestSuccess = (props: IBOLProcessing[])
: IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_ADDRESS_ACTION_REQUEST_SUCCESS,
    payload: { props }
});

export const bolProcessingUpdateAddressRequestFail = (error: Error)
: IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_ADDRESS_ACTION_REQUEST_FAILED,
    payload: { error }
});

export type ConflictAddressType = {
    id?: number;
    shipToLocation?: string;
    shipToSiteUseId?: string;
    shipToLocationId?: number;
    shipToAddressId?: string;
    shipToAddress1?: string;
    shipToAddress2?: string;
    shipToAddress3?: string;
    shipToAddress4?: string;
    shipToCity?: string;
    shipToState?: string;
    shipToZip?: string;
    shipToCountry?: string;
    shipToPhone?: string;
    shipToCustomerId?: string;
    shipToCustomerNumber?: string;
    shipToCustomerName?: string;
}

export const bolProcessingConflictingAddressRequest = (props: number[])
: IActionPayload => ({
    type: BOL_PROCESSING_GET_CONFLICTING_ADDRESS_UPDATE_ACTION_REQUEST,
    payload: { props }
});

export const bolProcessingConflictingAddressRequestSuccess = (conflictAddress: ConflictAddressType[])
: IActionPayload => ({
    type: BOL_PROCESSING_GET_CONFLICTING_ADDRESS_UPDATE_ACTION_REQUEST_SUCCESS,
    payload: { conflictAddress }
});

export const bolProcessingConflictingAddressRequestFail = (error: Error)
: IActionPayload => ({
    type: BOL_PROCESSING_GET_CONFLICTING_ADDRESS_UPDATE_ACTION_REQUEST_FAILED,
    payload: { error }
});

export type UpdateProcessProps = {
    // orders: Partial<IBOLProcessing>;
    orders: any;
    locationId: number;
    branchId: number;
    status: number;
    taskType: number;
    brokerApi: number;
    bolNumbers: string[];
}

export const bolProcessingUpdateRequest = (props: UpdateProcessProps)
: IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_ACTION_REQUEST,
    payload: { props }
});

export const bolProcessingUpdateRequestSuccess = (props: UpdateProcessProps)
: IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_ACTION_REQUEST_SUCCESS,
    payload: { props }
});

export const bolProcessingUpdateRequestFail = (error: Error)
: IActionPayload => ({
    type: BOL_PROCESSING_UPDATE_ACTION_REQUEST_FAILED,
    payload: { error }
});

export type RecallMonitoringProps = {
    orderNumbers: string[];
    taskId: number;
    bolNumbers: string;
    bolWorkIds: number[];
    carrier: string;
    locationId: number;
    status: number;
}

export const bolMonitoringRecallStart = (): IActionBasic => ({
    type: BOL_MONITORING_RECALL_ACTION,
});

// TODO: understand what is returned and how it should be used after....
export const bolMonitoringRecallRequestSuccess = (recall: RecallMonitoringProps)
: IActionPayload => ({
    type: BOL_MONITORING_RECALL_SUCCESS_ACTION,
    payload: { recall }
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
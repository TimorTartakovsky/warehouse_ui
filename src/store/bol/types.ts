import { ConflictAddressType, ProcessingInfo } from "../../actions/bol.action";

export interface IBOLMonitoring {
    id: number;
    bolIds: number[];
    bolNumber: string;
    brokerApi: number;
    proNumber: string;
    freightTerms: string;
    freightCharges: number;
    carrier: string;
    customerNumber: string;
    customerName: string;
    bolStatus: number;
    shipToCountry: string;
    orderNumbers: Array<string>;
    firstOrder: string;
    deliveryNumbers: Array<string>;
    skids: number;
    skid: number;
    revisedWeight: number;
    boxes: number;
    taskId: number;
    checkedDate: Date;
    deliveryDays: number;
    quoteNumber: number;
    quoteAmount: number;
    apiCarrier: number;
    apiCarrierId: number;
}

export interface ICarrier {
    carrierNumber: string;
    carrierName: string;
    scacCode: string;
    cnt: number;
    firstLetter?: string;
}

export interface IBOLProcessing {
    id: number;
    bolNumber: null
    bolStatus: number;
    proNumber: string;
    freightTerms: string;
    carrier: string;
    carriers: ICarrier[];
    orderNumber:string;
    pilot?: string;
    deliveryNumber: string;
    customerName: string;
    shipToCustomerName: string;
    shipToCustomerNumber: string;
    shipToAddressId: number;
    billToCustomerName: string;
    billToCustomerNumber: string;
    billToAddressId: number;
    freightCharges: number;
    maxPalletsSplit: null
    customerNumber: string;
    skid: number;
    originalWeight: number;
    revisedWeight: string;
    boxes: number;
    brokerApi: number;
    customerShipToAddress1: string;
    shipToCity: string;
    shipToState: string;
    bolSplitWarning: null
    billToBOL: null
    remarks: string;
    orderSubType: number;
    palletTrigger: number;
    shipToAddress1: string;
    shipToAddress2: string;
    shipToAddress3: null
    shipToAddress4: null
    orderDate: Date;
    releasedDate: Date;
    dueDate: Date;
    orderParts: number;
}

export interface IBOLBilling {
    billToAddress1: string;
    billToAddress2: string;
    billToAddress3: string;
    billToAddress4: string;
    billToAddressId: string;
    billToCity: string;
    billToCountry: string;
    billToCustomerId: string;
    billToCustomerName: string;
    billToCustomerNumber: string;
    billToIdentifyingFlag: string;
    billToLocation: string;
    billToLocationId: string;
    billToPhone: string;
    billToSiteUseId: string;
    billToState: string;
    billToZip: string;
    id: number;
}

export interface IBOLShipping {
    id: number;
    shipToAddress1: string;
    shipToAddress2: string;
    shipToAddress3: string;
    shipToAddress4: string;
    shipToAddressId: string;
    shipToCity: string;
    shipToCountry: string;
    shipToCustomerId: string;
    shipToCustomerName: string;
    shipToCustomerNumber: string;
    shipToLocation: string;
    shipToLocationId: number;
    shipToPhone: string;
    shipToSiteUseId: string;
    shipToState: string;
    shipToZip: string;
}

export interface IBOLState {
    monitoring?: IBOLMonitoring[] | null;
    conflictAddress: ConflictAddressType[] | null;
    processing?: IBOLProcessing[] | null;
    isMonitoringBolRequestFailed: boolean;
    isProcessingBolRequestFailed: boolean;
    monitoringBolRequestErrorMessage: string;
    processingBolRequestErrorMessage: string;
    processInfo: ProcessingInfo | null;
    billings: IBOLBilling[] | null;
    shippings: IBOLShipping[] | null;
}

export const initBOLState: IBOLState = {
    monitoring: null,
    processing: null,
    conflictAddress: null,
    processInfo: null,
    billings: null,
    shippings: null,
    isMonitoringBolRequestFailed: false,
    isProcessingBolRequestFailed: false,
    monitoringBolRequestErrorMessage: '',
    processingBolRequestErrorMessage: '',
}
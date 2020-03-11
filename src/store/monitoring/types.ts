import { EOrderTypeOptions, EOrderSubTypeOptions } from "../order-type/types";

export interface IMonitoring {
    id: number;
    oracleId: number;
    overallRank: number;
    orderType: number;
    orderSubType: number;
    orderDate: string;
    dueDate: string;
    locationId: number;
    releasedDate: string;
    pieces: number;
    serverTimeZone: number;
    customerName: string;
    customerNumber: string;
    customerGroup: string;
    orderNumber: string;
    shipToCity: string;
    shipToState: string;
    deliveryNumber: string;
    cancStatus: number;
    putOnHold: number;
    orderStage: number;
    userId: number;
    batchNumber: string;
    batchStage: number;
    batchProcessType: 2
    startDateTime: string;
    endDateTime: string;
    splitted: number;
    singleSplitUser: number;
    username: string;
    pickupTime: string;
    diff: number;
    markOrder: number;
    locationTime: string;
    orderDateOffset: string;
    orderDatePickup: string;
    orderDatePt:string;
    orderDateOd: string;
    exceptionAccess: boolean;
}

export interface IMonitoringState {
    isRequestFailed: boolean;
    failRequestMessage?: string;
    primaryColumn: string;
    currentTab: EOrderTypeOptions;
    currentSubTab: EOrderSubTypeOptions;
    monitoringArray: IMonitoring[];
}

export const initMonitoring: IMonitoringState = {
    isRequestFailed: false,
    currentTab: EOrderTypeOptions.willCall,
    currentSubTab: EOrderSubTypeOptions.willCall,
    primaryColumn: 'batchNumber',
    failRequestMessage: '',
    monitoringArray: [],
}

import { EOrderTypeOptions, EOrderSubTypeOptions } from "../order-type/types";

export interface IMonitoring {
    id: number;
    firstName: string;
    shipToCountry: string;
    returnNumber: string;
    lastName: string;
    startDate: string;
    endDate: string;
    oracleId: number;
    masterBatchId: string;
    receivedDate: string;
    transferType: string;
    inspectionWorker: string;
    shelvingWorker: string;
    dockNumber: string;
    rgaStatus: string;
    overallRank: number;
    trNumber: string;
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
    shipperId: string;
    singleSplitUser: number;
    username: string;
    pickupTime: string;
    diff: number;
    markOrder: number;
    createdDate: string;
    toLocationCode: string;
    locationTime: string;
    orderDateOffset: string;
    orderDatePickup: string;
    orderDatePt:string;
    orderDateOd: string;
    exceptionAccess: boolean;
}

export interface IMonitoringTableColumnMap {
    [EOrderTypeOptions.willCall]: {
        [EOrderSubTypeOptions.willCall]: string;
    };
    [EOrderTypeOptions.express]: {
        [EOrderSubTypeOptions.ups]: string;
        [EOrderSubTypeOptions.onTrac]: string;
        [EOrderSubTypeOptions.fedx]: string;
    };
    [EOrderTypeOptions.stockOrder]: {
        [EOrderSubTypeOptions.stockOrder]: string;
    };
    [EOrderTypeOptions.rgaOrder]: {
        [EOrderSubTypeOptions.returns]: string;
    };
    [EOrderTypeOptions.transferOut]: {
        [EOrderSubTypeOptions.transferOut]: string;
    };
}

export const PRIMARY_COLUMN_MAP: IMonitoringTableColumnMap = {
    [EOrderTypeOptions.willCall]: {
        [EOrderSubTypeOptions.willCall]: 'id'
    },
    [EOrderTypeOptions.express]: {
        [EOrderSubTypeOptions.ups]: 'orderNumber', // oracleId
        [EOrderSubTypeOptions.onTrac]: 'orderNumber', // oracleId
        [EOrderSubTypeOptions.fedx]: 'batchNumber', // id oracleId
    },
    [EOrderTypeOptions.stockOrder]: {
        [EOrderSubTypeOptions.stockOrder]: 'orderNumber',
    },
    [EOrderTypeOptions.rgaOrder]: {
        [EOrderSubTypeOptions.returns]: 'masterBatchId',
    },
    [EOrderTypeOptions.transferOut]: {
        [EOrderSubTypeOptions.transferOut]: 'trNumber',
    } 
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

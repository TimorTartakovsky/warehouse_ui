export interface ICutOffPickup {
    id: number;
    locationId: number;
    orderTypeId: number;
    orderType: number;
    orderSubType: number;
    cutoff: string;
    pickup: string;
    createdAt: string;
    updatedAt: string;
}

export interface IOrderType {
    cutOffPickup?: ICutOffPickup[];
    createdAt: string;
    updatedAt: string;
    locationId: number;
    orderType: number;
    orderSubType: number;
    activated: boolean;
    name: string;
    shortName: string;
    referenceId: number;
    combineByItems: boolean;
    combineByOrders: boolean;
    combineByCbf: boolean;
    combineByItemsNumber: number;
    combineByOrdersNumber: number;
    combineByCbfNumber: number;
    splitFlag: boolean;
    splitByItems: boolean;
    splitBySales: boolean;
    splitByCbf: boolean;
    splitByItemsNumber: number;
    splitBySalesNumber: number;
    splitByCbfNumber: number;
    freightFlag: boolean;
    multiplePackFlag: boolean;
    numberDocks: number;
    startAfterNumbOrder: number;
    binLocationFlag: boolean;
    binLocation: number;
    pickPackFlag: boolean;
    wrapFlag: boolean;
    avgOrderPickTime: number;
    avgOrderPackTime: number;
    avgOrderWrapTime: number;
    avgPieces: number;
    avgSalesAmt: number;
    numberOrders: number;
    numberItems: number;
    expressMixModeFlag: boolean;
    mixOrderTypeFlag: boolean;
    boxDimensionFlag: boolean;
    expGroup1Items: number;
    expGroup1Orders: number;
    expGroup1Maxvolume: number;
    expGroup1Qdr: number;
    expGroup2Items: number;
    expGroup2Orders: number;
    expGroup2Maxvolume: number;
    expGroup2Qdr: number;
    expGroup3Items: number;
    expGroup3Orders: number;
    expGroup3Maxvolume: number;
    expGroup3Qdr: number;
    expGroup4Items: number;
    expGroup4Orders: number;
    expGroup4Maxvolume: number;
    expGroup4Qdr: number;
    managerAccess: boolean;
    refreshTime: number;
    accumFreightCharge: boolean;
    activateAPI: boolean;
    defaultPalletWeight: number;
    accountNumber: string;
    accessKeys: number;
    cutOffDay: number;
    cutOffTime: number;
    trxLastCutoffDate: number;
    maxTrxNumberPallets: number;
    multipleWorkers: boolean;
    nextShipment: number;
    initiateShelvingProcess: number;
    dimensionAdjustment: number;
    daysProcessing: number;
    managerDaily: number;
    deleteCancelled: number;
    oversizeCharge: boolean;
    fuelSurcharge: number;
    brokerApi: number;
    id: number;
}

export enum EOrderTypeOptions {
    willCall = 'Will Call',
    express = 'Express',
    stockOrder = 'Stock Order',
    rgaOrder = 'RGA Order',
    transferOut = 'Transfer Out',
}

export enum EOrderSubTypeOptions {
    willCall = 'Will Call',
    ups = 'UPS',
    onTrac = 'On Trac',
    rgaOrder = 'RGA Order',
    fedx = 'Fedex',
    stockOrder = 'Stock Order',
    returns = 'Returns',
    transferOut = 'Transfer Out',
}

export type OrderTypeMaskObject = {
    type: number;
    subtype: number;
}

export interface IOrderTypeMask {
    [EOrderTypeOptions.willCall]: {
        [EOrderSubTypeOptions.willCall]: OrderTypeMaskObject;
    };
    [EOrderTypeOptions.express]: {
        [EOrderSubTypeOptions.ups]: OrderTypeMaskObject;
        [EOrderSubTypeOptions.onTrac]: OrderTypeMaskObject;
        [EOrderSubTypeOptions.fedx]: OrderTypeMaskObject;
    };
    [EOrderTypeOptions.stockOrder]: {
        [EOrderSubTypeOptions.stockOrder]: OrderTypeMaskObject;
    };
    [EOrderTypeOptions.rgaOrder]: {
        [EOrderSubTypeOptions.returns]: OrderTypeMaskObject;
    };
    // [EOrderTypeOptions.transferOut]: {
    //     [EOrderSubTypeOptions.transferOut]: OrderTypeMaskObject;
    // };
}

export const ORDER_MASKS: IOrderTypeMask = {
    [EOrderTypeOptions.willCall]: {
        [EOrderSubTypeOptions.willCall]: {
            type: 1,
            subtype: 0,
        }
    },
    [EOrderTypeOptions.express]: {
        [EOrderSubTypeOptions.ups]: {
            type: 2,
            subtype: 1,
        },
        [EOrderSubTypeOptions.onTrac]: {
            type: 2,
            subtype: 3,
        },
        [EOrderSubTypeOptions.fedx]: {
            type: 2,
            subtype: 2,
        }
    },
    [EOrderTypeOptions.stockOrder]: {
        [EOrderSubTypeOptions.stockOrder]: {
            type: 1,
            subtype: 0,
        }
    },
    [EOrderTypeOptions.rgaOrder]: {
        [EOrderSubTypeOptions.returns]: {
            type: 6,
            subtype: 0,
        }
    },
    // [EOrderTypeOptions.transferOut]: {
    //     [EOrderSubTypeOptions.transferOut]: {
    //         type: 0,
    //         subtype: 0,
    //     }
    // } 
}

export interface IOrderTypeState {
    isRequestFailed: boolean;
    failRequestMessage?: string;
    orderTypes: IOrderType[];
}

export const initMonitoring: IOrderTypeState = {
    isRequestFailed: false,
    failRequestMessage: '',
    orderTypes: [],
}
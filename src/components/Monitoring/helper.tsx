import React from 'react';
import { EOrderTypeOptions, EOrderSubTypeOptions } from '../../store/order-type/types';
import { IMonitoring } from '../../store/monitoring/types';
import {RegularTypography} from '../Shared/Typography';
const moment = require('moment');
const DATE_TIME_FORMAT = 'DD/MM HH:mm';
const DATE_TIME_DB = 'YYYY-MM-DD HH:mm:ss';

const getStatus = (s: number) => {
   switch(s) {
        case 1: return 'Picking';
        case 2: return 'Packing';
        case 3: return 'Wrapping';
        case 4: return 'Ship Ready';
        case 5: return 'Completed';
        case 9: return 'Canceled';
        case 6: return 'We dont have it yet';
        default: return 'Picking';
   } 
}

const generateExpressHeaders = (): any[] => {
    return [
        { id: 'orderNumber', numeric: false, disablePadding: true, label: 'Order' },
        { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer Name' },
        { id: 'orderDate', numeric: false, disablePadding: true, label: 'Order Dt' },
        { id: 'dueDate', numeric: false, disablePadding: true, label: 'Due Dt' },
        { id: 'stage', numeric: false, disablePadding: true, label: 'Stage' },
        { id: 'username', numeric: false, disablePadding: true, label: 'Employee' },
        { id: 'startDateTime', numeric: false, disablePadding: true, label: 'Start Date' },
        { id: 'hold', numeric: false, disablePadding: true, label: 'Hold'},
    ];
}

const generateWillCallHeaders = (): any[] => {
    return [
        { id: 'orderNumber', numeric: false, disablePadding: true, label: 'Order' },
        { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer Name' },
        { id: 'orderDate', numeric: false, disablePadding: true, label: 'Order Dt' },
        { id: 'dueDate', numeric: false, disablePadding: true, label: 'Due Dt' },
        { id: 'stage', numeric: false, disablePadding: true, label: 'Stage' },
        { id: 'username', numeric: false, disablePadding: true, label: 'Employee' },
        { id: 'startDateTime', numeric: false, disablePadding: true, label: 'Start Date' },
        { id: 'hold', numeric: false, disablePadding: true, label: 'Hold'},
    ];
}

const generateWillCallRows = (arr: IMonitoring[]): any[] => {
    return arr.map((m:IMonitoring) => ({
        id: m.id,
        orderNumber: {
            source: m.orderNumber,
            value1: (<RegularTypography length="120px">{m.orderNumber}</RegularTypography>),
            isFocused: false,
            value2: (<RegularTypography length="120px">BN: {m.batchNumber}</RegularTypography>) 
        },
        customerName: {
            source: m.customerName,
            value1: (<RegularTypography length="200px">{m.customerName}</RegularTypography>),
            isFocused: false,
            value2: (<RegularTypography length="200px">Address: {m.shipToCity}, {m.shipToState}, {m.shipToCountry}</RegularTypography>) 
        },
        orderDate: {
            source: m.orderDate,
            value1: (<RegularTypography length="120px">
                {moment(m.orderDate, DATE_TIME_DB).format(DATE_TIME_FORMAT)}
            </RegularTypography>),
            isFocused: false,
            value2: (<RegularTypography length="120px">{
                moment(m.releasedDate, DATE_TIME_DB).format(DATE_TIME_FORMAT)
            }</RegularTypography>) 
        },
        dueDate: {
            source: m.dueDate,
            value1: ( <RegularTypography length="120px">{
                moment(m.dueDate, DATE_TIME_DB).format(DATE_TIME_FORMAT)
               }</RegularTypography>),
            isFocused: false,
            value2: ( <RegularTypography length="120px">Pieces: {m.pieces}</RegularTypography>) 
        },
        stage: {
            source: m.orderType,
            value1: (<RegularTypography length="100px">{
                getStatus(m.orderType)
            }</RegularTypography>),
            isFocused: false, 
        },
        username: {
            source: m.username,
            value1: (<RegularTypography length="100px">{m.username}</RegularTypography>),
            isFocused: false, 
        },
        startDateTime: {
            source: m.startDateTime,
            value1: (<RegularTypography length="120px">{
                moment(m.startDateTime, DATE_TIME_DB).format(DATE_TIME_FORMAT)
               }</RegularTypography>),
            isFocused: false,
            value2: ( <RegularTypography length="120px">{
                moment(m.endDateTime, DATE_TIME_DB).format(DATE_TIME_FORMAT)
                }</RegularTypography>) 
        },
        hold: {
            source: '',
            value1: (<RegularTypography length="20px"></RegularTypography>),
            isFocused: false, 
        },
    }));
}

const generateStockOrderHeaders = (): any[] => {
    return [
        { id: 'orderNumber', numeric: false, disablePadding: true, label: 'Order' },
        { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer Name' },
        { id: 'orderDate', numeric: false, disablePadding: true, label: 'Order Dt' },
        { id: 'dueDate', numeric: false, disablePadding: true, label: 'Due Dt' },
        { id: 'stage', numeric: false, disablePadding: true, label: 'Stage' },
        { id: 'username', numeric: false, disablePadding: true, label: 'Employee' },
        { id: 'startDateTime', numeric: false, disablePadding: true, label: 'Start Date' },
        { id: 'hold', numeric: false, disablePadding: true, label: 'Hold' },
    ];
}

const generateStockOrderRows = (arr: IMonitoring[]): any[] => {
    return arr.map(m => ({
        id: m.id,
        orderNumber: {
            source: m.orderNumber,
            value1: (<RegularTypography length="120px">{m.orderNumber}</RegularTypography>),
            isFocused: false,
            value2: (<RegularTypography length="120px">BN: {m.batchNumber}</RegularTypography>) 
        },
        customerName: {
            source: m.customerName,
            value1: (<RegularTypography length="200px">{m.customerName}</RegularTypography>),
            isFocused: false,
            value2: (<RegularTypography length="200px">Address: {m.shipToCity}, {m.shipToState}, {m.shipToCountry}</RegularTypography>) 
        },
        orderDate: {
            source: m.releasedDate,
            value1: (<RegularTypography length="120px">
                {moment(m.orderDate, DATE_TIME_DB).format(DATE_TIME_FORMAT)}
            </RegularTypography>),
            isFocused: false,
            value2: (<RegularTypography length="120px">{
                moment(m.releasedDate, DATE_TIME_DB).format(DATE_TIME_FORMAT)
            }</RegularTypography>) 
        },
        dueDate: {
            source: m.dueDate,
            value1: ( <RegularTypography length="120px">{
                moment(m.dueDate, DATE_TIME_DB).format(DATE_TIME_FORMAT)
               }</RegularTypography>),
            isFocused: false,
            value2: ( <RegularTypography length="120px">Pieces: {m.pieces}</RegularTypography>) 
        },
        stage: {
            source: m.orderType,
            value1: (<RegularTypography length="100px">{
                getStatus(m.orderType)
            }</RegularTypography>),
            isFocused: false, 
        },
        username: {
            source: m.username,
            value1: (<RegularTypography length="100px">{m.username}</RegularTypography>),
            isFocused: false, 
        },
        startDateTime: {
            source: m.startDateTime,
            value1: (<RegularTypography length="120px">{
                moment(m.startDateTime, DATE_TIME_DB).format(DATE_TIME_FORMAT)
               }</RegularTypography>),
            isFocused: false,
            value2: ( <RegularTypography length="120px">{
                moment(m.endDateTime, DATE_TIME_DB).format(DATE_TIME_FORMAT)
                }</RegularTypography>) 
        },
        hold: {
            source: '',
            value1: (<RegularTypography length="20px"></RegularTypography>),
            isFocused: false, 
        },
    }));
}



const generateTransferOutHeaders = (): any[] => {
    return [
        { id: 'trNumber', numeric: false, disablePadding: true, label: 'TR Number' },
        { id: 'transferType', numeric: false, disablePadding: true, label: 'Type' },
        { id: 'createdDate', numeric: false, disablePadding: true, label: 'Created Date' },
        { id: 'toLocationCode', numeric: false, disablePadding: true, label: 'To Location' },
        { id: 'shipperId', numeric: false, disablePadding: true, label: 'Shipper ID' },
        { id: 'pieces', numeric: false, disablePadding: true, label: 'Pieces' },
        { id: 'stage', numeric: false, disablePadding: true, label: 'Picked Completed' },
        { id: 'employee', numeric: false, disablePadding: true, label: 'Employee' },
        { id: 'startDate', numeric: false, disablePadding: true, label: 'Start Date' },
        { id: 'endDate', numeric: false, disablePadding: true, label: 'End Date' },
        { id: 'hold', numeric: false, disablePadding: true, label: 'Hold' },
    ];
}

const generateRGAOrderHeaders = (): any[] => {
    return [
        { id: 'returnNumber', numeric: false, disablePadding: true, label: 'RGA Order' },
        { id: 'type', numeric: false, disablePadding: true, label: 'Type' },
        { id: 'masterBatchId', numeric: false, disablePadding: true, label: 'Batch' },
        { id: 'customerNumber', numeric: false, disablePadding: true, label: 'Custom ID' },
        { id: 'shipToCity', numeric: false, disablePadding: true, label: 'City' },
        { id: 'createdDate', numeric: false, disablePadding: true, label: 'RGA Dt' },
        { id: 'receivedDate', numeric: false, disablePadding: true, label: 'Delivery Dt' },
        { id: 'pieces', numeric: false, disablePadding: true, label: 'Pieces' },
        { id: 'inspectionWorker', numeric: false, disablePadding: true, label: 'Inspection' },
        { id: 'shelvingWorker', numeric: false, disablePadding: true, label: 'Shelving' },
        { id: 'dockNumber', numeric: false, disablePadding: true, label: 'Dock' },
        { id: 'rgaStatus', numeric: false, disablePadding: true, label: 'Stage' },
    ];
}

const generateRGAOrderRows = (arr: IMonitoring[]): any[] => {
    return arr.map(m => ({
        returnNumber: {
            value: m.returnNumber,
            source: m.returnNumber,
        },
        type: {
            value: 'G',
            source: 'G',
        },
        masterBatchId: {
            value: m.masterBatchId,
            source: m.masterBatchId
        },
        customerNumber: {
            value: m.customerNumber,
            source: m.customerNumber
        },
        shipToCity: {
            value: m.shipToCity,
            source: m.shipToCity
        },
        createdDate: {
            value: moment(m.createdDate, DATE_TIME_DB).format(DATE_TIME_FORMAT),
            source: moment(m.createdDate, DATE_TIME_DB).format(DATE_TIME_FORMAT)
        },
        receivedDate: {
            value: moment(m.receivedDate, DATE_TIME_DB).format(DATE_TIME_FORMAT),
            source: moment(m.receivedDate, DATE_TIME_DB).format(DATE_TIME_FORMAT),
        },
        pieces: {
            value: m.pieces,
            source: m.pieces
        },
        inspectionWorker: {
            value: m.inspectionWorker,
            source: m.inspectionWorker
        },
        shelvingWorker: {
            value: m.shelvingWorker,
            source: m.shelvingWorker
        },
        dockNumber: {
            value: m.dockNumber,
            source: m.dockNumber
        },
        rgaStatus: {
            value: m.rgaStatus,
            source: m.rgaStatus
        },
    }));
}

const generateTransferOutRows = (arr: IMonitoring[]): any[] => {
    return arr.map((m:IMonitoring) => ({
        trNumber: {
            value: m.trNumber,
            source: m.trNumber,
        },
        transferType: {
            value: m.transferType,
            source: m.transferType,
        },
        createdDate: {
            value: moment(m.createdDate, DATE_TIME_DB).format(DATE_TIME_FORMAT),
            source: moment(m.createdDate, DATE_TIME_DB).format(DATE_TIME_FORMAT),
        },
        toLocationCode: {
            value: m.toLocationCode,
            source: m.toLocationCode,
        },
        shipperId: {
            value: m.shipperId,
            source: m.shipperId,
        },
        pieces: {
            value: m.pieces,
            source: m.pieces,
        },
        releasedDate: {
            value: moment(m.releasedDate, DATE_TIME_DB).format(DATE_TIME_FORMAT),
            source: moment(m.releasedDate, DATE_TIME_DB).format(DATE_TIME_FORMAT),
        },
        stage: {
            value: getStatus(m.orderType),
            source: getStatus(m.orderType),
        },
        employee: {
            value: `${m.firstName} ${m.lastName}`,
            source: `${m.firstName} ${m.lastName}`,
        },
        startDate: {
            value: moment(m.startDate, DATE_TIME_DB).format(DATE_TIME_FORMAT),
            source: moment(m.startDate, DATE_TIME_DB).format(DATE_TIME_FORMAT),
        },
        endDate: {
            value: moment(m.endDate, DATE_TIME_DB).format(DATE_TIME_FORMAT),
            source: moment(m.endDate, DATE_TIME_DB).format(DATE_TIME_FORMAT),
        },
        hold: {
            value: '',
            source: '',
        },
    }));
}

export const isExpandableTable = (option: EOrderTypeOptions): boolean => {
    switch (option) {
        case EOrderTypeOptions.willCall:
        case EOrderTypeOptions.express:
        case EOrderTypeOptions.stockOrder:
            return true;
        case EOrderTypeOptions.rgaOrder:
        case EOrderTypeOptions.transferOut:
            return false;
        default: return false;
    }
}

export const willCallToolbar = () => {
    
}

export const generateToolbar = (
    option: EOrderTypeOptions,
    subOption: EOrderSubTypeOptions,
) => {
    switch (option) {
        case EOrderTypeOptions.willCall:
        case EOrderTypeOptions.express:
        case EOrderTypeOptions.stockOrder:
        case EOrderTypeOptions.rgaOrder:
        case EOrderTypeOptions.transferOut:
    }
}

export const generateMonitoringHeaders = (
    option: EOrderTypeOptions,
    subOption: EOrderSubTypeOptions,
) => {
    switch (option) {
        case EOrderTypeOptions.willCall:
            return generateWillCallHeaders();
        case EOrderTypeOptions.express:
            return generateExpressHeaders();
        case EOrderTypeOptions.stockOrder:
            return generateStockOrderHeaders();
        case EOrderTypeOptions.rgaOrder:
            return generateRGAOrderHeaders();
        case EOrderTypeOptions.transferOut:
            return generateTransferOutHeaders();
    }
}

export const generateMonitoringRows = (
    option: EOrderTypeOptions,
    subOption: EOrderSubTypeOptions,
    monitoringArray: IMonitoring[],
) => {
    switch (option) {
        case EOrderTypeOptions.willCall:
            return generateWillCallRows(monitoringArray);
        case EOrderTypeOptions.express:
            return generateWillCallRows(monitoringArray);
        case EOrderTypeOptions.stockOrder:
            return generateStockOrderRows(monitoringArray);
        case EOrderTypeOptions.rgaOrder:
            return generateRGAOrderRows(monitoringArray);
        case EOrderTypeOptions.transferOut:
            return generateTransferOutRows(monitoringArray);
    }
}
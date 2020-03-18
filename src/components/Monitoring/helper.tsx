import React from 'react';
import { EOrderTypeOptions, EOrderSubTypeOptions } from '../../store/order-type/types';
import { IMonitoring } from '../../store/monitoring/types';
import {RegularTypography} from '../Shared/Typography'

const generateWillCallHeaders = (): any[] => {
    return [
        { id: 'orderNumber', numeric: false, disablePadding: true, label: 'Order' },
        { id: 'batchNumber', numeric: false, disablePadding: true, label: 'Batch Number' },
        { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer Name' },
        { id: 'shipToCity', numeric: false, disablePadding: true, label: 'City' },
        { id: 'shipToState', numeric: false, disablePadding: true, label: 'State' },
        { id: 'orderDate', numeric: false, disablePadding: true, label: 'Order Dt' },
        { id: 'releasedDate', numeric: false, disablePadding: true, label: 'Release Dt' },
        { id: 'dueDate', numeric: false, disablePadding: true, label: 'Due Dt' },
        { id: 'pieces', numeric: false, disablePadding: true, label: 'Pieces' },
        { id: 'stage', numeric: false, disablePadding: true, label: 'Stage' },
        { id: 'username', numeric: false, disablePadding: true, label: 'Employee' },
        { id: 'startDateTime', numeric: false, disablePadding: true, label: 'Start Date' },
        { id: 'endDateTime', numeric: false, disablePadding: true, label: 'End Date' },
        { id: 'hold', numeric: false, disablePadding: true, label: 'Hold'},
    ];
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

const generateStockOrderHeaders = (): any[] => {
    return [
        { id: 'orderNumber', numeric: false, disablePadding: true, label: 'Order' },
        { id: 'batchNumber', numeric: false, disablePadding: true, label: 'Batch Number' },
        { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer Name' },
        { id: 'shipToCity', numeric: false, disablePadding: true, label: 'City' },
        { id: 'shipToState', numeric: false, disablePadding: true, label: 'State' },
        { id: 'orderDate', numeric: false, disablePadding: true, label: 'Order Dt' },
        { id: 'dueDate', numeric: false, disablePadding: true, label: 'Due Dt' },
        { id: 'pieces', numeric: false, disablePadding: true, label: 'Pieces' },
        { id: 'stage', numeric: false, disablePadding: true, label: 'Stage' },
        { id: 'username', numeric: false, disablePadding: true, label: 'Employee' },
        { id: 'startDateTime', numeric: false, disablePadding: true, label: 'Start Date' },
        { id: 'endDateTime', numeric: false, disablePadding: true, label: 'End Date' },
        { id: 'hold', numeric: false, disablePadding: true, label: 'Hold' },
    ];
}


const generateExpressHeaders = (): any[] => {
    return [
        { id: 'orderNumber', numeric: false, disablePadding: true, label: 'Order' },
        { id: 'batchNumber', numeric: false, disablePadding: true, label: 'Batch Number' },
        { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer Name' },
        { id: 'shipToCity', numeric: false, disablePadding: true, label: 'City' },
        { id: 'shipToState', numeric: false, disablePadding: true, label: 'State' },
        { id: 'orderDate', numeric: false, disablePadding: true, label: 'Order Dt' },
        { id: 'releasedDate', numeric: false, disablePadding: true, label: 'Release Dt' },
        { id: 'dueDate', numeric: false, disablePadding: true, label: 'Due Dt' },
        { id: 'pieces', numeric: false, disablePadding: true, label: 'Pieces' },
        { id: 'stage', numeric: false, disablePadding: true, label: 'Stage' },
        { id: 'username', numeric: false, disablePadding: true, label: 'Employee' },
        { id: 'startDateTime', numeric: false, disablePadding: true, label: 'Start Date' },
        { id: 'endDateTime', numeric: false, disablePadding: true, label: 'End Date' },
        { id: 'hold', numeric: false, disablePadding: true, label: 'Hold' },
    ];
}

const generateStockOrderRows = (arr: IMonitoring[]): any[] => {
    return arr.map(m => ({
        orderNumber: m.orderNumber,
        batchNumber: m.batchNumber,
        customerName: m.customerName,
        shipToCity: m.shipToCity,
        shipToState: m.shipToState,
        orderDate: m.orderDate,
        dueDate: m.dueDate,
        pieces: m.pieces,
        stage: 'Picked / Completed',
        username: m.username,
        startDateTime: m.startDateTime,
        endDateTime: m.endDateTime,
        hold: '?',
    }));
}

const generateRGAOrderRows = (arr: IMonitoring[]): any[] => {
    return arr.map(m => ({
        returnNumber: m.returnNumber,
        type: 'G',
        masterBatchId: m.masterBatchId,
        customerNumber: m.customerNumber,
        shipToCity: m.shipToCity,
        createdDate: m.createdDate,
        receivedDate: m.receivedDate,
        pieces: m.pieces,
        inspectionWorker: m.inspectionWorker,
        shelvingWorker: m.shelvingWorker,
        dockNumber: m.dockNumber,
        rgaStatus: m.rgaStatus,
        
    }));
}

const generateTransferOutRows = (arr: IMonitoring[]): any[] => {
    return arr.map((m:IMonitoring) => ({
        trNumber: m.trNumber,
        transferType: m.transferType,
        createdDate: m.createdDate,
        toLocationCode: m.toLocationCode,
        shipperId: m.shipperId,
        pieces: m.pieces,
        releasedDate: m.releasedDate,
        stage: 'Picked / Completed',
        employee: `${m.firstName} ${m.lastName}`,
        startDate: m.startDate,
        endDate: m.endDate,
        hold: '?',
    }));
}

const generateWillCallRows = (arr: IMonitoring[]): any[] => {
    return arr.map((m:IMonitoring) => ({
        orderNumber: (<RegularTypography>{m.orderNumber}</RegularTypography>),
        batchNumber: (<RegularTypography>{m.batchNumber}</RegularTypography>),
        customerName: (<RegularTypography>{m.customerName}</RegularTypography>),
        shipToCity: (<RegularTypography>{m.shipToCity}</RegularTypography>),
        shipToState: (<RegularTypography>{m.shipToState}</RegularTypography>),
        orderDate: (<RegularTypography>{m.orderDate}</RegularTypography>),
        releasedDate: (<RegularTypography>{m.releasedDate}</RegularTypography>),
        dueDate: (<RegularTypography>{m.dueDate}</RegularTypography>),
        pieces: (<RegularTypography>{m.pieces}</RegularTypography>),
        stage: (<RegularTypography>{'?'}</RegularTypography>),
        username: (<RegularTypography>{m.username}</RegularTypography>),
        startDateTime: (<RegularTypography>{m.startDateTime}</RegularTypography>),
        endDateTime: (<RegularTypography>{m.endDateTime}</RegularTypography>),
        hold: (<RegularTypography>{'?'}</RegularTypography>),
    }));
}

export const generateMonitoringHeaders = (
    option: EOrderTypeOptions,
    subOption: EOrderSubTypeOptions,
) => {
    switch (option) {
        case EOrderTypeOptions.willCall:
            return generateWillCallHeaders();
        case EOrderTypeOptions.express:
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
        case EOrderTypeOptions.stockOrder:
            return generateStockOrderRows(monitoringArray);
        case EOrderTypeOptions.rgaOrder:
            return generateRGAOrderRows(monitoringArray);
        case EOrderTypeOptions.transferOut:
            return generateTransferOutRows(monitoringArray);
    }
}
import { EOrderTypeOptions, EOrderSubTypeOptions } from '../../store/order-type/types';
import { IMonitoring } from '../../store/monitoring/types';

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

const generateWillCallRows = (arr: IMonitoring[]): any[] => {
    return arr.map((m:IMonitoring) => ({
        orderNumber: m.orderNumber,
        batchNumber: m.batchNumber,
        customerName: m.customerName,
        shipToCity: m.shipToCity,
        shipToState: m.shipToState,
        orderDate: m.orderDate,
        releasedDate: m.releasedDate,
        dueDate: m.dueDate,
        pieces: m.pieces,
        stage: '?',
        username: m.username,
        startDateTime: m.startDateTime,
        endDateTime: m.endDateTime,
        hold: '?',
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
        case EOrderTypeOptions.rgaOrder:
        case EOrderTypeOptions.transferOut:
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
        case EOrderTypeOptions.rgaOrder:
        case EOrderTypeOptions.transferOut:
    }
}
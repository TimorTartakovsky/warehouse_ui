import { EOrderTypeOptions, EOrderSubTypeOptions, OrderTypeMaskObject, ORDER_MASKS } from "../../store/order-type/types";
import { PRIMARY_COLUMN_MAP } from "../../store/monitoring/types";

export const getPrimaryColumn = (option: EOrderTypeOptions, subOption: EOrderSubTypeOptions)
: string => {
    switch (option) {
        case EOrderTypeOptions.willCall:
            return PRIMARY_COLUMN_MAP[EOrderTypeOptions.willCall][EOrderSubTypeOptions.willCall];
        case EOrderTypeOptions.express:
            switch (subOption) {
                case EOrderSubTypeOptions.ups:
                    return PRIMARY_COLUMN_MAP[EOrderTypeOptions.express][EOrderSubTypeOptions.ups];
                case EOrderSubTypeOptions.onTrac:
                    return PRIMARY_COLUMN_MAP[EOrderTypeOptions.express][EOrderSubTypeOptions.onTrac];
                case EOrderSubTypeOptions.fedx:
                    return PRIMARY_COLUMN_MAP[EOrderTypeOptions.express][EOrderSubTypeOptions.fedx];
            }
            return PRIMARY_COLUMN_MAP[EOrderTypeOptions.express][EOrderSubTypeOptions.ups];
        case EOrderTypeOptions.stockOrder:
            return PRIMARY_COLUMN_MAP[EOrderTypeOptions.stockOrder][EOrderSubTypeOptions.stockOrder];
        case EOrderTypeOptions.rgaOrder:
            return PRIMARY_COLUMN_MAP[EOrderTypeOptions.rgaOrder][EOrderSubTypeOptions.returns];
        case EOrderTypeOptions.transferOut:
            return PRIMARY_COLUMN_MAP[EOrderTypeOptions.transferOut][EOrderTypeOptions.transferOut];
        default:  return PRIMARY_COLUMN_MAP[EOrderTypeOptions.willCall][EOrderSubTypeOptions.willCall];
    }
}

export const getMonitoringMask = (option: EOrderTypeOptions, subOption: EOrderSubTypeOptions)
: OrderTypeMaskObject | null => {
    switch (option) {
        case EOrderTypeOptions.willCall:
            return ORDER_MASKS[EOrderTypeOptions.willCall][EOrderSubTypeOptions.willCall];
        case EOrderTypeOptions.express:
            switch (subOption) {
                case EOrderSubTypeOptions.ups:
                    return ORDER_MASKS[EOrderTypeOptions.express][EOrderSubTypeOptions.ups];
                case EOrderSubTypeOptions.onTrac:
                    return ORDER_MASKS[EOrderTypeOptions.express][EOrderSubTypeOptions.onTrac];
                case EOrderSubTypeOptions.fedx:
                    return ORDER_MASKS[EOrderTypeOptions.express][EOrderSubTypeOptions.fedx];
            }
            return ORDER_MASKS[EOrderTypeOptions.express][EOrderSubTypeOptions.ups];
        case EOrderTypeOptions.stockOrder:
            return ORDER_MASKS[EOrderTypeOptions.stockOrder][EOrderSubTypeOptions.stockOrder];
        case EOrderTypeOptions.rgaOrder:
            return ORDER_MASKS[EOrderTypeOptions.rgaOrder][EOrderSubTypeOptions.returns];
        case EOrderTypeOptions.transferOut:
            return null;
        default: return {
            type: 1,
            subtype: 0,
        }
    }
}
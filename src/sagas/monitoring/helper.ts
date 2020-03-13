import { EOrderTypeOptions, EOrderSubTypeOptions, OrderTypeMaskObject, ORDER_MASKS } from "../../store/order-type/types";


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
    return {
        type: 1,
        subtype: 0,
    }
}
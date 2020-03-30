import React from 'react';
import Monitoring from './Monitoring';
import { EOrderTypeOptions } from '../../store/order-type/types';

const MonitoringPage = (p: { type: EOrderTypeOptions }) => {
    console.log(p && p.type);
    return (
        <Monitoring
            { ...p}
        />
    )
}

export default MonitoringPage;
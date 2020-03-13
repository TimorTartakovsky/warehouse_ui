import React, { Dispatch } from 'react';
import PageTitle from '../Layout/PageTitle';
import { Card, CardContent } from '@material-ui/core';
import { IRootState } from '../../store';
import { IActionPayload, MONITORING_ACTIONS } from '../../actions';
import { connect } from 'react-redux';
import { EOrderTypeOptions, EOrderSubTypeOptions } from '../../store/order-type/types';
import { IMonitoring } from '../../store/monitoring/types';
import { MonitoringRequestProps } from '../../actions/monitoring.action';
import { generateMonitoringRows, generateMonitoringHeaders } from './helper';
import DynamicTable from '../DynamicTable';

export interface IMonitoringProps {
    type: EOrderTypeOptions;
    currentSubTab?: EOrderSubTypeOptions;
    monitoringArray?: IMonitoring[];
    isRequestFailed?: boolean;
    primaryColumn?: string;
    failRequestMessage?: string;
    locationId?: number;
    branchId?: number;
    monitoringRequestAction?: (props: MonitoringRequestProps) => void;
}

export interface IMonitoringState {
    currentTab?: EOrderTypeOptions;
}

class Monitoring extends React.Component<IMonitoringProps, IMonitoringState> {

    componentDidMount() {
        const {
            monitoringRequestAction,
            type = EOrderTypeOptions.willCall,
            currentSubTab = EOrderSubTypeOptions.willCall,
            locationId = 0,
            branchId = 0,
        } = this.props;
        monitoringRequestAction && monitoringRequestAction({
            locationId,
            branchId,
            currentTab: type,
            currentSubTab,
        })
    }

    public render(): React.ReactElement {
        const {
            type: currentTab = EOrderTypeOptions.willCall,
            currentSubTab = EOrderSubTypeOptions.willCall,
            monitoringArray,
            isRequestFailed,
            primaryColumn,
            failRequestMessage,
            locationId,
            branchId,
        } = this.props;
        const rows = generateMonitoringRows(currentTab, currentSubTab, monitoringArray || []);
        const headers = generateMonitoringHeaders(currentTab, currentSubTab);
        return (
            <>
                <PageTitle
                    titleHeading="Monitoring Table"
                    titleDescription=""
                    buttons={
                        [
                            {
                                key: '1',
                                label: EOrderTypeOptions.willCall,
                                link: '/monitoring/willCall',
                                iconName: 'icon',
                            },
                            {
                                key: '2',
                                label: EOrderTypeOptions.express,
                                link: '/monitoring/express',
                                iconName: 'icon',
                            },
                            {
                                key: '3',
                                label: EOrderTypeOptions.stockOrder,
                                link: '/monitoring/stockOrder',
                                iconName: 'icon',
                            },
                            {
                                key: '4',
                                label: EOrderTypeOptions.rgaOrder,
                                link: '/monitoring/rgaOrder',
                                iconName: 'icon',
                            },
                            {
                                key: '5',
                                label: EOrderTypeOptions.transferOut,
                                link: '/monitoring/transferOut',
                                iconName: 'icon',
                            },
                        ]
                    }
                />
                <Card className="card-box mb-4-spacing overflow-visible">
                    <CardContent className="p-3">
                        <DynamicTable
                            headerProperty={primaryColumn || ''}
                            headers={headers || []}
                            rows={rows || []}
                        />
                    </CardContent>
                </Card>
            </>
        )
    }
}

const mapStateToProps = (state: IRootState, props: IMonitoringProps) => {
    return {
        type: props.type || state.monitoring.currentTab,
        currentSubTab: state.monitoring.currentSubTab,
        primaryColumn: state.monitoring.primaryColumn,
        monitoringArray: state.monitoring.monitoringArray,
        isRequestFailed: state.monitoring.isRequestFailed,
        failRequestMessage: state.monitoring.failRequestMessage,
        locationId: state.user.locationId || 0,
        branchId: state.user.location && state.user.location.branchId || 0,
    }
  }
  
const mapDispatchToProps = (dispatch: Dispatch<IActionPayload>) => ({
    monitoringRequestAction: (props: MonitoringRequestProps): void => {
        dispatch(MONITORING_ACTIONS.monitoringRequestCombination(props));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Monitoring)
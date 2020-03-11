import React, { Dispatch } from 'react';
import PageTitle from '../Layout/PageTitle';
import { Card, CardContent } from '@material-ui/core';
import { IRootState } from '../../store';
import { IActionPayload, MONITORING_ACTIONS } from '../../actions';
import { connect } from 'react-redux';
import { stat } from 'fs';
import { EOrderTypeOptions, EOrderSubTypeOptions } from '../../store/order-type/types';
import { IMonitoring } from '../../store/monitoring/types';
import { MonitoringRequestProps } from '../../actions/monitoring.action';
import { generateMonitoringRows, generateMonitoringHeaders } from './helper';
import DynamicTable from '../DynamicTable';

export interface IMonitoringProps {
    currentTab?: EOrderTypeOptions;
    currentSubTab?: EOrderSubTypeOptions;
    monitoringArray?: IMonitoring[];
    isRequestFailed?: boolean;
    primaryColumn?: string;
    failRequestMessage?: string;
    locationId?: number;
    branchId?: number;
    monitoringRequestAction?: (props: MonitoringRequestProps) => void;
}

export interface IMonitoringState {}

class Monitoring extends React.Component<IMonitoringProps, IMonitoringState> {

    componentDidMount() {
        const {
            monitoringRequestAction,
            currentTab = EOrderTypeOptions.willCall,
            currentSubTab = EOrderSubTypeOptions.willCall,
            locationId = 0,
            branchId = 0,
        } = this.props;
        monitoringRequestAction && monitoringRequestAction({
            locationId,
            branchId,
            currentTab,
            currentSubTab,
        })
    }

    public render(): React.ReactElement {
        const {
            currentTab = EOrderTypeOptions.willCall,
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
                    titleDescription="The buttons listed are tools to manage monitoring."
                />
                <Card className="card-box mb-4-spacing overflow-visible">
                    <div className="card-header">
                        <div className="card-header--title font-size-md font-weight-bold py-2">
                        </div>
                    </div>
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

const mapStateToProps = (state: IRootState) => {
    return {
        currentTab: state.monitoring.currentTab,
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
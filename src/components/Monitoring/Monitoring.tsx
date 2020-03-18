import React, { Dispatch } from 'react';
import PageTitle from '../Layout/PageTitle';
import { Card, CardContent, Button } from '@material-ui/core';
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
    monitoringUpdateCurrentTabs?: (
        c: EOrderTypeOptions,
        cs: EOrderSubTypeOptions,
    ) => void
}

export interface IMonitoringState {
    currentTab?: EOrderTypeOptions;
}

export const SUBTYPE_BUTTONS = [
    EOrderSubTypeOptions.ups,
    EOrderSubTypeOptions.onTrac,
    EOrderSubTypeOptions.fedx,
]

class Monitoring extends React.Component<IMonitoringProps, IMonitoringState> {

    componentDidMount() {
        const {
            type = EOrderTypeOptions.willCall,
            currentSubTab = EOrderSubTypeOptions.willCall,
        } = this.props;
        this.changeTab(type, currentSubTab);
    }

    private changeTab = (
        currentTab: EOrderTypeOptions,
        currentSubTab: EOrderSubTypeOptions
    ): void => {
        const {
            monitoringRequestAction,
            monitoringUpdateCurrentTabs,
            locationId = 0,
            branchId = 0,
        } = this.props;
        monitoringRequestAction && monitoringRequestAction({
            locationId,
            branchId,
            currentTab,
            currentSubTab,
        });
        monitoringUpdateCurrentTabs && monitoringUpdateCurrentTabs(
            currentTab, currentSubTab,
        );
    }

    public render(): React.ReactElement {
        const {
            type: currentTab = EOrderTypeOptions.willCall,
            currentSubTab = EOrderSubTypeOptions.willCall,
            monitoringArray,
            primaryColumn,
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
                        <div className="pb-3 d-flex justify-content-left">
                            {
                                this.props.type === EOrderTypeOptions.express &&  SUBTYPE_BUTTONS.map(sub => (
                                    <Button
                                        key={sub}
                                        style={{ marginLeft: '5px' }}
                                        variant="contained"
                                        color={ sub === this.props.currentSubTab ? 'secondary' : 'default' }
                                        onClick={() => this.changeTab(this.props.type, sub)}
                                    >
                                        <span className="d-none d-xl-block">
                                            { sub }
                                        </span>
                                        <span className="btn-wrapper--icon d-block d-xl-none">
                                            { sub }
                                        </span>
                                    </Button>
                                )) || null
                            }
                        </div>
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
    monitoringUpdateCurrentTabs: (
        currentTab: EOrderTypeOptions,
        currentSubTab: EOrderSubTypeOptions
    ) => {
        dispatch(MONITORING_ACTIONS.monitoringUpdateCurrentTabs(currentTab, currentSubTab));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Monitoring)
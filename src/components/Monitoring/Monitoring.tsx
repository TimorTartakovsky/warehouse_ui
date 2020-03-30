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
// import DynamicTable from '../DynamicTable';
import DynamicExpansionPanelTable from '../DynamicExpansionPanelTable';

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
    rows?: any[];
};

export const SUBTYPE_BUTTONS = [
    EOrderSubTypeOptions.ups,
    EOrderSubTypeOptions.onTrac,
    EOrderSubTypeOptions.fedx,
]

class Monitoring extends React.Component<IMonitoringProps, IMonitoringState> {

    state = {
        rows: [],
    };

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

    private updateRows = (rows: any[]) => {
        this.setState({
            rows: rows,
        })
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
                    // customComponent={() => { console.log(``) }}
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
                        {
                            <DynamicExpansionPanelTable
                                headerProperty={primaryColumn || ''}
                                headers={headers || []}
                                rows={this.state.rows.length ? this.state.rows : rows}
                                setRows={this.updateRows}
                            />
                        }
                        {/* <Dialog scroll="body" maxWidth="lg" open={modal1} onClose={toggle1}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} lg={12}>
                                <div className="bg-white ">
                                    <Tabs
                                    value={value}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    onChange={handleChange}>
                                    <Tab className="py-3" label="Timeline" />
                                    </Tabs>
                                    <TabPanel value={value} index={0}>
                                    <Grid item md={12} lg={12}>
                                        Content
                                    </Grid>
                                    </TabPanel>
                                </div>
                                </Grid>
                            </Grid>
                            </Dialog> */}
                        {/* <DynamicTable
                            headerProperty={primaryColumn || ''}
                            headers={headers || []}
                            rows={rows || []}
                        /> */}
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
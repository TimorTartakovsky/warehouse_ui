import React, { Dispatch }  from 'react';
import { connect } from 'react-redux';
import { BOL_ACTIONS, IActionPayload } from '../../actions'
import { IRootState, TableItem } from '../../store';
import { IBOLMonitoring } from '../../store/bol/types';
import { BOLRequestProps } from '../../actions/bol.action';
import DynamicTable, { IHeaderCellType } from '../DynamicTable';
import { RegularTypography } from '../Shared/Typography';
import { CardContent, Box, Paper, Grid, TextField, FormControl, InputAdornment } from '@material-ui/core';
import { IconButtonGroup, EIconButtonGroupType } from '../Shared/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Info from '@material-ui/icons/Info';
import Print from '@material-ui/icons/Print';
import Create from '@material-ui/icons/Create';
import Email from '@material-ui/icons/Email';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
const moment = require('moment');


const DATE_TIME_FORMAT = 'DD/MM HH:mm';
const DATE_TIME_DB = 'YYYY-MM-DD HH:mm:ss';

export enum BOLMonitoringBtnType {
    detail = 'detail',
    printDocs = 'printDocs',
    recall = 'recall',
    resend = 'resend',
}

type MonitoringButtonsGroupState = {
    [BOLMonitoringBtnType.detail]: boolean,
    [BOLMonitoringBtnType.printDocs]: boolean,
    [BOLMonitoringBtnType.recall]: boolean,
    [BOLMonitoringBtnType.resend]: boolean,
}

const defaultMonitoringButtonsGroupState: MonitoringButtonsGroupState = {
    [BOLMonitoringBtnType.detail]: true,
    [BOLMonitoringBtnType.printDocs]: false,
    [BOLMonitoringBtnType.recall]: true,
    [BOLMonitoringBtnType.resend]: true,
}

export interface IBOLMonitoringProps {
    locationId?: number;
    branchId?: number;
    monitoring?: IBOLMonitoring[];
    monitoringTableHeaders?: IHeaderCellType[];
    fetchMonitoring?: (p: BOLRequestProps) => void;
}
export interface IBOLMonitoringState {
    searchField: string;
    monitoringArray: TableItem[] | any[];
    btnMonitoringGroupStatus: MonitoringButtonsGroupState;
}

export const BOLMonitoringStatus = ['', 'At Wrapping', 'Getting BOL', 'Docs Printed', 'Ship Ready', '', 'Shipped']

const monitoringHeaderCells: IHeaderCellType[] = [
    { id: 'bolNumber', numeric: false, disablePadding: true, label: 'BOL' },
    { id: 'orderNumbers', numeric: false, disablePadding: true, label: 'Order' },
    { id: 'proNumber', numeric: false, disablePadding: true, label: 'Pro Number' },
    { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer Name' },
    { id: 'carrier', numeric: false, disablePadding: true, label: 'Carrier' },
    { id: 'deliveryDays', numeric: false, disablePadding: true, label: 'D Days' },
    { id: 'freightCharges', numeric: false, disablePadding: true, label: 'Charge' },
    { id: 'freightTerms', numeric: false, disablePadding: true, label: 'Terms' },
    { id: 'boxes', numeric: false, disablePadding: true, label: 'Boxes' },
    { id: 'skids', numeric: false, disablePadding: true, label: 'Skids' },
    { id: 'revisedWeight', numeric: false, disablePadding: true, label: 'Weight' },
    { id: 'checkedDate', numeric: false, disablePadding: true, label: 'Ship Date' },
    { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
];

class BOLMonitoring extends React.Component<IBOLMonitoringProps, IBOLMonitoringState> {

    state ={
        searchField: '',
        monitoringArray: [],
        btnMonitoringGroupStatus: defaultMonitoringButtonsGroupState,
    }

    public componentDidMount() {
        const { locationId = 0, branchId = 0} = this.props;
        this.props.fetchMonitoring && this.props.fetchMonitoring({
            locationId,
            branchId, 
        });
    }

    public componentDidUpdate(prevProps: IBOLMonitoringProps, prevState: IBOLMonitoringState) {
        if (!prevProps || !prevProps.monitoring || !prevProps.monitoring.length) {
            return;
        }
        // IMPORTANT: PREVENT INFINITY UPDATE
        if (prevState.monitoringArray.length !== prevProps.monitoring.length) {
            const newMonitoring = this.doGenerateMonitoringRows();
            this.setState(prev => ({ ...prev, monitoringArray: newMonitoring }));
        }
    }
    
    public onMonitoringSelected = (m: any,  selected: string[], pk: string): void => {
        const bolMonitoringSource = this.props.monitoring ? this.props.monitoring
        .find(mon => mon.orderNumbers[0] === m.orderNumbers.source[0]) : null;
        if (bolMonitoringSource && this.props.locationId) {
            // this.props.onSelectedValue(
            //     bolMonitoringSource,
            //     selected,
            //     pk,
            //     this.props.locationId);
        } else {
            console.log(`Selected item wasn't defined.`)
        }
        
    }

    private doGenerateMonitoringRows = (): TableItem[] => {
        if (!Array.isArray(this.props.monitoring) || !this.props.monitoring.length) {
            return [];
        } else {
            return this.props.monitoring.map((monitoring: IBOLMonitoring) => ({
                id: monitoring.id,
                bolNumber: {
                    isSearchable: true,
                    source: monitoring.bolNumber,
                    value: <RegularTypography length="120px">{monitoring.bolNumber}</RegularTypography>
                },
                orderNumbers: {
                    isSearchable: true,
                    source: monitoring.orderNumbers,
                    value: <RegularTypography length="120px">{monitoring.orderNumbers}</RegularTypography>
                },
                proNumber: {
                    isSearchable: true,
                    source: monitoring.proNumber,
                    value: <RegularTypography length="120px">{monitoring.proNumber}</RegularTypography>
                },
                customerName: {
                    isSearchable: true,
                    source: monitoring.customerName,
                    value: <RegularTypography length="120px">{monitoring.customerName}</RegularTypography>
                },
                carrier: {
                    isSearchable: true,
                    source: monitoring.carrier,
                    value: <RegularTypography length="120px">{monitoring.carrier}</RegularTypography>
                },
                deliveryDays: {
                    isSearchable: true,
                    source: monitoring.deliveryDays,
                    value: (<RegularTypography length="100px">
                             {monitoring.deliveryDays  && moment(monitoring.deliveryDays, DATE_TIME_DB).format(DATE_TIME_FORMAT) || ''}
                         </RegularTypography>),
                },
                freightCharges: {
                    isSearchable: true,
                    source: monitoring.freightCharges,
                    value: <RegularTypography length="60px">{monitoring.freightCharges}</RegularTypography>
                },
                freightTerms: {
                    isSearchable: true,
                    source: monitoring.freightTerms,
                    value: <RegularTypography length="120px">{monitoring.freightTerms}</RegularTypography>
                },
                boxes: {
                    isSearchable: true,
                    source: monitoring.boxes,
                    value: <RegularTypography length="60px">{monitoring.boxes}</RegularTypography>
                },
                skids: {
                    isSearchable: true,
                    source: monitoring.skids,
                    value: <RegularTypography length="60px">{monitoring.skids}</RegularTypography>
                },
                revisedWeight: {
                    isSearchable: true,
                    source: monitoring.revisedWeight,
                    value: <RegularTypography length="60px">{monitoring.revisedWeight}</RegularTypography>
                },
                checkedDate: {
                    isSearchable: true,
                    source: monitoring.checkedDate,
                    value: (<RegularTypography length="100px">
                                {monitoring.checkedDate && moment(monitoring.checkedDate, DATE_TIME_DB).format(DATE_TIME_FORMAT) || ''}
                            </RegularTypography>)
                },
                bolStatus: {
                    source: monitoring.bolStatus,
                    value: <RegularTypography length="80px">{BOLMonitoringStatus[monitoring.bolStatus]}</RegularTypography>
                },
            }));
        }        
    }

    private tableColumnFilter = (v: string) => {
        if (!Array.isArray(this.props.monitoring) || !this.props.monitoring.length) {
          console.log(`NO ITEMS WERE FOUND.`);
        } else if (!v) {
          console.log(`FILTER WAS DISABLED.`);
          this.setState(prev => ({
            ...prev,
            searchField: v,
            monitoringArray: this.doGenerateMonitoringRows(),
          }));
        } else {
          console.log(`SEARCH STARTED.`);
          if (!this.state.monitoringArray.length) {
              return this.setState(prev => ({
                ...prev,
                searchField: v,
              }));
          } else {
              const keys = Object.keys(this.state.monitoringArray[0]);

              const compar = (k: string, r: any) => !!r[k] && r[k].isSearchable 
                && `${r[k].source || ''}`.toLowerCase().includes(v.toLowerCase());

              const newRows = this.state.monitoringArray
                .filter((r: TableItem) => {
                    const d = keys.filter(k => compar(k, r));
                    return d.length;
                });
              this.setState(prev => ({
                ...prev,
                searchField: v,
                monitoringArray: newRows,
              }));
          }
        }
    }

    public render(): React.ReactElement {

        return (
            <CardContent>
                 <div className="app-page-title">
                    <div>
                        <Box className="app-page-title--first">
                            <Paper
                                elevation={2}
                                className="app-page-title--iconbox d-70 d-flex align-items-center bg-secondary justify-content-center">
                                <ReceiptIcon />
                            </Paper>
                            <div className="app-page-title--heading">
                                <h5>BOL Monitoring</h5>
                            </div>
                        </Box>
                    </div>
                    <div className="d-flex align-items-center justify-content-right">
                        <Grid container spacing={0}>
                            <Grid item xs={3} md={3}>
                                <FormControl className="mt-3" variant="outlined">
                                    <TextField
                                        variant="outlined"
                                        value={this.state.searchField}
                                        fullWidth
                                        size="small"
                                        onChange={({target: { value }}) => this.tableColumnFilter(value)}
                                        InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <FontAwesomeIcon icon={['fas', 'search']} />
                                            </InputAdornment>
                                            ),
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={9} md={9}>
                            <IconButtonGroup 
                                id="BOL_monitoring_page_buttons"
                                type={EIconButtonGroupType.horizontal}
                                buttons={[
                                    {
                                        btnType: BOLMonitoringBtnType.detail,
                                        icon: (<Info />),
                                        text: 'Detail',
                                        isDisabled: this.state.btnMonitoringGroupStatus.detail,
                                        onButtonClicked: (e: any, btnType: string): void => {
                                            // handleMonitoringEvents(e, btnType);
                                        }
                                    },
                                    {
                                        btnType: BOLMonitoringBtnType.printDocs,
                                        icon: (<Print/>),
                                        text: 'Print Docs',
                                        isDisabled: this.state.btnMonitoringGroupStatus.printDocs,
                                        onButtonClicked: (e: any, btnType: string): void => {
                                            // handleMonitoringEvents(e, btnType);
                                        }
                                    },
                                    {
                                        btnType: BOLMonitoringBtnType.recall,
                                        icon: (<Create />),
                                        text: 'Recall',
                                        isDisabled: this.state.btnMonitoringGroupStatus.recall,
                                        onButtonClicked: (e: any, btnType: string): void => {
                                            // handleMonitoringEvents(e, btnType);
                                        }
                                    },
                                    {
                                        btnType: BOLMonitoringBtnType.resend,
                                        icon: (<Email />),
                                        text: 'Resend',
                                        isDisabled: this.state.btnMonitoringGroupStatus.resend,
                                        onButtonClicked: (e: any, btnType: string): void => {
                                            // handleMonitoringEvents(e, btnType);
                                        }
                                    }
                                ]}
                            />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <DynamicTable
                    onSelectedCallBack={this.onMonitoringSelected}
                    isMultiSelectable={false}
                    headerProperty={'id'}
                    headers={monitoringHeaderCells}
                    rows={this.state.monitoringArray}
                />
            </CardContent>
        )
    }
}

const mapStateToProps = (state: IRootState) => ({
    locationId: state.user.locationId || 0,
    branchId: state.user.location && state.user.location.branchId || 0,
    monitoring: state.bol.monitoring || [],
})

const mapDispatchToProps = (dispatch: Dispatch<IActionPayload>) => ({
    fetchMonitoring: (p: BOLRequestProps) => {
        dispatch(BOL_ACTIONS.bolMonitoringRequest(p));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BOLMonitoring);



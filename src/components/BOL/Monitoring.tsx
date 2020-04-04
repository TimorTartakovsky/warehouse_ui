import React, { Dispatch }  from 'react';
import { connect } from 'react-redux';
import { BOL_ACTIONS, IActionPayload } from '../../actions'
import { IRootState } from '../../store';
import { IBOLMonitoring } from '../../store/bol/types';
import { BOLRequestProps } from '../../actions/bol.action';
import DynamicTable, { IHeaderCellType } from '../DynamicTable';
import moment from 'moment';
import { RegularTypography } from '../Shared/Typography';
const DATE_TIME_FORMAT = 'DD/MM HH:mm';
const DATE_TIME_DB = 'YYYY-MM-DD HH:mm:ss';

export interface IBOLMonitoringProps {
    locationId?: number;
    branchId?: number;
    monitoring?: IBOLMonitoring[];
    monitoringTableHeaders?: IHeaderCellType[];
    fetchMonitoring?: (p: BOLRequestProps) => void;
    onSelectedValue: (m: IBOLMonitoring | null,  selected: string[], pk: string, l: number) => void;
}
export interface IBOLMonitoringState {}

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

    componentDidMount() {
        const { locationId = 0, branchId = 0} = this.props;
        this.props.fetchMonitoring && this.props.fetchMonitoring({
            locationId,
            branchId, 
        });
    }

    public onMonitoringSelected = (m: any,  selected: string[], pk: string): void => {
        const bolMonitoringSource = this.props.monitoring ? this.props.monitoring
        .find(mon => mon.orderNumbers[0] === m.orderNumbers.source[0]) : null;
        if (bolMonitoringSource && this.props.locationId) {
            this.props.onSelectedValue(
                bolMonitoringSource,
                selected,
                pk,
                this.props.locationId);
        } else {
            console.log(`Selected item wasn't defined.`)
        }
        
    }

    public render(): React.ReactElement {
        const parsedProcessingArray = (this.props.monitoring &&
        this.props.monitoring.length &&
        this.props.monitoring.map((monitoring: IBOLMonitoring) => ({
            id: monitoring.bolNumber,
            bolNumber: {
                source: monitoring.bolNumber,
                value: <RegularTypography length="120px">{monitoring.bolNumber}</RegularTypography>
            },
            orderNumbers: {
                source: monitoring.orderNumbers,
                value: <RegularTypography length="120px">{monitoring.orderNumbers}</RegularTypography>
            },
            proNumber: {
                source: monitoring.proNumber,
                value: <RegularTypography length="120px">{monitoring.proNumber}</RegularTypography>
            },
            customerName: {
                source: monitoring.customerName,
                value: <RegularTypography length="120px">{monitoring.customerName}</RegularTypography>
            },
            carrier: {
                source: monitoring.carrier,
                value: <RegularTypography length="120px">{monitoring.carrier}</RegularTypography>
            },
            deliveryDays: {
                source: monitoring.deliveryDays,
                value: (<RegularTypography length="100px">
                         {monitoring.deliveryDays  && moment(monitoring.deliveryDays, DATE_TIME_DB).format(DATE_TIME_FORMAT) || ''}
                     </RegularTypography>),
            },
            freightCharges: {
                source: monitoring.freightCharges,
                value: <RegularTypography length="60px">{monitoring.freightCharges}</RegularTypography>
            },
            freightTerms: {
                source: monitoring.freightTerms,
                value: <RegularTypography length="120px">{monitoring.freightTerms}</RegularTypography>
            },
            boxes: {
                source: monitoring.boxes,
                value: <RegularTypography length="60px">{monitoring.boxes}</RegularTypography>
            },
            skids: {
                source: monitoring.skids,
                value: <RegularTypography length="60px">{monitoring.skids}</RegularTypography>
            },
            revisedWeight: {
                source: monitoring.revisedWeight,
                value: <RegularTypography length="60px">{monitoring.revisedWeight}</RegularTypography>
            },
            checkedDate: {
                source: monitoring.checkedDate,
                value: (<RegularTypography length="100px">
                            {monitoring.checkedDate && moment(monitoring.checkedDate, DATE_TIME_DB).format(DATE_TIME_FORMAT) || ''}
                        </RegularTypography>)
            },
            bolStatus: {
                source: monitoring.bolStatus,
                value: <RegularTypography length="80px">{BOLMonitoringStatus[monitoring.bolStatus]}</RegularTypography>
            },
        }))) || []
        return (
            <DynamicTable
                onSelectedCallBack={this.onMonitoringSelected}
                isMultiSelectable={false}
                headerProperty={'id'}
                headers={monitoringHeaderCells}
                rows={parsedProcessingArray}
            />
        )
    }
}

const mapStateToProps = (state: IRootState) => ({
    locationId: state.user.locationId || 0,
    branchId: state.user.location && state.user.location.branchId || 0,
    monitoring: state.bol.monitoring || [],
    // monitoringTableHeaders: state.bol.monitoringTableHeaders || [],
})

const mapDispatchToProps = (dispatch: Dispatch<IActionPayload>) => ({
    fetchMonitoring: (p: BOLRequestProps) => {
        dispatch(BOL_ACTIONS.bolMonitoringRequest(p));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BOLMonitoring);



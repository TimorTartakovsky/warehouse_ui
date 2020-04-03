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
    onSelectedValue: (m: IBOLMonitoring,  selected: string[], pk: string) => void;
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

    public render(): React.ReactElement {
        const parsedProcessingArray = (this.props.monitoring &&
        this.props.monitoring.length &&
        this.props.monitoring.map((monitoring: IBOLMonitoring) => ({
            bolNumberIndex: monitoring.bolNumber,
            bolNumber: <RegularTypography length="120px">{monitoring.bolNumber}</RegularTypography>,
            orderNumbers: <RegularTypography length="120px">{monitoring.orderNumbers}</RegularTypography>, 
            proNumber: <RegularTypography length="120px">{monitoring.proNumber}</RegularTypography>,
            customerName: <RegularTypography length="120px">{monitoring.customerName}</RegularTypography>, 
            carrier: <RegularTypography length="120px">{monitoring.carrier}</RegularTypography>,
            deliveryDays: <RegularTypography length="100px">
                    {monitoring.deliveryDays  && moment(monitoring.deliveryDays, DATE_TIME_DB).format(DATE_TIME_FORMAT) || ''}
                </RegularTypography>, 
            freightCharges: <RegularTypography length="60px">{monitoring.freightCharges}</RegularTypography>,            
            freightTerms: <RegularTypography length="120px">{monitoring.freightTerms}</RegularTypography>, 
            boxes: <RegularTypography length="60px">{monitoring.boxes}</RegularTypography>, 
            skids: <RegularTypography length="60px">{monitoring.skids}</RegularTypography>, 
            revisedWeight: <RegularTypography length="60px">{monitoring.revisedWeight}</RegularTypography>,
            checkedDate: <RegularTypography length="100px">
                {monitoring.checkedDate && moment(monitoring.checkedDate, DATE_TIME_DB).format(DATE_TIME_FORMAT) || ''}
            </RegularTypography>, 
            bolStatus: <RegularTypography length="100px">{BOLMonitoringStatus[monitoring.bolStatus]}</RegularTypography>,
        }))) || []
        return (
            <DynamicTable
                onSelectedCallBack={this.props.onSelectedValue}
                isMultiSelectable={false}
                headerProperty={'bolNumberIndex'}
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



import React, { Dispatch }  from 'react';
import { connect } from 'react-redux';
import { BOL_ACTIONS, IActionPayload } from '../../actions'
import { IRootState } from '../../store';
import { IBOLMonitoring } from '../../store/bol/types';
import { BOLRequestProps } from '../../actions/bol.action';
import DynamicTable, { IHeaderCellType } from '../DynamicTable';

export interface IBOLMonitoringProps {
    locationId?: number;
    branchId?: number;
    monitoring?: IBOLMonitoring[];
    monitoringTableHeaders?: IHeaderCellType[];
    fetchMonitoring?: (p: BOLRequestProps) => void;
}
export interface IBOLMonitoringState {}

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
            bolNumber: monitoring.bolNumber,
            orderNumbers: monitoring.orderNumbers, 
            proNumber: monitoring.proNumber,
            customerName: monitoring.customerName, 
            carrier: monitoring.carrier,
            deliveryDays: monitoring.deliveryDays, 
            freightCharges: monitoring.freightCharges,            
            freightTerms: monitoring.freightTerms, 
            boxes: monitoring.boxes, 
            skids: monitoring.skids, 
            revisedWeight: monitoring.revisedWeight,
            checkedDate: monitoring.checkedDate, 
            bolStatus: monitoring.bolStatus, 
        }))) || []
        return (
            <DynamicTable
                headerProperty={'bolNumber'}
                headers={this.props.monitoringTableHeaders || []}
                rows={parsedProcessingArray}
            />
        )
    }
}

const mapStateToProps = (state: IRootState) => ({
    locationId: state.user.locationId || 0,
    branchId: state.user.location && state.user.location.branchId || 0,
    monitoring: state.bol.monitoring || [],
    monitoringTableHeaders: state.bol.monitoringTableHeaders || [],
})

const mapDispatchToProps = (dispatch: Dispatch<IActionPayload>) => ({
    fetchMonitoring: (p: BOLRequestProps) => {
        dispatch(BOL_ACTIONS.bolMonitoringRequest(p));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BOLMonitoring);



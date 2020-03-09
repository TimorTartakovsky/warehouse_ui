import React, { Dispatch }  from 'react';
import { connect } from 'react-redux';
import { BOL_ACTIONS, IActionPayload } from '../../actions'
import { IRootState } from '../../store';
import {
    TableBody,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    IconButton,
    Paper
  } from '@material-ui/core';
import { IBOLProcessing } from '../../store/bol/types';
import { BOLRequestProps } from '../../actions/bol.action';
import DynamicTable, { IHeaderCellType } from '../DynamicTable';

export interface IBOLProcessingProps {
    locationId?: number;
    branchId?: number;
    processing?: IBOLProcessing[];
    processingTableHeaders?: IHeaderCellType[];
    fetchProcessing?: (p: BOLRequestProps) => void;
}

export interface IBOLProcessingState {}

export interface IBOLProcessingCellData {
    orderNumber: string;
    deliveryNumber: string;
    pilot: string;
    proNumber: string;
    carrier: string;
    freightTerms: string;
    freightCharges: string;
    customerName: string;
    shipToCity: string;
    shipToState: string;
    boxes: number;
    skid: number;
    originalWeight: number;
}

class BOLProcessing extends React.Component<IBOLProcessingProps, IBOLProcessingState> {
    
    componentDidMount() {
        const { locationId = 0, branchId = 0} = this.props;
        this.props.fetchProcessing && this.props.fetchProcessing({
            locationId,
            branchId, 
        });
    }

    public render(): React.ReactElement {
        const parsedProcessingArray = (this.props.processing &&
        this.props.processing.length &&
        this.props.processing.map((process: IBOLProcessing) => ({
            orderNumber: process.orderNumber,
            deliveryNumber: process.deliveryNumber,
            pilot: process.pilot,
            proNumber: process.proNumber,
            carrier: process.carrier,
            freightTerms: process.freightTerms,
            freightCharges: process.freightCharges,
            customerName: process.customerName,
            shipToCity: process.shipToCity,
            shipToState: process.shipToState,
            boxes: process.boxes,
            skid: process.skid,
            originalWeight: process.originalWeight,
        }))) || []
        return (
            <DynamicTable
                headerProperty={'orderNumber'}
                headers={this.props.processingTableHeaders || []}
                rows={parsedProcessingArray}
            />
        )
    }
}

const mapStateToProps = (state: IRootState) => ({
    locationId: state.user.locationId || 0,
    branchId: state.user.location && state.user.location.branchId || 0,
    processing: state.bol.processing || [],
    processingTableHeaders: state.bol.processingTableHeaders || [],
})

const mapDispatchToProps = (dispatch: Dispatch<IActionPayload>) => ({
    fetchProcessing: (p: BOLRequestProps) => {
        dispatch(BOL_ACTIONS.bolProcessingRequest(p));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BOLProcessing);

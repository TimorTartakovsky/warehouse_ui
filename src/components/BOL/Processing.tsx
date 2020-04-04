import React, { Dispatch }  from 'react';
import { connect } from 'react-redux';
import { BOL_ACTIONS, IActionPayload } from '../../actions'
import { IRootState } from '../../store';
import { IBOLProcessing, ICarrier } from '../../store/bol/types';
import { BOLRequestProps } from '../../actions/bol.action';
import DynamicTable, { IHeaderCellType } from '../DynamicTable';
import { RegularTypography } from '../Shared/Typography';
import { TextField, MenuItem } from '@material-ui/core';

export interface IBOLProcessingProps {
    locationId?: number;
    branchId?: number;
    processing?: IBOLProcessing[] | null;
    processingTableHeaders?: IHeaderCellType[];
    fetchProcessing?: (p: BOLRequestProps) => void;
    onSelected?: (m: any,  selected: string[], pk: string) => void;
}

export interface IBOLProcessingState {
    selectedCarriesMap: Map<string, ICarrier>
}

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
    
    state = {
        selectedCarriesMap: new Map(),
    }

    componentDidMount() {
        const { locationId = 0, branchId = 0} = this.props;
        this.props.fetchProcessing && this.props.fetchProcessing({
            locationId,
            branchId, 
        });
    }

    private onProcessSelected = (m: any,  selected: string[], pk: string) => {
        this.props.onSelected && this.props.onSelected(m, selected, pk);
    }

    private onClickProNumber = (p: IBOLProcessing) => {
        if (!p.brokerApi) {
            // call 
        }
    }

    public render(): React.ReactElement {
        const parsedProcessingArray = (this.props.processing &&
        this.props.processing.length &&
        this.props.processing.map((process: IBOLProcessing) => {
            const handleProcessCarrierChange = (e: any) => {
                e.stopPropagation();
                const carrierNumber = e.target.value;
                const selectedCarriersMap = this.state.selectedCarriesMap;
                const selectedCarrier = process.carriers.find(c => c.carrierNumber === carrierNumber);
                selectedCarriersMap.set(process.id, selectedCarrier);
                this.setState(prev => ({
                    ...prev,
                    selectedCarriesMap: selectedCarriersMap,
                }));
            }
            const cs = this.state.selectedCarriesMap.get(process.id);
            const defCs = process.carriers && process.carriers[0] && process.carriers[0].carrierNumber;
            return {
                id: process.id,
                orderNumber: {
                    source: process.orderNumber,
                    value: <RegularTypography length="120px">{process.orderNumber}</RegularTypography>
                },
                deliveryNumber: {
                    source: process.deliveryNumber,
                    value: <RegularTypography length="120px">{process.deliveryNumber}</RegularTypography>
                },
                pilot: {
                    source: process.pilot,
                    value: <RegularTypography length="60px">{process.pilot}</RegularTypography>
                },
                proNumber: {
                    source: process.proNumber,
                    value:  (<TextField
                                placeholder={process.proNumber}
                                onClick={() => this.onClickProNumber(process)}
                                fullWidth
                                disabled={process.brokerApi === 1}
                                className="m-2"
                                id="outlined-basic"
                                variant="outlined"
                            />)
                },
                carrier: {
                    source: process.carrier,
                    value: (
                        <TextField fullWidth className="m-2"
                            id="outlined-select-currency"
                            style={{ width: '120px' }}
                            select
                            // label="Select Carrier"
                            value={cs && cs.carrierNumber || defCs || ''}
                            defaultValue={process.carrier}
                            onChange={handleProcessCarrierChange}
                            disabled={!process.carriers || !process.carriers.length}
                            variant="outlined"
                        >
                        {process.carriers.map(option => (
                            <MenuItem key={option.carrierNumber} value={option.carrierNumber}>
                                {option.carrierName}
                            </MenuItem>
                        ))}
                    </TextField>
                    )
                },
                freightTerms: {
                    source: process.freightTerms,
                    value: <RegularTypography length="120px">{process.freightTerms}</RegularTypography>
                },
                freightCharges: {
                    source: process.freightCharges,
                    value: <RegularTypography length="60px">{process.freightCharges}</RegularTypography>
                },
                customerName: {
                    source: process.customerName,
                    value: <RegularTypography length="120px">{process.customerName}</RegularTypography>
                },
                shipToCity: {
                    source: process.shipToCity,
                    value: <RegularTypography length="120px">{process.shipToCity}</RegularTypography>
                },
                shipToState: {
                    source: process.shipToState,
                    value: <RegularTypography length="60px">{process.shipToState}</RegularTypography>
                },
                boxes: {
                    source: process.boxes,
                    value: <RegularTypography length="60px">{process.boxes}</RegularTypography>
                },
                skid: {
                    source: process.skid,
                    value: <RegularTypography length="60px">{process.skid}</RegularTypography>
                },
                originalWeight: {
                    source: process.originalWeight,
                    value: <RegularTypography length="60px">{process.originalWeight}</RegularTypography>
                },
                actions: {
                    source: '***',
                    value: <RegularTypography length="60px">{'***'}</RegularTypography>
                },
            }
        })) || []
        return (
            <DynamicTable
                headerProperty={'id'}
                isMultiSelectable
                onSelectedCallBack={this.onProcessSelected}
                headers={this.props.processingTableHeaders || []}
                rows={parsedProcessingArray}
            />
        )
    }
}

const mapStateToProps = (state: IRootState) => ({
    locationId: state.user.locationId,
    branchId: state.user.location && state.user.location.branchId || 0,
    processing: state.bol.processing,
    processingTableHeaders: state.bol.processingTableHeaders,
})

const mapDispatchToProps = (dispatch: Dispatch<IActionPayload>) => ({
    fetchProcessing: (p: BOLRequestProps) => {
        dispatch(BOL_ACTIONS.bolProcessingRequest(p));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BOLProcessing);

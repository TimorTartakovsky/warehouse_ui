import React, { Dispatch }  from 'react';
import { connect } from 'react-redux';
import { BOL_ACTIONS, IActionPayload } from '../../actions'
import { IRootState } from '../../store';
import { IBOLProcessing, ICarrier } from '../../store/bol/types';
import { BOLRequestProps, UpdateProcessProps, ConflictAddressType } from '../../actions/bol.action';
import DynamicTable, { IHeaderCellType } from '../DynamicTable';
import { RegularTypography } from '../Shared/Typography';
import {
    TextField, MenuItem, Dialog, Grid, Button, DialogTitle, DialogContent, 
    List, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, ListItem,
    Checkbox, Paper, FormControl, InputLabel, Select, DialogActions,
} from '@material-ui/core';
import { CommentRounded} from '@material-ui/icons';
import { whichDocPrefix } from '../helper';

export interface IBOLProcessingProps {
    locationId?: number;
    branchId?: number;
    processing?: IBOLProcessing[] | null;
    conflictAddress?: ConflictAddressType[] | null;
    processingTableHeaders?: IHeaderCellType[];
    fetchProcessing?: (p: BOLRequestProps) => void;
    fetchConflictingAddress?: (p: number[]) => void;
    onSelected?: (m: UpdateProcessProps) => void;
}

export interface IBOLProcessingState {
    selectedCarriesMap: Map<number, ICarrier>;
    selectedProcesses: Map<string, IBOLProcessing>;
    selectedTermsMap: Map<string, number>;
    selectedAddressMap: Map<number, number>;
    selectedAddress: ConflictAddressType;
    selectedTermConflict: string;
    isOpenDialogAddressConflict: boolean;
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
        selectedCarriesMap: new Map<number, ICarrier>(),
        selectedProcesses: new Map<string, IBOLProcessing>(),
        selectedTermsMap: new Map<string, number>(),
        selectedAddressMap: new Map<number, number>(),
        selectedTermConflict: '',
        selectedAddress: {
            shipToAddress1: '',
        },
        isOpenDialogAddressConflict: false,
    }

    componentDidMount() {
        const { locationId = 0, branchId = 0} = this.props;
        this.props.fetchProcessing && this.props.fetchProcessing({
            locationId,
            branchId, 
        });
    }

    private onProcessSelected = (m: any,  selected: string[], pk: string) => {
        if (!Array.isArray(this.props.processing)) {
            return;
        } else {
            const sourceProcessing = this.props.processing.find(p => p.id === m[pk]);
            const selectedProcesses = this.state.selectedProcesses;
            const termsMap = this.state.selectedTermsMap;
            const addressMap = this.state.selectedAddressMap;
            if (!sourceProcessing) {
                return;
            }

            let termsCount = termsMap.get(sourceProcessing.freightTerms) || 0;
            let addressCount = addressMap.get(sourceProcessing.shipToAddressId) || 0;
            if (!!selectedProcesses.get(m.id)) {
                console.log(`Unchecked item....`);
                selectedProcesses.delete(m.id);
                // reset terms
                (termsCount === 1) ? termsMap.delete(sourceProcessing.freightTerms) :
                termsMap.set(sourceProcessing.freightTerms, (termsCount - 1));
                
                // reset address
                (addressCount === 1) ? addressMap.delete(sourceProcessing.shipToAddressId) :
                addressMap.set(sourceProcessing.shipToAddressId, (addressCount - 1));
                this.setState(prev => ({
                    ...prev,
                    selectedProcesses,
                    selectedTermsMap: termsMap,
                    selectedAddressMap: addressMap,
                }));
            } else {
                const termsIncremented  = termsCount + 1;
                const addressIncremented  = addressCount + 1;
                termsMap.set(sourceProcessing.freightTerms, termsIncremented);
                addressMap.set(sourceProcessing.shipToAddressId, addressIncremented);
                selectedProcesses.set(m.id, sourceProcessing);
                // temp
                if ((termsMap.size > 1 || addressMap.size > 1)) {
                    const ids = [...addressMap.keys()];
                    this.props.fetchConflictingAddress && this.props.fetchConflictingAddress(ids);
                    this.setState(prev => ({
                        ...prev,
                        selectedProcesses,
                        selectedTermsMap: termsMap,
                        selectedAddressMap: addressMap,
                        isOpenDialogAddressConflict: true,
                    }));
                } else {
                    this.setState(prev => ({
                        ...prev,
                        selectedProcesses,
                        selectedTermsMap: termsMap,
                        selectedAddressMap: addressMap,
                    }));
                }
            }
            this.props.onSelected && this.props.onSelected(m);
        }
    }

    private onSelectTermConflict = (p: string): void => {
        this.setState(prev => ({
            ...prev,
            selectedTermConflict: p,
        }))
    }

    private onClickProNumber = (p: IBOLProcessing) => {
        if (!p.brokerApi) {
            // call 
        }
    }

    private triggerDialog = (isOpenDialog: boolean): void => {
        this.setState(prev => ({
            ...prev,
            isOpenDialogAddressConflict: isOpenDialog,
        }));
    }

    private onSkidClick = (p: IBOLProcessing) => {

    }

    private onSelectedAddressToProcess = (p: ConflictAddressType) => {
        this.setState(prev => ({
            ...prev,
            selectedAddress: p,
        }))
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
                if (selectedCarrier) {
                    selectedCarriersMap.set(process.id, selectedCarrier);
                }
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
                                style={{ width: '60px' }}
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
                        process.brokerApi ? (
                            <RegularTypography length="120px">Auto-select</RegularTypography>
                        ) : (
                            <TextField fullWidth className="m-2"
                                id="outlined-select-currency"
                                style={{ width: '120px' }}
                                select
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
                    value: <RegularTypography onClick={() => this.onSkidClick(process)} length="60px">{process.skid}</RegularTypography>
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
            <>
                <DynamicTable
                headerProperty={'id'}
                isMultiSelectable
                onSelectedCallBack={this.onProcessSelected}
                headers={this.props.processingTableHeaders || []}
                rows={parsedProcessingArray}
            />
            {
                (this.state.isOpenDialogAddressConflict && this.props.conflictAddress) ? (
                    <Dialog scroll="body" maxWidth="lg" open={this.state.isOpenDialogAddressConflict} onClose={() => this.triggerDialog(false)}>
                        <DialogTitle id="join-process-title">Combine BOL's Conflict</DialogTitle>
                        <DialogContent>
                            <Paper elevation={3} >
                                <List style={{
                                        width: '600px',
                                        maxWidth: '100%',
                                }}>
                                    {this.props.conflictAddress && this.props.conflictAddress.map((value) => {
                                        const labelId = `checkbox-list-label-${value.id}`;
                                        const isSelected = this.state.selectedAddress.shipToAddress1 === value.shipToAddress1;
                                    
                                        return (
                                        <ListItem 
                                            key={value.id}
                                            role={undefined}
                                            dense
                                            button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                this.onSelectedAddressToProcess(value)
                                            }}
                                        >
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={isSelected}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={value.shipToAddress1} />
                                            <ListItemText id={labelId} primary={value.shipToCity} />
                                            <ListItemText id={labelId} primary={value.shipToState} />
                                            <ListItemText id={labelId} primary={value.shipToCountry} />
                                            <ListItemText id={labelId} primary={value.shipToZip} />
                                        </ListItem>
                                        );
                                    })}
                                </List>
                            </Paper>
                        </DialogContent>
                        <DialogActions>
                            <FormControl variant="outlined" style={{
                                minWidth: '250px',
                                margin: '1%'
                            }}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Set combined freight Terms*
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    // value={age}
                                    label="Set combined freight Terms*"
                                >
                                    {
                                        [
                                            'Prepay & Charge (Charge Buyer)',
                                            'Prepaid (Genera Pay)',
                                            'Collect (Buyer Arrange and Pay)',
                                        ].map((k: string, i: number) => (
                                            <MenuItem
                                                key={i}
                                                value={k}
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    this.onSelectTermConflict(k);
                                                }}
                                            >
                                                {k}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <Button color="primary">
                                SELECT
                            </Button>
                            <Button
                                onClick={e => {
                                    e.stopPropagation();
                                    this.setState(prev => ({
                                        ...prev,
                                        isOpenDialogAddressConflict: false,
                                    }))
                                }}
                                color="default">
                                CANCEL
                            </Button>
                            <Button color="default">
                                OTHER LOCATION
                            </Button>
                        </DialogActions>
                    </Dialog>
                ) : null
            }
            </>
        )
    }
}

const mapStateToProps = (state: IRootState) => ({
    locationId: state.user.locationId,
    branchId: state.user.location && state.user.location.branchId || 0,
    processing: state.bol.processing,
    conflictAddress: state.bol.conflictAddress,
    processingTableHeaders: state.bol.processingTableHeaders,
})

const mapDispatchToProps = (dispatch: Dispatch<IActionPayload>) => ({
    fetchProcessing: (p: BOLRequestProps) => {
        dispatch(BOL_ACTIONS.bolProcessingRequest(p));
    },
    fetchConflictingAddress: (p: number[]) => {
        dispatch(BOL_ACTIONS.bolProcessingConflictingAddressRequest(p));
    },
    updateProcessingRequest: (p: UpdateProcessProps) => {
        dispatch(BOL_ACTIONS.bolProcessingUpdateRequest(p));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BOLProcessing);

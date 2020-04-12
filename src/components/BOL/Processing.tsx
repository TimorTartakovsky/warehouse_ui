import React, { Dispatch }  from 'react';
import { connect } from 'react-redux';
import { BOL_ACTIONS, IActionPayload } from '../../actions'
import { IRootState } from '../../store';
import { IBOLProcessing, ICarrier } from '../../store/bol/types';
import {
    BOLRequestProps, UpdateProcessProps, ConflictAddressType, UpdateAddress,
    ProcessingGetInfo, ProcessingInfo,
} from '../../actions/bol.action';
import DynamicTable, { IHeaderCellType } from '../DynamicTable';
import { RegularTypography } from '../Shared/Typography';
import {
    TextField, MenuItem, Dialog, Grid, Button, DialogTitle, DialogContent, 
    List, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, ListItem,
    Checkbox, Paper, FormControl, InputLabel, Select, DialogActions, Card, FormLabel, RadioGroup,
    FormControlLabel, Radio, FormGroup, Typography, Fab
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import * as _ from 'lodash';

export interface IBOLProcessingProps {
    locationId?: number;
    branchId?: number;
    processing?: IBOLProcessing[] | null;
    processInfo?: ProcessingInfo | null;
    conflictAddress?: ConflictAddressType[] | null;
    processingTableHeaders?: IHeaderCellType[];
    updateAddressRequest?: (p: UpdateAddress) => void;
    fetchProcessing?: (p: BOLRequestProps) => void;
    fetchProcessInfo?: (p: ProcessingGetInfo) => void;
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
    selectedSkipProcess: Partial<IBOLProcessing>;
    isOpenDialogAddressConflict: boolean;
    isOpenDialogSkid: boolean;
    isOpenDialogAdditional: boolean;
    selectedProcessAdditional: Partial<IBOLProcessing>;
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
            shipToCountry: '',
            shipToCustomerId: '',
            shipToCustomerName: '',
            shipToCustomerNumber: '',
            shipToAddressId: '',
        },
        selectedSkipProcess: {
            customerName: '',
            proNumber: '',
            orderNumber: '',
            deliveryNumber: '',
            skid: 0,
            boxes: 0,
            revisedWeight: '',
            orderDate: new Date(),
            releasedDate: new Date(),
            dueDate: new Date(),
            freightTerms: '',
            carrier: '',
        },
        selectedProcessAdditional: {
            billToCustomerName: '',
        },
        isOpenDialogAddressConflict: false,
        isOpenDialogSkid: false,
        isOpenDialogAdditional: false,
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

    private doUpdateAddress = () => {
        const bolIds = [...this.state.selectedProcesses.keys()];
        this.props.updateAddressRequest && this.props.updateAddressRequest({
            bolIds,
            locationId: this.props.locationId || 0,
            shipToCountry: this.state.selectedAddress.shipToCountry,
            newAddressBolId: '',
            updateParams: {
                shipToAddressId: this.state.selectedAddress.shipToAddressId,
                shipToCustomerName: this.state.selectedAddress.shipToCustomerName,
                shipToCustomerNumber: this.state.selectedAddress.shipToCustomerNumber,
                shipToCustomerId: this.state.selectedAddress.shipToCustomerId,
                freightTerms: this.state.selectedTermConflict,
            }
        });
        this.setState(prev => ({
            ...prev,
            isOpenDialogAddressConflict: false,
        }));
    }

    private onSkidClick = (p: IBOLProcessing): void => {
        this.setState(prev => ({
            ...prev,
            selectedSkipProcess: p,
            isOpenDialogSkid: true,
        }))
    }

    private onSelectedAddressToProcess = (p: ConflictAddressType): void => {
        this.setState(prev => ({
            ...prev,
            selectedAddress: p,
        }))
    }

    private onAdditionalClicked = (p: IBOLProcessing): void => {
        console.log(p);
        this.props.fetchProcessInfo && this.props.fetchProcessInfo({
            billToAddressId: p.billToAddressId,
            bolId: p.id,
            bolIds: [p.id],
            shipToAddressId: p.shipToAddressId,
        });
        this.setState(prev => ({
            ...prev,
            selectedProcessAdditional: p,
            isOpenDialogAdditional: true,
        }));
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
                    value: (process.freightTerms === 'Prepaid (Genera Pay)' ?(
                    <RegularTypography length="100px">

                    </RegularTypography>
                    ) : (
                        <TextField
                            style={{ width: '100px' }}
                            onClick={() => this.onClickProNumber(process)}
                            fullWidth
                            type="number"
                            className="m-2"
                            id="outlined-basic"
                            variant="outlined"
                        />
                    ) )
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
                    value: <RegularTypography onClick={() => {
                        this.onSkidClick(process);
                    }} length="60px">{process.skid}</RegularTypography>
                },
                originalWeight: {
                    source: process.originalWeight,
                    value: <RegularTypography length="60px">{process.originalWeight}</RegularTypography>
                },
                actions: {
                    source: '***',
                    value:  (<Fab
                                size="small"
                                color="secondary"
                                aria-label="additional"
                                onClick={e => {
                                    e.stopPropagation();
                                    this.onAdditionalClicked(process);
                                }}
                            >
                                <Menu />
                            </Fab>)
                },
            }
        })) || []

        const processingHeaderCells: IHeaderCellType[] = [
            { id: 'orderNumber', numeric: false, disablePadding: true, label: 'Order', isFilter: true },
            { id: 'deliveryNumber', numeric: false, disablePadding: true, label: 'Delivery', isFilter: true },
            { id: 'pilot', numeric: false, disablePadding: true, label: 'Pilot' },
            { id: 'proNumber', numeric: false, disablePadding: true, label: 'Pro Number', isFilter: true },
            { id: 'carrier', numeric: false, disablePadding: true, label: 'Carrier' },
            { id: 'freightTerms', numeric: false, disablePadding: true, label: 'Terms', isFilter: true },
            { id: 'freightCharges', numeric: false, disablePadding: true, label: 'Charge', isFilter: true },
            { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer Name' },
            { id: 'shipToCity', numeric: false, disablePadding: true, label: 'City', isFilter: true },
            { id: 'shipToState', numeric: false, disablePadding: true, label: 'State', isFilter: true },
            { id: 'boxes', numeric: false, disablePadding: true, label: '# Boxes', isFilter: true },
            { id: 'skid', numeric: false, disablePadding: true, label: '# Skids', isFilter: true },
            { id: 'originalWeight', numeric: false, disablePadding: true, label: 'Actual Weight' },
            { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },
        ];
        
        return (
            <>
                <DynamicTable
                    headerProperty={'id'}
                    isMultiSelectable
                    onSelectedCallBack={this.onProcessSelected}
                    headers={processingHeaderCells}
                    rows={parsedProcessingArray}
                />
            {
                (this.state.isOpenDialogAddressConflict && this.props.conflictAddress) ? (
                    <Dialog scroll="body" maxWidth="lg" open={this.state.isOpenDialogAddressConflict} onClose={() => this.triggerDialog(false)}>
                        <DialogTitle id="join-process-title">Combine BOL's Conflict</DialogTitle>
                        <DialogContent>
                            <Paper elevation={3} >
                                <DialogTitle id="join-process-title-inner">Available Addresses from Orders in this Shipment:*</DialogTitle>
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
                            <Button
                                color="primary"
                                onClick={e => {
                                    e.stopPropagation();
                                    this.doUpdateAddress()
                                }}
                            >
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
            {
                this.state.isOpenDialogSkid ? (
                    <Dialog
                        scroll="body"
                        maxWidth="lg"
                        open={this.state.isOpenDialogSkid}
                        onClose={() => {
                            this.setState(prev => ({
                                ...prev,
                                isOpenDialogSkid: false,
                            }))
                        }}>
                        <DialogTitle id="skid-process-dialog">Split Shipment Window</DialogTitle>
                        <DialogContent>
                            <Paper elevation={3}>
                                <DialogTitle id="skid-process-dialog-inner">Order Information</DialogTitle>
                                <Grid container spacing={4}>
                                    <Grid item xs={6} lg={6}>
                                        <FormControl variant="outlined" style={{
                                            minWidth: '350px',
                                            margin: '1%',
                                            padding: '10px',
                                        }}> 
                                            {
                                                this.state.selectedSkipProcess ? (
                                                    <>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px">
                                                                {`Customer Name: ${this.state.selectedSkipProcess.customerName}`}
                                                            </RegularTypography>
                                                        </div>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px">
                                                                {`Pro Number: ${this.state.selectedSkipProcess.proNumber}`}
                                                            </RegularTypography>
                                                        </div>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px">
                                                                {`Order Number: ${this.state.selectedSkipProcess.orderNumber}`}
                                                            </RegularTypography>
                                                        </div>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px">
                                                                {`Delivery Number: ${this.state.selectedSkipProcess.deliveryNumber}`}
                                                            </RegularTypography>
                                                        </div>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px">
                                                                {`Number Of Skids: ${this.state.selectedSkipProcess.skid}`}
                                                            </RegularTypography>
                                                        </div>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px">
                                                                {`Number Of Packages: ${this.state.selectedSkipProcess.boxes}`}
                                                            </RegularTypography>
                                                        </div>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px">
                                                                {`Weight: ${this.state.selectedSkipProcess.revisedWeight}`}
                                                            </RegularTypography>
                                                        </div>
                                                    </>
                                                ): null
                                            }
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} lg={6}>
                                        <FormControl variant="outlined" style={{
                                            minWidth: '350px',
                                            margin: '1%',
                                            padding: '10px',
                                        }}> 
                                            {
                                                this.state.selectedSkipProcess ? (
                                                    <>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px" />
                                                        </div>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px" />
                                                        </div>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px">
                                                                {`Order Date: ${this.state.selectedSkipProcess.orderDate}`}
                                                            </RegularTypography>
                                                        </div>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px">
                                                                {`Released Date: ${this.state.selectedSkipProcess.releasedDate}`}
                                                            </RegularTypography>
                                                        </div>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px">
                                                                {`Due Date: ${this.state.selectedSkipProcess.dueDate}`}
                                                            </RegularTypography>
                                                        </div>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px">
                                                                {`Terms: ${this.state.selectedSkipProcess.freightTerms}`}
                                                            </RegularTypography>
                                                        </div>
                                                        <div className="p-2">
                                                            <RegularTypography length="300px">
                                                                {`Carrier: ${this.state.selectedSkipProcess.carrier}`}
                                                            </RegularTypography>
                                                        </div>
                                                    </>
                                                ): null
                                            }
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Grid container spacing={4}>
                                <Grid item xs={9} lg={9}>
                                    <FormControl variant="outlined" style={{
                                        minWidth: '500px',
                                        marginTop: '35px'
                                    }}>
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            How many containers this order is going to need?
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            label="How many containers this order is going to need?"
                                        >
                                            {
                                                
                                                _.times((this.state.selectedSkipProcess.skid + 1))
                                                .filter(p => p)
                                                .map((k: number) => (
                                                    <MenuItem
                                                        key={k}
                                                        value={k}
                                                        // onClick={e => {
                                                        //     e.stopPropagation();
                                                        //     this.onSelectTermConflict(k);
                                                        // }}
                                                    >
                                                        {k}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl component="fieldset" style={{
                                        minWidth: '500px',
                                        marginTop: '35px'
                                    }}>
                                        <FormLabel component="legend">
                                            Even number of Skids?
                                        </FormLabel>
                                        <RadioGroup
                                            aria-label="even-skids"
                                            name="even-skids"
                                            row
                                            // value={value}
                                            // onChange={handleRadioChange}
                                        >
                                            <FormControlLabel value="YES" control={<Radio />} label="YES" />
                                            <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3} lg={3}>
                                    <Button
                                        style={{
                                            marginTop: '50px',
                                        }}
                                        color="default">
                                            Custom Configuration
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                ) : null
            }
            {
                (this.state.isOpenDialogAdditional && this.props.processInfo) ? (
                    <Dialog
                        scroll="body"
                        maxWidth="lg"
                        open={this.state.isOpenDialogAdditional}
                        onClose={() => {
                           this.setState(prev => ({
                               ...prev,
                               isOpenDialogAdditional: false,
                           }));
                        }}>
                            <DialogTitle id="skid-process-dialog">Shipping Information</DialogTitle>
                            <DialogContent>
                                <Paper elevation={3}>
                                    <Grid item xs={6} lg={6}>
                                        <FormGroup 
                                            row
                                            style={{
                                                minWidth: '350px',
                                                margin: '1%',
                                                padding: '10px',
                                            }}
                                        >
                                            <Grid item xs={4} lg={4}>
                                                <Typography>Ship Form:</Typography>
                                            </Grid>
                                            <Grid item xs={8} lg={8}>
                                                <Typography>
                                                    {
                                                        `${this.state.selectedProcessAdditional.billToCustomerName}
                                                        ${this.props.processInfo.billToState}
                                                        ${this.props.processInfo.billToCity}
                                                        ${this.props.processInfo.billToAddress1}
                                                        ${this.props.processInfo.billToPhone}
                                                        `
                                                    }
                                                </Typography>
                                            </Grid>
                                        </FormGroup>
                                        <FormGroup 
                                            row
                                            style={{
                                                minWidth: '350px',
                                                margin: '1%',
                                                padding: '10px',
                                            }}
                                        >
                                            <Grid item xs={4} lg={4}>
                                                <Typography>Bill To:</Typography>
                                            </Grid>
                                            <Grid item xs={8} lg={8}>
                                                <Typography>
                                                    {
                                                        `${this.state.selectedProcessAdditional.billToCustomerName}
                                                        ${this.props.processInfo.billToState}
                                                        ${this.props.processInfo.billToCity}
                                                        ${this.props.processInfo.billToAddress1}
                                                        ${this.props.processInfo.billToPhone}
                                                        `
                                                    }
                                                </Typography>
                                            </Grid>
                                        </FormGroup>
                                        <FormGroup 
                                            row
                                            style={{
                                                minWidth: '350px',
                                                margin: '1%',
                                                padding: '10px',
                                            }}
                                        >
                                            <Grid item xs={4} lg={4}>
                                                <Typography>Change Bill To Address to Customer:</Typography>
                                            </Grid>
                                            <Grid item xs={8} lg={8}>
                                               
                                            </Grid>
                                        </FormGroup>
                                        <FormGroup row>

                                        </FormGroup>
                                        <FormGroup row>

                                        </FormGroup>
                                        <FormGroup row>

                                        </FormGroup>
                                        <FormGroup row>

                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={6} lg={6}>
                                        
                                    </Grid>
                                </Paper>
                            </DialogContent>
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
    processInfo: state.bol.processInfo,
})

const mapDispatchToProps = (dispatch: Dispatch<IActionPayload>) => ({
    fetchProcessing: (p: BOLRequestProps) => {
        dispatch(BOL_ACTIONS.bolProcessingRequest(p));
    },
    fetchConflictingAddress: (p: number[]) => {
        dispatch(BOL_ACTIONS.bolProcessingConflictingAddressRequest(p));
    },
    fetchProcessInfo: (p: ProcessingGetInfo) => {
        dispatch(BOL_ACTIONS.bolProcessingGetInfoRequest(p));
    },
    updateProcessingRequest: (p: UpdateProcessProps) => {
        dispatch(BOL_ACTIONS.bolProcessingUpdateRequest(p));
    },
    updateAddressRequest: (p: UpdateAddress) => {
        dispatch(BOL_ACTIONS.bolProcessingUpdateAddressRequest(p));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BOLProcessing);

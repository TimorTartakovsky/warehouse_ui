import React, { Dispatch }  from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { Menu } from '@material-ui/icons';
import {
    TextField, MenuItem, Dialog, Grid, Button, DialogTitle, DialogContent, 
    List, ListItemIcon, ListItemText, ListItem,
    Checkbox, Paper, FormControl, InputLabel, Select, DialogActions, Card, FormLabel, RadioGroup,
    FormControlLabel, Radio, FormGroup, Typography, Fab, CardContent, InputAdornment, Box,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BOL_ACTIONS, IActionPayload } from '../../actions'
import { IRootState, TableItem } from '../../store';
import { IBOLProcessing, ICarrier, IBOLBilling, IBOLShipping } from '../../store/bol/types';
import {
    BOLRequestProps, UpdateProcessProps, ConflictAddressType, UpdateAddress,
    ProcessingGetInfo, ProcessingInfo, IUpdateBillingAddress, IBOLUpdateLocationInfo, IUpdateShippingAddress,
} from '../../actions/bol.action';
import DynamicTable, { IHeaderCellType } from '../DynamicTable';
import { RegularTypography } from '../Shared/Typography';
import Check from '@material-ui/icons/Check';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButtonGroup, EIconButtonGroupType } from '../Shared/Buttons';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as _ from 'lodash';
import { AdditionalInfo } from './dialogs/AdditionalInfo';

export enum BOLProcessingBtnType {
    process = 'process',
    shipConfirm = 'shipConfirm',
    delete = 'delete',
}

type ProcessingButtonsGroupState = {
    [BOLProcessingBtnType.process]: boolean;
    [BOLProcessingBtnType.shipConfirm]: boolean;
    [BOLProcessingBtnType.delete]: boolean;
}

const DEFAULT_PROCESSING_BUTTONS_GROUP_STATE: ProcessingButtonsGroupState = {
    [BOLProcessingBtnType.process]: true,
    [BOLProcessingBtnType.shipConfirm]: true,
    [BOLProcessingBtnType.delete]: true,
}

export interface IBOLProcessingProps {
    locationId?: number;
    location?: any;
    branchId?: number;
    processing?: IBOLProcessing[] | null;
    billings?:  IBOLBilling[] | null;
    shippings?:  IBOLShipping[] | null;
    processInfo?: ProcessingInfo | null;
    conflictAddress?: ConflictAddressType[] | null;
    processingTableHeaders?: IHeaderCellType[];
    fetchProcessing?: (p: BOLRequestProps) => void;
    fetchProcessInfo?: (p: ProcessingGetInfo) => void;
    updateAddressRequest?: (p: UpdateAddress) => void;
    updateProcessingRequest?: (p: UpdateProcessProps) => void;
    fetchConflictingAddress?: (p: number[]) => void;
    onSelected?: (m: UpdateProcessProps) => void;
    getBillingInfo?: (p: string) => void;
    getShippingInfo?: (p: string) => void;
    updateBillingAddress?: (p: IUpdateBillingAddress) => void;
    updateLocationInfo?: (p: IBOLUpdateLocationInfo) => void;
    updateShippingAddress?: (p: IUpdateShippingAddress) => void;
}

export interface IBOLProcessingState {
    searchField: string;
    processingArray: TableItem[] | any[];
    selectedAddress: ConflictAddressType;
    selectedTermsMap: Map<string, number>;
    isOpenDialogSkid: boolean;
    selectedProcesses: Map<string, IBOLProcessing>;
    selectedCarriesMap: Map<number, ICarrier>;
    selectedAddressMap: Map<number, number>;
    selectedSkipProcess: Partial<IBOLProcessing>;
    selectedTermConflict: string;
    isOpenDialogAdditional: boolean;
    btnProcessingGroupStatus: ProcessingButtonsGroupState;
    selectedProcessAdditional: Partial<IBOLProcessing>;
    isOpenDialogAddressConflict: boolean;
    isBrokerApi: boolean;
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
        isBrokerApi: false,
        searchField: '',
        processingArray: [],
        selectedAddress: {
            shipToAddress1: '',
            shipToCountry: '',
            shipToCustomerId: '',
            shipToCustomerName: '',
            shipToCustomerNumber: '',
            shipToAddressId: '',
        },
        selectedTermsMap: new Map<string, number>(),
        isOpenDialogSkid: false,
        selectedProcesses: new Map<string, IBOLProcessing>(),
        selectedCarriesMap: new Map<number, ICarrier>(),
        selectedAddressMap: new Map<number, number>(),
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
        selectedTermConflict: '',
        isOpenDialogAdditional: false,
        selectedProcessAdditional: {
            billToCustomerName: '',
        },
        btnProcessingGroupStatus: DEFAULT_PROCESSING_BUTTONS_GROUP_STATE,
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
            this.setState(prev => ({
                ...prev,
                btnProcessingGroupStatus: {
                    [BOLProcessingBtnType.process]: true,
                    [BOLProcessingBtnType.shipConfirm]: true,
                    [BOLProcessingBtnType.delete]: true,
                }
            }))
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
                    isBrokerApi: !prev.isBrokerApi ? m.brokerApi : prev.isBrokerApi,
                    btnProcessingGroupStatus: {
                        [BOLProcessingBtnType.process]: selectedProcesses.size === 0 ? true : false,
                        [BOLProcessingBtnType.shipConfirm]: selectedProcesses.size === 0 ? true : false,
                        [BOLProcessingBtnType.delete]: selectedProcesses.size === 0 ? true : false,
                    },
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
                        isBrokerApi: !prev.isBrokerApi ? m.brokerApi : prev.isBrokerApi,
                        btnProcessingGroupStatus: {
                            [BOLProcessingBtnType.process]: false,
                            [BOLProcessingBtnType.shipConfirm]: false,
                            [BOLProcessingBtnType.delete]: false,
                        },
                    }));
                } else {
                    this.setState(prev => ({
                        ...prev,
                        selectedProcesses,
                        selectedTermsMap: termsMap,
                        selectedAddressMap: addressMap,
                        isBrokerApi: !prev.isBrokerApi ? m.brokerApi : prev.isBrokerApi,
                        btnProcessingGroupStatus: {
                            [BOLProcessingBtnType.process]: false,
                            [BOLProcessingBtnType.shipConfirm]: false,
                            [BOLProcessingBtnType.delete]: false,
                        },
                    }));
                }
            }
        }
    }

    private onProcessClicked = () => {
        // const bolKeys = [...this.state.selectedProcesses.keys()];
        this.props.updateProcessingRequest &&
        this.props.updateProcessingRequest({
            bolNumbers: [],
            branchId: this.props.branchId || 0,
            brokerApi: this.state.isBrokerApi ? 1 : 0,
            locationId: this.props.locationId || 0,
            orders: [...this.state.selectedProcesses.values()],
            status: 1,
            taskType: 1,
        });
    }

    private onSelectTermConflict = (p: string): void => {
        this.setState(prev => ({
            ...prev,
            selectedTermConflict: p,
        }))
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

    private tableColumnFilter = (v: string) => {
        if (!Array.isArray(this.props.processing) || !this.props.processing.length) {
          console.log(`NO ITEMS WERE FOUND.`);
        } else if (!v) {
          console.log(`FILTER WAS DISABLED.`);
          this.setState(prev => ({
            ...prev,
            searchField: v,
            processingArray: this.doGenerateProcessing(),
          }));
        } else {
          console.log(`SEARCH STARTED.`);
          if (!this.state.processingArray.length) {
              return this.setState(prev => ({
                ...prev,
                searchField: v,
              }));
          } else {
              const keys = Object.keys(this.state.processingArray[0]);

              const compar = (k: string, r: any) => !!r[k] && r[k].isSearchable 
                && `${r[k].source || ''}`.toLowerCase().includes(v.toLowerCase());

              const newRows = this.state.processingArray
                .filter((r: TableItem) => {
                    const d = keys.filter(k => compar(k, r));
                    return d.length;
                });
              this.setState(prev => ({
                ...prev,
                searchField: v,
                processingArray: newRows,
              }));
          }
        }
    }

    private handleProcessCarrierChange = (e: any, selectedCarrier: ICarrier, id: number) => {
        e.stopPropagation();
        const selectedCarriersMap = this.state.selectedCarriesMap;
        if (selectedCarrier) {
            selectedCarriersMap.set(id, selectedCarrier);
        }
        this.setState(prev => ({
            ...prev,
            selectedCarriesMap: selectedCarriersMap,
        }));
    }

    public componentDidUpdate(prevProps: IBOLProcessingProps, prevState: IBOLProcessingState) {
        if (!prevProps || !prevProps.processing || !prevProps.processing.length) {
            return;
        }
        // IMPORTANT: PREVENT INFINITY UPDATE
        if (prevProps.processing.length !== prevState.processingArray.length) {
            const newProcessing = this.doGenerateProcessing();
            this.setState(prev => ({ ...prev, processingArray: newProcessing}));
        }
    }

    private updateAddress = (up: IUpdateBillingAddress): void => {
        this.props.updateBillingAddress && this.props.updateBillingAddress(
            {
                bolIds: up.bolIds,
                locationId: this.props.locationId || 0,
                shipToCountry: 'billTo',
                updateParams: up.updateParams,
            }
        )
    }
    private updateShippingAddress = (up: IUpdateShippingAddress): void => {
        this.props.updateShippingAddress && this.props.updateShippingAddress(
            {
                bolIds: up.bolIds,
                locationId: this.props.locationId || 0,
                shipToCountry: up.shipToCountry,
                updateParams: up.updateParams,
            }
        );
    }

    private doGenerateProcessing = (): TableItem[] => {
        if (!this.props.processing || !this.props.processing.length) {
            return [];
        } else {
            return this.props.processing.map((process: IBOLProcessing) => {
                const defCs = process.carriers && process.carriers[0];
                const cs = this.state.selectedCarriesMap.get(process.id);
                const options = process.carriers.map((option: ICarrier) => {
                    const firstLetter = option.carrierName[0];
                    return {
                      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                      ...option,
                    };
                });
                return {
                        id: process.id,
                        remarks: {
                            isSearchable: false,
                            source: process.remarks,
                        },
                        orderNumber: {
                            isSearchable: true,
                            source: process.orderNumber,
                            value: <RegularTypography length="80px">{process.orderNumber}</RegularTypography>
                        },
                        deliveryNumber: {
                            isSearchable: true,
                            source: process.deliveryNumber,
                            value: <RegularTypography length="70px">{process.deliveryNumber}</RegularTypography>
                        },
                        pilot: {
                            isSearchable: true,
                            source: process.pilot,
                            value: <RegularTypography length="40px">{process.pilot}</RegularTypography>
                        },
                        carrier: {
                            isSearchable: true,
                            source: process.carrier,
                            value: (
                                process.brokerApi ? (
                                    <RegularTypography length="120px">Auto-select</RegularTypography>
                                ) : (
                                    <Autocomplete
                                        id={`${process.id}-bol-processing-carrier`}
                                        key={`${process.id}-bol-processing-carrier`}
                                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                        groupBy={(option) => option && option.firstLetter || ''}
                                        getOptionLabel={(option) => option && option.carrierName}
                                        style={{ width: 200 }}
                                        value={cs || defCs || null}
                                        disabled={!process.carriers || !process.carriers.length}
                                        onChange={(e: any, p: any) => this.handleProcessCarrierChange(e, p, process.id)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField style={{ width: 200 }} {...params} variant="outlined" />
                                            );
                                        }}
                                    />
                                )        
                            )
                        },
                        freightTerms: {
                            isSearchable: true,
                            source: process.freightTerms,
                            value: <RegularTypography length="120px">{process.freightTerms}</RegularTypography>
                        },
                        freightCharges: {
                            isSearchable: true,
                            source: process.freightCharges,
                            value: 
                            (process.freightTerms === 'Prepaid (Genera Pay)' ?(
                                <RegularTypography length="60px" />
                                ) : (
                                    <TextField
                                        style={{ width: '60px' }}
                                        onClick={() => console.log('freightCharges -> implement')}
                                        fullWidth
                                        type="number"
                                        className="m-2"
                                        id="outlined-basic"
                                         variant="standard"
                                    />
                                ) 
                            )
                        },
                        customerName: {
                            isSearchable: true,
                            source: process.customerName,
                            value: <RegularTypography length="120px">{process.customerName}</RegularTypography>
                        },
                        shipToCity: {
                            isSearchable: true,
                            source: process.shipToCity,
                            value: <RegularTypography length="120px">{process.shipToCity}</RegularTypography>
                        },
                        shipToState: {
                            isSearchable: true,
                            source: process.shipToState,
                            value: <RegularTypography length="60px">{process.shipToState}</RegularTypography>
                        },
                        boxes: {
                            isSearchable: true,
                            source: process.boxes,
                            value: <RegularTypography length="60px">{process.boxes}</RegularTypography>
                        },
                        skid: {
                            isSearchable: true,
                            source: process.skid,
                            value: <RegularTypography onClick={() => {
                                this.onSkidClick(process);
                            }} length="60px">{process.skid}</RegularTypography>
                        },
                        originalWeight: {
                            isSearchable: true,
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
            });
        }
    }

    private doGenerateProcessingHeader = (): IHeaderCellType[] => {
        const processingHeaderCells: IHeaderCellType[] = [
            { id: 'orderNumber', numeric: false, disablePadding: true, label: 'Order' },
            { id: 'deliveryNumber', numeric: false, disablePadding: true, label: 'Delivery' },
            { id: 'pilot', numeric: false, disablePadding: true, label: 'Pilot' },
            { id: 'carrier', numeric: false, disablePadding: true, label: 'Carrier' },
            { id: 'freightTerms', numeric: false, disablePadding: true, label: 'Terms' },
            { id: 'freightCharges', numeric: false, disablePadding: true, label: 'Charge' },
            { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer Name' },
            { id: 'shipToCity', numeric: false, disablePadding: true, label: 'City' },
            { id: 'shipToState', numeric: false, disablePadding: true, label: 'State' },
            { id: 'boxes', numeric: false, disablePadding: true, label: '# Boxes' },
            { id: 'skid', numeric: false, disablePadding: true, label: '# Skids' },
            { id: 'originalWeight', numeric: false, disablePadding: true, label: 'Actual Weight' },
            { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },
        ];
        return processingHeaderCells;
    }

    public render(): React.ReactElement {
        return (
            <CardContent>
                <div className={clsx('app-page-title')}>
                    <div>
                        <Box className="app-page-title--first">
                            <Paper
                                elevation={2}
                                className="app-page-title--iconbox d-70 d-flex align-items-center bg-secondary justify-content-center">
                                <ReceiptIcon />
                            </Paper>
                            <div className="app-page-title--heading">
                                <h5>BOL Processing</h5>
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
                                        onChange={({target: { value }}) =>  this.tableColumnFilter(value)}
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
                                            btnType: BOLProcessingBtnType.process,
                                            icon: (<Check />),
                                            text: 'Process BOL',
                                            isDisabled: this.state.btnProcessingGroupStatus.process,
                                            onButtonClicked: (e: any, btnType: string): void => {
                                                e.stopPropagation();
                                                this.onProcessClicked()
                                            }
                                        },
                                        {
                                            btnType: BOLProcessingBtnType.shipConfirm,
                                            icon: (<AddShoppingCartIcon/>),
                                            text: 'Ship Confirm BOL /W/O BOL',
                                            isDisabled: this.state.btnProcessingGroupStatus.shipConfirm,
                                            onButtonClicked: (e: any, btnType: string): void => {
                                                // handleProcessingEvents(e, btnType);
                                            }
                                        },
                                        {
                                            btnType: BOLProcessingBtnType.delete,
                                            icon: (<HighlightOffIcon />),
                                            text: 'Delete BOL Info',
                                            isDisabled: this.state.btnProcessingGroupStatus.delete,
                                            onButtonClicked: (e: any, btnType: string): void => {
                                                // handleProcessingEvents(e, btnType);
                                            }
                                        }
                                    ]}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>

                
                <DynamicTable
                    headerProperty={'id'}
                    isMultiSelectable
                    onSelectedCallBack={this.onProcessSelected}
                    headers={this.doGenerateProcessingHeader()}
                    rows={this.state.processingArray}
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
                        maxWidth={false}
                        open={this.state.isOpenDialogAdditional}
                        onClose={() => {
                           this.setState(prev => ({
                               ...prev,
                               isOpenDialogAdditional: false,
                           }));
                        }}>
                            <DialogTitle id="skid-process-dialog">Shipping Information</DialogTitle>
                            <DialogContent>
                                <Paper>
                                    <AdditionalInfo
                                        additionalInfo={this.props.processInfo}
                                        userLocation={this.props.location}
                                        getBillingInfo={this.props.getBillingInfo}
                                        getShippingInfo={this.props.getShippingInfo}
                                        billings={this.props.billings}
                                        shippings={this.props.shippings}
                                        updateAddress={this.updateAddress}
                                        updateShippingAddress={this.updateShippingAddress}
                                        updateLocationInfo={d => {
                                            this.props.updateLocationInfo && this.props.updateLocationInfo(d);
                                            this.setState(prev => ({
                                                ...prev,
                                                isOpenDialogAdditional: false,
                                            }));
                                        }}
                                    />
                                </Paper>
                            </DialogContent>
                    </Dialog>
                ) : null
            }
            {/* {
                isOpen ? (
                    <ConfirmationDialog 
                        isOpen={isOpen}
                        setOpen={setOpen}
                        headerText={confirmHeaderText || ''}
                        bodyText={confirmBodyText || ''}
                        footerActions={{
                            close: () => console.log(`closed`),
                            agreed: () => { (agreedCB && typeof agreedCB === 'function' && agreedCB()) },
                        }}
                    />
                ): null
            } */}
            </CardContent>
        )
    }
}

const mapStateToProps = (state: IRootState) => ({
    locationId: state.user.locationId,
    branchId: state.user.location && state.user.location.branchId || 0,
    processing: state.bol.processing,
    conflictAddress: state.bol.conflictAddress,
    processInfo: state.bol.processInfo,
    location: state.user.location,
    billings: state.bol.billings,
    shippings: state.bol.shippings,
})

const mapDispatchToProps = (dispatch: Dispatch<IActionPayload>) => ({
    fetchProcessing: (p: BOLRequestProps): void => {
        dispatch(BOL_ACTIONS.bolProcessingRequest(p));
    },
    fetchConflictingAddress: (p: number[]): void => {
        dispatch(BOL_ACTIONS.bolProcessingConflictingAddressRequest(p));
    },
    fetchProcessInfo: (p: ProcessingGetInfo): void => {
        dispatch(BOL_ACTIONS.bolProcessingGetInfoRequest(p));
    },
    updateProcessingRequest: (p: UpdateProcessProps): void => {
        dispatch(BOL_ACTIONS.bolProcessingUpdateRequest(p));
    },
    updateAddressRequest: (p: UpdateAddress): void => {
        dispatch(BOL_ACTIONS.bolProcessingUpdateAddressRequest(p));
    },
    getBillingInfo: (p: string): void => {
        dispatch(BOL_ACTIONS.bolProcessingGetBillingInfoRequest(p));
    },
    getShippingInfo: (p: string): void => {
        dispatch(BOL_ACTIONS.bolProcessingGetShippingInfoRequest(p));
    },
    updateBillingAddress: (p: IUpdateBillingAddress): void => {
        dispatch(BOL_ACTIONS.bolProcessingUpdateBillingAddressRequest(p));
    },
    updateShippingAddress: (p: IUpdateShippingAddress) => {
        dispatch(BOL_ACTIONS.bolProcessingUpdateShippingAddressRequest(p));
    },
    updateLocationInfo: (p: IBOLUpdateLocationInfo): void => {
        dispatch(BOL_ACTIONS.bolProcessingUpdateLocationRequest(p));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BOLProcessing);

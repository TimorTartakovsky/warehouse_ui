import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Settings from '@material-ui/icons/Settings';
import LocationOn from '@material-ui/icons/LocationOn';
import Language from '@material-ui/icons/Language';
import Edit from '@material-ui/icons/Edit';
import Search from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    FormGroup, Grid, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
    Paper, InputBase, IconButton, Checkbox, Fade, Typography, Tab, Tabs, Button, DialogActions,
} from '@material-ui/core';
import { IBOLBilling, IBOLShipping } from '../../../store/bol/types';
import { IUpdateBillingAddress, IBOLUpdateLocationInfo, IUpdateShippingAddress } from '../../../actions/bol.action';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
      <div
        role="tabpanel"
        style={{ height: '550px', overflowX: 'hidden', overflowY: 'auto', width: '100%' }}
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
  );
}

const tabPropsHandler = (index: any) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minWidth: '850px'
  },
  expandableContainer: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  editBtn: {
    color: '#5383ff',
    cursor: 'pointer'
  },
  title: {
    display: 'flex',
    justifyContent: 'left',
    padding: '5px',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    minWidth: '850px',
  },
  tabs: {
    width: '350px',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  searchRoot: {
    marginLeft: '10px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '250px',
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
}));

export interface IAdditionalInfo {
    userLocation?: any;
    additionalInfo?: any;
    getBillingInfo?: (n: string) => void;
    getShippingInfo?:(n: string) => void;
    billings?: IBOLBilling[] | null;
    shippings?: IBOLShipping[] | null;
    updateAddress?: (up: IUpdateBillingAddress) => void;
    updateShippingAddress?: (p: IUpdateShippingAddress) => void;
    updateLocationInfo?: (p: IBOLUpdateLocationInfo) => void;
}

export enum EAdditionalInfoType {
    GENERAL_INFO,
    SHIPPING_INFO,
    INTERNATIONAL_INFO,
    PALLET_INFO
}

const createData = (palletNumber: string, boxes: number, totalWeight: number) => {
    return { palletNumber, boxes, totalWeight };
}

const createBillingData = (
    isSelected: boolean,
    addressCode: string,
    address: string,
    city: string,
    state: string,
    zip: string,
) => {
    return {isSelected, addressCode, address, city, state, zip};
}

const doShippingsRows = (rows: IBOLShipping[], selectedBA?: string) => {
    if (!Array.isArray(rows) || !rows.length) {
        return [];
    }
    return rows.map(r => {
        return createBillingData(
            (r.shipToAddressId === selectedBA),
            r.shipToAddressId,
            r.shipToAddress1,
            r.shipToCity,
            r.shipToState,
            r.shipToZip
        );
    })
}

const doBillingsRows = (rows: IBOLBilling[], selectedBA?: string) => {
    if (!Array.isArray(rows) || !rows.length) {
        return [];
    }
    return rows.map(r => {
        return createBillingData(
            (r.billToAddressId === selectedBA),
            r.billToAddressId,
            r.billToAddress1,
            r.billToCity,
            r.billToState,
            r.billToZip
        );
    })
}

const rows = [
    createData('P11174', 159, 6.0),
    createData('P11175', 237, 9.0),
    createData('P11176', 262, 16.0),
    createData('P11177', 305, 3.7),
    createData('P11178', 356, 16.0),
];

export const AdditionalInfo = (props: IAdditionalInfo) => {

    const classes = useStyles();

    const [isBillToOpen, setBillToOpen] = React.useState(false);
    const [billAddrSelected, setBillAddrSelected] = React.useState(false);
    const [billSearch, setBillSearch] = React.useState('');
    const [billingAddressSelected, setBillingAddressSelected] = React.useState('');
    
    const [isShipToOpen, setShipToOpen] = React.useState(false);
    const [shipAddrSelected, setShipAddrSelected] = React.useState(false);
    const [shipSearch, setShipSearch] = React.useState('');
    const [shippingAddressSelected, setShippingAddressSelected] = React.useState('');

    const [currentTab, setCurrentTab] = React.useState(EAdditionalInfoType.GENERAL_INFO);
    const defaultDescription = props.additionalInfo.description;
    const [description, setDescription] = React.useState(defaultDescription);
    const defaultSpecialInstructions = props.additionalInfo.specialInstruction;
    const [instruction, setInstruction] = React.useState(defaultSpecialInstructions);
    const defaultRemark = props.additionalInfo.internalRemark;
    const [remark, setRemark] = React.useState(defaultRemark);
    const defaultQuoteNumber = props.additionalInfo.quoteNumber;
    const [quoteNumber, setQuoteNumber] = React.useState(defaultQuoteNumber);
    const defaultAmount = props.additionalInfo.quoteAmount;
    const [quoteAmount, setAmount] = React.useState(defaultAmount);
    const defaultShipperName = props.additionalInfo.shipperName;
    const [shipper, setShipper] = React.useState(defaultShipperName);
    const defaultWeight = props.additionalInfo.revisedWeight;
    const [weight, setWeight] = React.useState(defaultWeight);
    const defaultRate = props.additionalInfo.classRate;
    const [rate, setRate] = React.useState(defaultRate);

    const tabChangeHandler = (event: React.ChangeEvent<{}>, tabIndex: EAdditionalInfoType) => {
        console.log(tabIndex);
        setCurrentTab(tabIndex);
    };

    return (
        <>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="fullWidth"
                    value={currentTab}
                    onChange={tabChangeHandler}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab
                        label={'General'}
                        icon={<Settings/>}
                        {...tabPropsHandler(EAdditionalInfoType.GENERAL_INFO)}
                    />
                    <Tab
                        label={'Shipping Address'}
                        icon={<LocationOn/>}
                        {...tabPropsHandler(EAdditionalInfoType.SHIPPING_INFO)}
                    />
                <Tab
                        label={'International Shipping'}
                        icon={<Language/>}
                        {...tabPropsHandler(EAdditionalInfoType.INTERNATIONAL_INFO)}
                    />
                <Tab
                        label={'Pallet Information'}
                        icon={<FontAwesomeIcon icon={['fas', 'box']} />}
                        {...tabPropsHandler(EAdditionalInfoType.PALLET_INFO)}
                    />
                </Tabs>
                <TabPanel
                    value={currentTab}
                    index={EAdditionalInfoType.GENERAL_INFO}
                >
                    <FormGroup 
                        row
                        style={{ minWidth: '500px', padding: '10px'}}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1} style={{ display: 'flex' }} alignItems="center">
                            <Typography>
                                Description:
                            </Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                fullWidth
                                id="additional-info-description"
                                multiline
                                size="small"
                                variant="outlined"
                                rows={4}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Grid>
                    </FormGroup>
                    <FormGroup 
                        row
                        style={{
                            minWidth: '500px',
                            padding: '10px',
                        }}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                            <Typography>Special Instruction:</Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                id="additional-info-instruction"
                                multiline
                                fullWidth
                                size="small"
                                rows={4}
                                variant="outlined"
                                value={instruction}
                                onChange={e => setInstruction(e.target.value)}
                            />
                        </Grid>
                    </FormGroup>
                    <FormGroup 
                        row
                        style={{
                            minWidth: '500px',
                            padding: '10px',
                        }}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                            <Typography>Internal Remark:</Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                id="additional-info-remark"
                                multiline
                                fullWidth
                                size="small"
                                rows={4}
                                variant="outlined"
                                value={remark}
                                onChange={e => setRemark(e.target.value)}
                            />
                        </Grid>
                    </FormGroup>
                    <FormGroup 
                        row
                        style={{
                            minWidth: '500px',
                            padding: '10px',
                        }}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                            <Typography>Freight Quote Number:</Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                id="additional-info-quote-number"
                                fullWidth
                                size="small"
                                variant="outlined"
                                value={quoteNumber}
                                onChange={e => setQuoteNumber(e.target.value)}
                            />
                        </Grid>
                    </FormGroup>
                    <FormGroup 
                        row
                        style={{
                            minWidth: '500px',
                            padding: '10px',
                        }}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                            <Typography>Freight Quote Amt:</Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                id="additional-info-quote-amount"
                                fullWidth
                                size="small"
                                variant="outlined"
                                value={quoteAmount}
                                onChange={e => setAmount(e.target.value)}
                            />
                        </Grid>
                    </FormGroup>
                    <FormGroup 
                        row
                        style={{
                            minWidth: '500px',
                            padding: '10px',
                        }}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                            <Typography>Shipper Per:</Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                id="additional-info-shipper"
                                fullWidth
                                size="small"
                                variant="outlined"
                                value={shipper}
                                onChange={e => setShipper(e.target.value)}
                            />
                        </Grid>
                    </FormGroup>
                    <FormGroup 
                        row
                        style={{
                            minWidth: '500px',
                            padding: '10px',
                        }}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                            <Typography>Update Total Weight:</Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                id="additional-info-weight"
                                fullWidth
                                size="small"
                                variant="outlined"
                                value={weight}
                                onChange={e => setWeight(e.target.value)}
                            />
                        </Grid>
                    </FormGroup>
                    <FormGroup 
                        row
                        style={{
                            minWidth: '500px',
                            padding: '10px',
                        }}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                            <Typography>Class Rate:</Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                id="additional-info-rate"
                                fullWidth
                                size="small"
                                variant="outlined"
                                value={rate}
                                onChange={e => setRate(e.target.value)}
                            />
                        </Grid>
                    </FormGroup>
                    <FormGroup 
                        row
                        style={{
                            minWidth: '500px',
                            padding: '10px',
                        }}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                            <Typography>Pro Number:</Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                id="additional-info-pro-number"
                                fullWidth
                                size="small"
                                variant="outlined"
                            />
                        </Grid>
                    </FormGroup>
                </TabPanel>
                <TabPanel value={currentTab} index={EAdditionalInfoType.SHIPPING_INFO}>
                    <div className={classes.expandableContainer}>
                        <FormGroup 
                            row
                            style={{
                                minWidth: '500px',
                                padding: '10px',
                            }}
                        >
                            <Grid item xs={3} lg={3} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                                <Typography>Pro Number:</Typography>
                            </Grid>
                            <Grid item xs={8} lg={8}>
                                <Typography>
                                    {props.userLocation.bolCompanyName} 
                                </Typography>
                                <Typography>
                                    {props.userLocation.address}
                                </Typography>
                                <Typography>
                                    {props.userLocation.city} {props.userLocation.zip} {props.userLocation.country}
                                </Typography>
                                <Typography>
                                    {props.userLocation.phone}
                                </Typography>
                            </Grid>
                        </FormGroup>
                    </div>
                    <div className={classes.expandableContainer}>
                        <FormGroup 
                            row
                            style={{
                                minWidth: '500px',
                                padding: '10px',
                            }}
                        >
                            <Grid item xs={3} lg={3} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                                <Typography>Bill To:</Typography>
                            </Grid>
                            <Grid item xs={8} lg={8}>
                                <Typography>
                                    {props.userLocation.bolCompanyName} 
                                </Typography>
                                <Typography>
                                    {props.additionalInfo.billToAddress1 || ''}
                                    {props.additionalInfo.billToAddress2 || ''}
                                    {props.additionalInfo.billToAddress3 || ''}
                                    {props.additionalInfo.billToAddress4 || ''}
                                </Typography>
                                <Typography>
                                    {props.additionalInfo.billToCity || ''} {props.additionalInfo.billToState || ''}  
                                    {props.additionalInfo.billToZip || ''} {props.additionalInfo.billToCountry || ''}
                                </Typography>
                                <Typography>
                                    {props.additionalInfo.billToPhone}
                                </Typography>
                            </Grid>
                            <Grid item xs={1} lg={1}>
                                <Edit
                                    className={`${classes.editBtn} m-2`}
                                    aria-label="edit"
                                    onClick={() => setBillToOpen(!isBillToOpen)}    
                                />
                            </Grid>
                        </FormGroup>
                        { isBillToOpen ?
                            (<>
                                <FormGroup style={{ justifyContent: 'space-between'}} row>
                                    <Paper
                                        className={classes.searchRoot}
                                    >
                                        <InputBase
                                            className={classes.searchInput}
                                            placeholder="Search Custom Number"
                                            inputProps={{ 'aria-label': 'search google maps' }}
                                            value={billSearch}
                                            type="number"
                                            onChange={e => {
                                                e.stopPropagation();
                                                setBillSearch(e.target.value);
                                            }}
                                        />
                                        <IconButton
                                            type="submit"
                                            className={classes.searchIconButton}
                                            aria-label="search"
                                            onClick={e => {
                                                e.stopPropagation();
                                                props.getBillingInfo && props.getBillingInfo(billSearch)
                                            }}
                                        >
                                            <Search />
                                        </IconButton>
                                    </Paper>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        className="mr-5"
                                        disabled={!billAddrSelected}
                                        onClick={() => {
                                            if (props.billings) {
                                                const item = props.billings.find(b => b.billToAddressId === billingAddressSelected);
                                                const updateParams = {
                                                    billToAddressId: item?.billToAddressId || '',
                                                    billToCustomerId: item?.billToCustomerId || '',
                                                    billToCustomerName: item?.billToCustomerName || '',
                                                    billToCustomerNumber: billSearch,
                                                };
                                                props.updateAddress && props.updateAddress({
                                                    bolIds: [props.additionalInfo.id],
                                                    locationId: 0,
                                                    shipToCountry: 'billTo',
                                                    updateParams,
                                                })
                                            }
                                        }}
                                    >
                                        UPDATE
                                    </Button>
                                </FormGroup>
                                <Fade timeout={1000} in={!!props.billings && !!props.billings.length}>
                                    <TableContainer className="mb-3 mt-3" component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center"></TableCell>
                                                    <TableCell align="center">Address Code</TableCell>
                                                    <TableCell align="center">Address</TableCell>
                                                    <TableCell align="center">City</TableCell>
                                                    <TableCell align="center">State</TableCell>
                                                    <TableCell align="center">zip</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                { props.billings ? (doBillingsRows(props.billings, billingAddressSelected).map(row => (
                                                <TableRow key={row.addressCode}>
                                                        <TableCell
                                                        key={`checkbox-${row.addressCode}`}
                                                        padding="checkbox">
                                                        <Checkbox
                                                            checked={row.isSelected}
                                                            onClick={() => {
                                                                if (billingAddressSelected === row.addressCode) {
                                                                    setBillingAddressSelected('');
                                                                    setBillAddrSelected(false)
                                                                } else {
                                                                    setBillingAddressSelected(row.addressCode);
                                                                    setBillAddrSelected(true)
                                                                }
                                                            }}
                                                            inputProps={{ 'aria-labelledby': 'enhanced-table-checkbox' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.addressCode}
                                                    </TableCell>
                                                    <TableCell align="center">{row.address}</TableCell>
                                                    <TableCell align="center">{row.city}</TableCell>
                                                    <TableCell align="center">{row.state}</TableCell>
                                                    <TableCell align="center">{row.zip}</TableCell>
                                                </TableRow>
                                                ))) : null}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Fade>
                            </>) : null
                        }
                    </div>
                    <div className={classes.expandableContainer}>
                        <FormGroup 
                            row
                            style={{
                                minWidth: '500px',
                                padding: '10px',
                            }}
                        >
                            <Grid item xs={3} lg={3} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                                <Typography>Ship To:</Typography>
                            </Grid>
                            <Grid item xs={8} lg={8}>
                                <Typography>
                                    {props.additionalInfo.shipToAddress1 || ''}
                                    {props.additionalInfo.shipToAddress2 || ''}
                                    {props.additionalInfo.shipToAddress3 || ''}
                                    {props.additionalInfo.shipToAddress4 || ''}
                                </Typography>
                                <Typography>
                                    {props.additionalInfo.shipToCity || ''} 
                                    {props.additionalInfo.shipToState || ''} 
                                    {props.additionalInfo.shipToZip || ''} 
                                    {props.additionalInfo.shipToCountry || ''} 
                                </Typography>
                                <Typography>
                                    {props.additionalInfo.shipToPhone || ''} 
                                </Typography>
                            </Grid>
                            <Grid item xs={1} lg={1}>
                                <Edit
                                    className={`${classes.editBtn} m-2`}
                                    aria-label="edit"
                                    onClick={() => setShipToOpen(!isShipToOpen)}  
                                />
                            </Grid>
                        </FormGroup>
                        {
                            isShipToOpen ? (
                                <>
                                    <FormGroup row style={{ justifyContent: 'space-between'}} >
                                        <Paper  className={classes.searchRoot}>
                                            <InputBase
                                                className={classes.searchInput}
                                                placeholder="Search Custom Number"
                                                inputProps={{ 'aria-label': 'search google maps' }}
                                                value={shipSearch}
                                                type="number"
                                                onChange={e => {
                                                    e.stopPropagation();
                                                    setShipSearch(e.target.value);
                                                }}
                                            />
                                            <IconButton
                                                type="submit"
                                                className={classes.searchIconButton}
                                                aria-label="search"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    props.getShippingInfo && props.getShippingInfo(shipSearch)
                                                }}
                                            >
                                                <Search />
                                            </IconButton>
                                        </Paper>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            className="mr-5"
                                            disabled={!shipAddrSelected}
                                            onClick={() => {
                                                if (Array.isArray(props.shippings)) {
                                                    const item = props.shippings.find(b => b.shipToAddressId === shippingAddressSelected);
                                                    const updateParams = {
                                                        shipToAddressId: item?.shipToAddressId,
                                                        shipToCustomerId: item?.shipToCustomerId,
                                                        shipToCustomerName: item?.shipToCustomerName,
                                                        billToCustomerNumber: shipSearch,
                                                    };
                                                    props.updateShippingAddress && props.updateShippingAddress({
                                                        bolIds: [props.additionalInfo.id],
                                                        locationId: 0,
                                                        shipToCountry: 'billTo',
                                                        updateParams,
                                                    })
                                                }
                                            }}
                                        >
                                            UPDATE
                                        </Button>
                                    </FormGroup>
                                    <Fade timeout={1000} in={!!props.shippings && !!props.shippings.length}>
                                        <TableContainer className="mb-3 mt-3" component={Paper}>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center"></TableCell>
                                                        <TableCell align="center">Address Code</TableCell>
                                                        <TableCell align="center">Address</TableCell>
                                                        <TableCell align="center">City</TableCell>
                                                        <TableCell align="center">State</TableCell>
                                                        <TableCell align="center">zip</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    { props.shippings ? (doShippingsRows(props.shippings, shippingAddressSelected).map(row => (
                                                    <TableRow key={row.addressCode}>
                                                            <TableCell
                                                            key={`checkbox-${row.addressCode}`}
                                                            padding="checkbox">
                                                            <Checkbox
                                                                checked={row.isSelected}
                                                                onClick={() => {
                                                                    if (shippingAddressSelected === row.addressCode) {
                                                                        setShippingAddressSelected('');
                                                                        setShipAddrSelected(false);
                                                                    } else {
                                                                        setShippingAddressSelected(row.addressCode);
                                                                        setShipAddrSelected(true);
                                                                    }
                                                                }}
                                                                inputProps={{ 'aria-labelledby': 'enhanced-table-checkbox' }}
                                                            />
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {row.addressCode}
                                                        </TableCell>
                                                        <TableCell align="center">{row.address}</TableCell>
                                                        <TableCell align="center">{row.city}</TableCell>
                                                        <TableCell align="center">{row.state}</TableCell>
                                                        <TableCell align="center">{row.zip}</TableCell>
                                                    </TableRow>
                                                    ))) : null}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Fade>
                                </>
                            ) : null
                        }
                    </div>
                </TabPanel>
                <TabPanel value={currentTab} index={EAdditionalInfoType.INTERNATIONAL_INFO}>
                    <FormGroup 
                        row
                        style={{ minWidth: '500px', padding: '10px'}}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1} style={{ display: 'flex' }} alignItems="center">
                            <Typography>
                                Custom Broker Email:
                            </Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                fullWidth
                                id="additional-info-broker-email"
                                multiline
                                size="small"
                                variant="outlined"
                            />
                        </Grid>
                    </FormGroup>
                    <FormGroup 
                        row
                        style={{ minWidth: '500px', padding: '10px'}}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1} style={{ display: 'flex' }} alignItems="center">
                            <Typography>
                                Additional Information:
                            </Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                fullWidth
                                id="additional-info"
                                multiline
                                variant="outlined"
                                size="small"
                                rows={4}
                            />
                        </Grid>
                    </FormGroup>
                    <FormGroup 
                        row
                        style={{ minWidth: '500px', padding: '10px'}}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                            <Typography>
                                Originator Default:
                            </Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                fullWidth
                                id="additional-info-originator"
                                multiline
                                variant="outlined"
                                rows={4}
                                size="small"
                            />
                        </Grid>
                    </FormGroup>
                    <FormGroup 
                        row
                        style={{ minWidth: '500px', padding: '10px'}}
                    >
                        <Grid item xs={4} lg={4} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                            <Typography>
                                Default Unit Quality:
                            </Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                fullWidth
                                id="additional-info-quantity"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    </FormGroup>
                </TabPanel>
                <TabPanel value={currentTab} index={EAdditionalInfoType.PALLET_INFO}>
                    <FormGroup  row style={{ minWidth: '500px', padding: '10px'}}>
                        <Grid item xs={4} lg={4} offset-lg={1}  style={{ display: 'flex' }} alignItems="center">
                            <Typography>
                                Order Number:
                            </Typography>
                        </Grid>
                        <Grid item xs={7} lg={7}>
                            <TextField
                                fullWidth
                                id="additional-info-quantity"
                                variant="outlined"
                                value={'520025378'}
                                // onChange={e => setDescription(e.target.value)}
                            />
                        </Grid>
                    </FormGroup>
                    <Typography>
                        Pallets:
                    </Typography>
                    <TableContainer className="mb-4" component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Pallet Number</TableCell>
                                    <TableCell align="center">Number of Boxes</TableCell>
                                    <TableCell align="center">Total Weight</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                  <TableRow key={row.palletNumber}>
                                      <TableCell component="th" scope="row">
                                          {row.palletNumber}
                                      </TableCell>
                                      <TableCell align="center">{row.boxes}</TableCell>
                                      <TableCell align="center">{row.totalWeight}</TableCell>
                                      <TableCell align="center">
                                          <Edit className={`${classes.editBtn}`} aria-label="edit"/>
                                      </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow key="result-skid-set">
                                      <TableCell component="th" scope="row">
                                          Total Skids: {rows.length}
                                      </TableCell>
                                      <TableCell align="center">
                                          Total Boxes: { rows.reduce((acc: number, r: any) => {
                                              acc += r.boxes;
                                              return acc
                                          }, 0) }
                                      </TableCell>
                                      <TableCell align="center">
                                        Total Weight: { rows.reduce((acc: number, r: any) => {
                                            acc += r.totalWeight;
                                            return acc
                                        }, 0) }
                                      </TableCell>
                                  </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </div>
            <DialogActions>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className="mr-5"
                    onClick={() => {
                        props.updateLocationInfo && props.updateLocationInfo(
                            {
                                classRate: `${rate}`,
                                description: description,
                                eta: null,
                                ids: [props.additionalInfo.id],
                                internalRemark: remark,
                                quoteAmount: quoteAmount,
                                quoteNumber: quoteNumber,
                                revisedWeight: weight,
                                shipperName: shipper,
                                specInst: instruction,
                            }
                        );
                    }}
                >
                    UPDATE
                </Button>
            </DialogActions>
        </>
    )
}

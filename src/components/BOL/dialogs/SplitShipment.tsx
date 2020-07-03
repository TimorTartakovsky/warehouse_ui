import React from 'react';
import {
    makeStyles, Theme, Typography, Grid, Tooltip, Fab, TextField, DialogActions,
    Button, FormGroup,
} from '@material-ui/core';
import { IBOLProcessing } from '../../../store/bol/types';
import moment from 'moment';
import './SplitShipment.scss'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const DATE_TIME_FORMAT = 'DD/MM HH:mm';
const DATE_TIME_DB = 'YYYY-MM-DD HH:mm:ss';

export interface ISplitShipment {
    selectedSkipProcess: Partial<IBOLProcessing>;
    updateShipment: (d: any) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      minWidth: '650px',
      minHeight: '450px',
      padding: '10px;'
    },
}));

export type TContainer = {
    id: string;
    skids: number;
}

export enum ERowActions {
    ADD_ROW = 'ADD_ROW',
    REMOVE_ROW = 'REMOVE_ROW'
}

export enum ESkidActions {
    ADD_SKID = 'ADD_SKID',
    REMOVE_SKID = 'REMOVE_SKID'
}

export const SplitShipment = (props: ISplitShipment): React.ReactElement => {
    const classes = useStyles();
    const containerPrefix = 'Shipment #';
    const [total, setTotal] = React.useState(
        (props.selectedSkipProcess.skid && props.selectedSkipProcess.skid - 1) || 0
    );
    const [containers, setContainers] = React.useState([{
        id: `${containerPrefix}1`,
        skids: 1,
    }]);
   
    const countRemaining = (): number => {
        if (!props.selectedSkipProcess.skid) {
            return 0;
        }
        const assigned = containers.reduce((acc: number, v: any) => {
            acc += v.skids;
            return acc;
        },0);
        return props.selectedSkipProcess.skid - assigned;
    }

    const addSkidToShipment = (index: number, a: ESkidActions) => {
        if (total === 0 && a === ESkidActions.ADD_SKID) {
            return;
        } else {
            if (a === ESkidActions.ADD_SKID) {
                containers[index].skids += 1;
                setTotal(total - 1);
            }
            if (a === ESkidActions.REMOVE_SKID) {
                containers[index].skids -= 1;
                setTotal(total + 1);
            }
            setContainers(containers);
        }
        
    }

    const manageRow = (r: ERowActions) => {
        if (!props.selectedSkipProcess.skid) {
            return;
        }
        if ((total >= (props.selectedSkipProcess.skid - 1) && r === ERowActions.REMOVE_ROW)
            || (total < 1) && (r === ERowActions.ADD_ROW)
        ) {
            return;
        } else if (r === ERowActions.REMOVE_ROW) {
            const d = containers.pop() || { skids: 0 };
            setTotal(total + d.skids);
            setContainers(containers);
        } else {
            containers.push({
                id: `${containerPrefix}${(containers.length + 1)}`,
                skids: 1,
            });
            setTotal(total - 1);
            setContainers(containers);
        }
    }

    return (
        <>
            <div className={classes.root}>
                <Grid container>
                    <Grid container justify="space-around" className="mb-2">
                        <Grid item xs={4} lg={4}>
                            <Typography>
                                Customer Info:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} lg={8}>
                            <Typography style={{ lineBreak: 'anywhere' }}>
                                {props.selectedSkipProcess.customerName}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className="mb-4">
                        <Grid item xs={4} lg={4}>
                            <Typography>
                                Order Info:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} lg={8}>
                            <Typography style={{ lineBreak: 'anywhere' }}>
                                Order Number: {props.selectedSkipProcess.orderNumber}
                            </Typography>
                            <Typography style={{ lineBreak: 'anywhere' }}>
                                Delivery Number: {props.selectedSkipProcess.deliveryNumber}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container className="mb-2">
                        <Grid item xs={4} lg={4}>
                            <Typography>
                                Order Date:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} lg={8}>
                            <Typography style={{ lineBreak: 'anywhere' }}>
                            {props.selectedSkipProcess.orderDate && moment(props.selectedSkipProcess.orderDate, DATE_TIME_DB).format(DATE_TIME_FORMAT)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className="mb-2">
                        <Grid item xs={4} lg={4}>
                            <Typography>
                                Release Date:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} lg={8}>
                            <Typography style={{ lineBreak: 'anywhere' }}>
                            {props.selectedSkipProcess.releasedDate && moment(props.selectedSkipProcess.releasedDate, DATE_TIME_DB).format(DATE_TIME_FORMAT)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className="mb-4">
                        <Grid item xs={4} lg={4}>
                            <Typography>
                                Due Date:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} lg={8}>
                            <Typography style={{ lineBreak: 'anywhere' }}>
                            {props.selectedSkipProcess.dueDate && moment(props.selectedSkipProcess.dueDate, DATE_TIME_DB).format(DATE_TIME_FORMAT)}
                            </Typography>
                        </Grid>
                    </Grid>
                    
                    <Grid container className="mb-2">
                        <Grid item xs={4} lg={4}>
                            <Typography>
                                Number of Skids:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} lg={8}>
                            <Typography style={{ lineBreak: 'anywhere' }}>
                            {props.selectedSkipProcess.skid}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className="mb-2">
                        <Grid item xs={4} lg={4}>
                            <Typography>
                                Number of Boxes:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} lg={8}>
                            <Typography style={{ lineBreak: 'anywhere' }}>
                            {props.selectedSkipProcess.boxes}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className="mb-2">
                        <Grid item xs={4} lg={4}>
                            <Typography>
                                Total Weight:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} lg={8}>
                            <Typography style={{ lineBreak: 'anywhere' }}>
                            {props.selectedSkipProcess.revisedWeight}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                
                
                <Grid container>
                    <Grid item xs={12} lg={12}>
                        <Typography variant="body2">
                            Containers
                        </Typography>
                        <div className="nav-split">
                        {
                        containers.map((c, i: number) => (
                            <ul className="skid-row nav-split-ul" key={i}>
                                <li className="nav-split-li">{ c.id }</li>
                                <li style={{ marginLeft: '10px' }} className="nav-split-li skid-block">
                                    <FormGroup row style={{ justifyContent: 'space-between'}} >   
                                        <Tooltip title="Add skid">
                                            <Fab
                                                size="small"
                                                color="primary"
                                                aria-label="add"
                                                className="mr-2 ml-2"
                                                onClick={() => addSkidToShipment(i, ESkidActions.ADD_SKID)}
                                            >
                                                <AddIcon />
                                            </Fab>
                                        </Tooltip>
                                        <TextField
                                            id={`skid${i}`}
                                            variant="outlined"
                                            style={{ width: '60px' }}
                                            disabled={true}
                                            size="small"
                                            value={c.skids}
                                        />
                                        <Tooltip title="Remove skid">
                                            <Fab
                                                size="small"
                                                color="primary"
                                                aria-label="add"
                                                className="mr-2 ml-2"
                                                onClick={() => addSkidToShipment(i, ESkidActions.REMOVE_SKID)}
                                            >
                                                <RemoveIcon />
                                            </Fab>
                                        </Tooltip> 
                                    </FormGroup>
                                </li>
                                <li className="nav-split-li delete">
                                    <Tooltip title="Delete">
                                        <Fab size="small" color="primary" aria-label="add" className="ml-2">
                                            <DeleteIcon />
                                        </Fab>
                                    </Tooltip>
                                </li>
                            </ul>
                            ))
                        }
                        </div>
                        <div className="footerContainer">
                            <Typography variant="body2">
                                Total Skids Remaining: {countRemaining()}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Tooltip title="Add shipment record">
                            <Fab
                                size="small"
                                color="primary"
                                aria-label="add"
                                className="m-2"
                                onClick={() => manageRow(ERowActions.ADD_ROW)}
                            >
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Remove  shipment record">
                            <Fab
                                size="small"
                                color="primary"
                                aria-label="add"
                                className="m-2"
                                onClick={() => manageRow(ERowActions.REMOVE_ROW)}
                            >
                                <RemoveIcon />
                            </Fab>
                        </Tooltip> 
                    </Grid>
                </Grid>
            </div>
            <DialogActions>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className="mr-5"
                    onClick={() => {
                        if (containers.length > 1) {
                            props.updateShipment && props.updateShipment(
                                {
                                    bolId: props.selectedSkipProcess.id,
                                    bolStatus: "0",
                                    containers: containers.length,
                                    deliveryNumber: props.selectedSkipProcess.deliveryNumber,
                                    even: false,
                                    isTrx: false,
                                    orderNumber: props.selectedSkipProcess.orderNumber,
                                    skids: containers.map(r => r.skids),
                                }
                            );
                        } else {
                            props.updateShipment && props.updateShipment(
                                {
                                    bolId: props.selectedSkipProcess.id,
                                    bolStatus: "0",
                                    containers: containers.length,
                                    deliveryNumber: props.selectedSkipProcess.deliveryNumber,
                                    even: false,
                                    isTrx: false,
                                    orderNumber: props.selectedSkipProcess.orderNumber,
                                    skids: props.selectedSkipProcess.skid,
                                }
                            );
                        } 
                    }}
                >
                    UPDATE
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className="mr-5"
                    onClick={() => {
                    }}
                >
                    CLEAR
                </Button>
            </DialogActions>
        </>
    )
}


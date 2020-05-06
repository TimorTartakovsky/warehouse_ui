import React from 'react';
import {
    makeStyles, Theme, Typography, List, ListItem, ListItemText,
} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { IBOLProcessing } from '../../../store/bol/types';
import moment from 'moment';

const DATE_TIME_FORMAT = 'DD/MM HH:mm';
const DATE_TIME_DB = 'YYYY-MM-DD HH:mm:ss';

export interface ISplitShipment {
    selectedSkipProcess: Partial<IBOLProcessing>;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      minWidth: '850px',
      padding: '10px;'
    },
}));

export type TContainer = {
    id: string;
    skids: number;
}

export const SplitShipment = (props: ISplitShipment): React.ReactElement => {
    const classes = useStyles();
    const containerPrefix = 'Shipment #';
    const [containers, setContainers] = React.useState([{
        id: `${containerPrefix}1`,
        skids: props.selectedSkipProcess.skid,
    }]);
    const [remainingSkids, setRemainingSkids] = React.useState(props.selectedSkipProcess.skid);

    const doContainer = () => {
        
    }

    return (
        <div className={classes.root}>
            <Grid container xs={12} lg={6}>
                <Grid container xs={12} justify="space-around" className="mb-2">
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
                <Grid container xs={12} className="mb-4">
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

                <Grid container xs={12} className="mb-2">
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
                <Grid container xs={12} className="mb-2">
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
                <Grid container xs={12} className="mb-4">
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
                
                <Grid container xs={12} className="mb-2">
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
                <Grid container xs={12} className="mb-2">
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
                <Grid container xs={12} className="mb-2">
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
            
            
            <Grid container xs={12} lg={6}>
                <Typography>
                    Containers
                </Typography>
                <List dense={true}>
                    {
                        // containers.map(c => (
                        //     <ListItem>
                        //         <ListItemText
                        //             primary="Single-line item"
                        //             secondary={secondary ? 'Secondary text' : null}
                        //         />
                        //         <ListItemText
                        //             primary="Single-line item"
                        //             secondary={secondary ? 'Secondary text' : null}
                        //         />
                        //         <ListItemSecondaryAction>
                        //             <IconButton edge="end" aria-label="delete">
                        //             <DeleteIcon />
                        //             </IconButton>
                        //         </ListItemSecondaryAction>
                        //     </ListItem>,
                        // ))
                    }
                </List>
            </Grid>
        </div>
    )
}


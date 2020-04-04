import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Dialog, Grid, Button } from '@material-ui/core';
import BOLMonitoring from './Monitoring';
import BOLProcessing from './Processing';
import PageTitle from '../Layout/PageTitle';
import { IconButtonGroup, EIconButtonGroupType } from '../Shared/Buttons';
import Info from '@material-ui/icons/Info';
import Print from '@material-ui/icons/Print';
import Create from '@material-ui/icons/Create';
import Email from '@material-ui/icons/Email';
import Check from '@material-ui/icons/Check';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IBOLMonitoring } from '../../store/bol/types';
import ConfirmationDialog from '../Shared/Dialog/Confirmational';
import * as bolActions from '../../actions/bol.action';
 
export enum EBOLTypes {
    BOLProcessing = 'BOLProcessing',
    BOLMonitoring = 'BOLMonitoring',
}

export interface IBOL {
    type?: EBOLTypes;
}

export enum BOLMonitoringBtnType {
    detail = 'detail',
    printDocs = 'printDocs',
    recall = 'recall',
    resend = 'resend',
}

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

type MonitoringButtonsGroupState = {
    [BOLMonitoringBtnType.detail]: boolean,
    [BOLMonitoringBtnType.printDocs]: boolean,
    [BOLMonitoringBtnType.recall]: boolean,
    [BOLMonitoringBtnType.resend]: boolean,
}

const defaultProcessingButtonsGroupState: ProcessingButtonsGroupState = {
    [BOLProcessingBtnType.process]: true,
    [BOLProcessingBtnType.shipConfirm]: true,
    [BOLProcessingBtnType.delete]: true,
}

const defaultMonitoringButtonsGroupState: MonitoringButtonsGroupState = {
    [BOLMonitoringBtnType.detail]: true,
    [BOLMonitoringBtnType.printDocs]: false,
    [BOLMonitoringBtnType.recall]: true,
    [BOLMonitoringBtnType.resend]: true,
}

const BOL = (props: IBOL): React.ReactElement => {

    const [btnMonitoringGroupStatus, setBtnMonitoringGroupStatus] = useState(defaultMonitoringButtonsGroupState);
    const [btnProcessingGroupStatus, setBtnProcessingGroupStatus] = useState(defaultProcessingButtonsGroupState)
    const [selectedMonitoring, setSelectedMonitoring] = useState({
        orderNumbers: [''],
        bolWorkIds: [0],
        carrier: '',
        taskId: 0,
        bolNumbers: '',
        locationId: 0,
    });
    const [isOpen, setOpen] = useState(false);
    const [isOpenDialog, setOpenDialog] = useState(false);
    const [agreedCB, setAgreedCB] = useState({})
    const [confirmBodyText, setConfirmBodyText] = useState('');
    const [confirmHeaderText, setConfirmHeaderText] = useState('');
    const [monitoringStatus, setMonitoringStatus] = useState(0);


    const dispatch = useDispatch();

    const handleMonitoringRecall = (): void => {
        if (selectedMonitoring && !isOpen) {
            setOpen(true);
        }
    }

    const handleMonitoringEvents = (e: any, type: string) => {
        switch (type) {
            case BOLMonitoringBtnType.detail:
                break;
            case BOLMonitoringBtnType.printDocs:
                break;
            case BOLMonitoringBtnType.recall:
                setAgreedCB(() => {
                    setOpen(false);
                    dispatch(bolActions.bolMonitoringRecallRequest({
                        orderNumbers: selectedMonitoring.orderNumbers,
                        bolWorkIds: selectedMonitoring.bolWorkIds,
                        carrier: selectedMonitoring.carrier,
                        locationId: selectedMonitoring.locationId,
                        status: monitoringStatus,
                        taskId: selectedMonitoring.taskId,
                        bolNumbers: selectedMonitoring.bolNumbers,
                    }))
                });
                setConfirmHeaderText('Recall Message');
                setConfirmBodyText('Are You sure you want to Recall this shipment?');
                handleMonitoringRecall();
                break;
            case BOLMonitoringBtnType.resend:
                break;
        }
    }

    const onProcessingSelected = (
        processing: any,
        selected: string[],
        pk: string
    ) => {
        if (processing) {
            setOpenDialog(true);
        }
    }

    const onMonitoringSelectedItem = (
        monitoring: IBOLMonitoring | null,
        selected: string[],
        pk: string,
        locationId: number
    ): void => {
        if (monitoring) {
            const { orderNumbers = [''], carrier, bolIds = [0], bolStatus, taskId, bolNumber } = monitoring;
            setMonitoringStatus(bolStatus);
            setSelectedMonitoring({
                orderNumbers: orderNumbers,
                bolWorkIds: bolIds,
                carrier: carrier,
                locationId,
                taskId,
                bolNumbers: bolNumber,
            });
            setBtnMonitoringGroupStatus({
                [BOLMonitoringBtnType.detail]: false,
                [BOLMonitoringBtnType.printDocs]: false,
                [BOLMonitoringBtnType.recall]: false,
                [BOLMonitoringBtnType.resend]: true,
            })
        }
    }

    return (
        <>
            {
                props.type === EBOLTypes.BOLMonitoring ? (
                    <PageTitle
                        titleHeading="Monitoring Table"
                        titleDescription="The buttons listed are tools to manage monitoring."
                        customComponent={
                            <IconButtonGroup 
                                id="BOL_monitoring_page_buttons"
                                type={EIconButtonGroupType.horizontal}
                                buttons={[
                                    {
                                        btnType: BOLMonitoringBtnType.detail,
                                        icon: (<Info />),
                                        text: 'Detail',
                                        isDisabled: btnMonitoringGroupStatus.detail,
                                        onButtonClicked: (e: any, btnType: string): void => {
                                            handleMonitoringEvents(e, btnType);
                                        }
                                    },
                                    {
                                        btnType: BOLMonitoringBtnType.printDocs,
                                        icon: (<Print/>),
                                        text: 'Print Docs',
                                        isDisabled: btnMonitoringGroupStatus.printDocs,
                                        onButtonClicked: (e: any, btnType: string): void => {
                                            handleMonitoringEvents(e, btnType);
                                        }
                                    },
                                    {
                                        btnType: BOLMonitoringBtnType.recall,
                                        icon: (<Create />),
                                        text: 'Recall',
                                        isDisabled: btnMonitoringGroupStatus.recall,
                                        onButtonClicked: (e: any, btnType: string): void => {
                                            handleMonitoringEvents(e, btnType);
                                        }
                                    },
                                    {
                                        btnType: BOLMonitoringBtnType.resend,
                                        icon: (<Email />),
                                        text: 'Resend',
                                        isDisabled: btnMonitoringGroupStatus.resend,
                                        onButtonClicked: (e: any, btnType: string): void => {
                                            handleMonitoringEvents(e, btnType);
                                        }
                                    }
                                ]}
                            />
                        }
                    />
                ) : (
                    <PageTitle
                        titleHeading="Processing Table"
                        titleDescription="The buttons listed are tools to manage processing."
                        customComponent={
                            <IconButtonGroup 
                                id="BOL_monitoring_page_buttons"
                                type={EIconButtonGroupType.horizontal}
                                buttons={[
                                    {
                                        btnType: BOLProcessingBtnType.process,
                                        icon: (<Check />),
                                        text: 'Process BOL',
                                        isDisabled: btnProcessingGroupStatus.process,
                                        onButtonClicked: (e: any, btnType: string): void => {
                                            handleMonitoringEvents(e, btnType);
                                        }
                                    },
                                    {
                                        btnType: BOLProcessingBtnType.shipConfirm,
                                        icon: (<AddShoppingCartIcon/>),
                                        text: 'Ship Confirm BOL /W/O BOL',
                                        isDisabled: btnProcessingGroupStatus.shipConfirm,
                                        onButtonClicked: (e: any, btnType: string): void => {
                                            handleMonitoringEvents(e, btnType);
                                        }
                                    },
                                    {
                                        btnType: BOLProcessingBtnType.delete,
                                        icon: (<HighlightOffIcon />),
                                        text: 'Delete BOL Info',
                                        isDisabled: btnProcessingGroupStatus.delete,
                                        onButtonClicked: (e: any, btnType: string): void => {
                                            handleMonitoringEvents(e, btnType);
                                        }
                                    }
                                ]}
                            />
                        }
                    />
                )
            }
            <Card className="card-box mb-4-spacing overflow-visible">
                <div className="card-header">
                    <div className="card-header--title font-size-md font-weight-bold py-2">
                    </div>
                </div>
                <CardContent className="p-3">
                    {
                        props.type === EBOLTypes.BOLMonitoring ? (<BOLMonitoring onSelectedValue={onMonitoringSelectedItem} />) : null
                    }
                    {
                        props.type === EBOLTypes.BOLProcessing ? (<BOLProcessing onSelected={onProcessingSelected} />) : null
                    }
                </CardContent>
            </Card>
            {
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
            }
            {
                isOpenDialog ? (
                    <Dialog scroll="body" maxWidth="lg" open={isOpenDialog} onClose={() => console.log('closed')}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} lg={12}>
                                <div className="hero-wrapper bg-composed-wrapper bg-grow-early h-100 rounded-left">
                                    <div className="flex-grow-1 w-100 d-flex align-items-center">
                                        <div className="bg-composed-wrapper--content text-center p-5">
                                            <div className="text-white">
                                                <h1 className="display-3 my-3 font-weight-bold">
                                                    Wonderful serenity has possession
                                                </h1>
                                                <p className="font-size-lg mb-0 text-white-50">
                                                    A free hour, when our power of choice is untrammelled and when nothing prevents.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hero-footer pb-4">
                                        <Button color="primary" variant="contained" size="large" className="px-4">
                                            <span className="btn-wrapper--label">
                                               Select
                                            </span>
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            size="large"
                                            className="px-4"
                                            onClick={() => setOpenDialog(false)}
                                        >
                                            <span className="btn-wrapper--label">
                                               Cancel
                                            </span>
                                        </Button>
                                        <Button color="primary" variant="contained" size="large" className="px-4">
                                            <span className="btn-wrapper--label">
                                               Other Location
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Dialog>
                ) : null
            }
        </>
    );
}

export default BOL;



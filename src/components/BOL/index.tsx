import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from '@material-ui/core';
import BOLMonitoring from './Monitoring';
import BOLProcessing from './Processing';
import PageTitle from '../Layout/PageTitle';
import { IconButtonGroup, EIconButtonGroupType } from '../Shared/Buttons';
import Info from '@material-ui/icons/Info';
import Print from '@material-ui/icons/Print';
import Create from '@material-ui/icons/Create';
import Email from '@material-ui/icons/Email';
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

type MonitoringButtonsGroupState = {
    [BOLMonitoringBtnType.detail]: boolean,
    [BOLMonitoringBtnType.printDocs]: boolean,
    [BOLMonitoringBtnType.recall]: boolean,
    [BOLMonitoringBtnType.resend]: boolean,
}

const defaultMonitoringButtonsGroupState: MonitoringButtonsGroupState = {
    [BOLMonitoringBtnType.detail]: true,
    [BOLMonitoringBtnType.printDocs]: false,
    [BOLMonitoringBtnType.recall]: true,
    [BOLMonitoringBtnType.resend]: true,
}

const BOL = (props: IBOL): React.ReactElement => {

    const [btnMonitoringGroupStatus, setBtnMonitoringGroupStatus] = useState(defaultMonitoringButtonsGroupState);
    const [selectedMonitoring, setSelectedMonitoring] = useState({
        orderNumbers: [''],
        bolWorkIds: [0],
        carrier: '',
        taskId: 0,
        bolNumbers: '',
        locationId: 0,
    });
    const [isOpen, setOpen] = useState(false);
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

    const handleMonitoringEvents = (e: any, type: string): void => {
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
                ) : null 
            }
            <Card className="card-box mb-4-spacing overflow-visible">
                {/* <CardContent className="p-3"> */}
                    {
                        props.type === EBOLTypes.BOLMonitoring ? (<BOLMonitoring onSelectedValue={onMonitoringSelectedItem} />) : null
                    }
                    {
                        props.type === EBOLTypes.BOLProcessing ? (<BOLProcessing />) : null
                    }
                {/* </CardContent> */}
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
        </>
    );
}

export default BOL;



import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from '@material-ui/core';
import BOLMonitoring from './Monitoring';
import BOLProcessing from './Processing';
 
export enum EBOLTypes {
    BOLProcessing = 'BOLProcessing',
    BOLMonitoring = 'BOLMonitoring',
}

export interface IBOL {
    type?: EBOLTypes;
}

const BOL = (props: IBOL): React.ReactElement => {
    const [selectedMonitoring, setSelectedMonitoring] = useState({
        orderNumbers: [''],
        bolWorkIds: [0],
        carrier: '',
        taskId: 0,
        bolNumbers: '',
        locationId: 0,
    });
    const [isOpen, setOpen] = useState(false);
    // const [agreedCB, setAgreedCB] = useState({})
    // const [confirmBodyText, setConfirmBodyText] = useState('');
    // const [confirmHeaderText, setConfirmHeaderText] = useState('');
    // const [monitoringStatus, setMonitoringStatus] = useState(0);


    const dispatch = useDispatch();

    const handleMonitoringRecall = (): void => {
        if (selectedMonitoring && !isOpen) {
            setOpen(true);
        }
    }

    // const handleMonitoringEvents = (e: any, type: string): void => {
    //     switch (type) {
    //         case BOLMonitoringBtnType.detail:
    //             break;
    //         case BOLMonitoringBtnType.printDocs:
    //             break;
    //         case BOLMonitoringBtnType.recall:
    //             setAgreedCB(() => {
    //                 setOpen(false);
    //                 dispatch(bolActions.bolMonitoringRecallRequest({
    //                     orderNumbers: selectedMonitoring.orderNumbers,
    //                     bolWorkIds: selectedMonitoring.bolWorkIds,
    //                     carrier: selectedMonitoring.carrier,
    //                     locationId: selectedMonitoring.locationId,
    //                     status: monitoringStatus,
    //                     taskId: selectedMonitoring.taskId,
    //                     bolNumbers: selectedMonitoring.bolNumbers,
    //                 }))
    //             });
    //             setConfirmHeaderText('Recall Message');
    //             setConfirmBodyText('Are You sure you want to Recall this shipment?');
    //             handleMonitoringRecall();
    //             break;
    //         case BOLMonitoringBtnType.resend:
    //             break;
    //     }
    // }

    // const onMonitoringSelectedItem = (
    //     monitoring: IBOLMonitoring | null,
    //     selected: string[],
    //     pk: string,
    //     locationId: number
    // ): void => {
    //     if (monitoring) {
    //         const { orderNumbers = [''], carrier, bolIds = [0], bolStatus, taskId, bolNumber } = monitoring;
    //         setMonitoringStatus(bolStatus);
    //         setSelectedMonitoring({
    //             orderNumbers: orderNumbers,
    //             bolWorkIds: bolIds,
    //             carrier: carrier,
    //             locationId,
    //             taskId,
    //             bolNumbers: bolNumber,
    //         });
    //         // setBtnMonitoringGroupStatus({
    //         //     [BOLMonitoringBtnType.detail]: false,
    //         //     [BOLMonitoringBtnType.printDocs]: false,
    //         //     [BOLMonitoringBtnType.recall]: false,
    //         //     [BOLMonitoringBtnType.resend]: true,
    //         // })
    //     }
    // }

    return (
        <>
            <Card className="card-box mb-4-spacing overflow-visible">
                {
                    props.type === EBOLTypes.BOLMonitoring ? (<BOLMonitoring />) : null
                }
                {
                    props.type === EBOLTypes.BOLProcessing ? (<BOLProcessing />) : null
                }
            </Card>
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
        </>
    );
}

export default BOL;



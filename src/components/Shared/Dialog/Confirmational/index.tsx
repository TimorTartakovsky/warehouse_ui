import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Button } from '@material-ui/core';

export interface IConfirmationDialog {
    isOpen: boolean;
    headerText?: string;
    body?: React.ReactElement;
    bodyText?: string;
    setOpen: (p: boolean) => void;
    footerActions: {
        close: () => void;
        closeText?: string;
        agreed: () => void;
        agreedText?: string;
    };
}

const ConfirmationDialog = (props: IConfirmationDialog) => {
    const {isOpen, setOpen } = props;
    return (
        <Dialog
            open={isOpen}
            onClose={() => props.footerActions && props.footerActions.close() }>
        <div className="text-center p-5">
            <div className="avatar-icon-wrapper rounded-circle m-0">
                <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-warning text-white m-0 d-130">
                    <FontAwesomeIcon icon={['far', 'dot-circle']} className="d-flex align-self-center display-3"/>
                </div>
            </div>
            <div className="font-weight-bold font-size-lg mt-4">
                { props.headerText }
            </div>
            <div className="font-weight-bold font-size-lg mt-4">
                { props.bodyText || props.body }
            </div>
            <div className="pt-4">
                <Button onClick={() => setOpen(false)} variant="outlined" color="primary" className="mx-1">
                    <span className="btn-wrapper--label">
                        { props.footerActions.closeText || 'CANCEL' }
                    </span>
                </Button>
                <Button onClick={() => {
                    setOpen(false);
                    props.footerActions.agreed && props.footerActions.agreed();
                }} variant="outlined" color="primary" className="mx-1">
                    <span className="btn-wrapper--label">
                        { props.footerActions.agreedText || 'OK' }
                    </span>
                </Button>
            </div>
        </div>
    </Dialog>
    )
}

export default ConfirmationDialog;


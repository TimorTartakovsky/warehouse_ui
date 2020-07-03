import React from 'react';
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
    return (
        <Card className="card-box mb-4-spacing overflow-visible">
            {
                props.type === EBOLTypes.BOLMonitoring ? (<BOLMonitoring />) : null
            }
            {
                props.type === EBOLTypes.BOLProcessing ? (<BOLProcessing />) : null
            }
        </Card>
    );
}

export default BOL;



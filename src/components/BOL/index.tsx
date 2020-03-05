import React from 'react';
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
    if (!props.type) {
        return <div />;
    }
    return (
        <>
            {
                props.type === EBOLTypes.BOLMonitoring ? (<BOLMonitoring />) : null
            }
            {
                props.type === EBOLTypes.BOLProcessing ? (<BOLProcessing />) : null
            }
        </>
    )

}

export default BOL;



import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import BOLMonitoring from './Monitoring';
import BOLProcessing from './Processing';
import PageTitle from '../Layout/PageTitle';
 
export enum EBOLTypes {
    BOLProcessing = 'BOLProcessing',
    BOLMonitoring = 'BOLMonitoring',
}

export interface IBOL {
    type?: EBOLTypes;
}

const BOL = (props: IBOL): React.ReactElement => {
    return (
        <>
            {
                props.type === EBOLTypes.BOLMonitoring ? (
                    <PageTitle
                        titleHeading="Monitoring Table"
                        titleDescription="The buttons listed are tools to manage monitoring."
                    />
                ) : (
                    <PageTitle
                        titleHeading="Processing Table"
                        titleDescription="The buttons listed are tools to manage processing."
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
                        props.type === EBOLTypes.BOLMonitoring ? (<BOLMonitoring />) : null
                    }
                    {
                        props.type === EBOLTypes.BOLProcessing ? (<BOLProcessing />) : null
                    }
                </CardContent>
            </Card>
        </>
    );
}

export default BOL;



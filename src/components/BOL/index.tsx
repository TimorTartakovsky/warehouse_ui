import React, { Dispatch } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { BOL_ACTIONS, IActionPayload } from '../../actions'
import { IRootState } from '../../store';
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
    console.log(props)
    return (
        <Card className="card-box mb-4-spacing overflow-visible">
            <div className="card-header">
                <div className="card-header--title font-size-md font-weight-bold py-2">
                {
                    props.type === EBOLTypes.BOLMonitoring ? 'BOL Monitoring' : null
                }
                {
                    props.type === EBOLTypes.BOLProcessing ? 'BOL Processing' : null
                }
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
    );
}

const mapStateToProps = (state: IRootState) => ({
    locationId: state.user.locationId,
    // branchId: state.user.location.mo
})

const mapDispatchToProps = (dispatch: Dispatch<IActionPayload>) => ({

})

export default BOL;



import React from 'react';
import {
    TableBody,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    IconButton,
    Paper
  } from '@material-ui/core';

export interface IBOLMonitoring {
}

const BOLMonitoring = (props: IBOLMonitoring): React.ReactElement => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="custom pagination table">
                <TableBody>
                    Monitoring
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default BOLMonitoring;



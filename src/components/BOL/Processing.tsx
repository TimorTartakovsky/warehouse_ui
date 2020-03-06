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

export interface IBOLProcessing {
}

const BOLProcessing = (props: IBOLProcessing): React.ReactElement => {
    
    return (
        <TableContainer component={Paper}>
            <Table aria-label="custom pagination table">
                <TableBody>
                    Processing
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default BOLProcessing;


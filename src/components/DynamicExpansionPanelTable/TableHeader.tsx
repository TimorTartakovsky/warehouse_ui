import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export enum ETableHeaderOrder {
    asc = 'asc',
    desc = 'desc',
}

export interface ITableHeader {
    classes: any;
    numSelected: number;
    onRequestSort: (event: any, property: string) => void;
    onSelectAllClick: (event: any) => void;
    order: ETableHeaderOrder;
    orderBy: string;
    rowCount: number;
    headCells: any[];
    isCheckbox?: boolean;
}

const TableHeader = (props: ITableHeader) => {
    const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
      headCells,
      isCheckbox
    } = props;
  
    const createSortHandler = (property: string) => (event: any) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            {
              isCheckbox ? (
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                />) : null
            }
          </TableCell>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}>
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  export default TableHeader;
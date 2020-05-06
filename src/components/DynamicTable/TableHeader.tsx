import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export enum ETableHeaderOrder {
    asc = 'asc',
    desc = 'desc',
}

export interface ITableHeader {
    classes: any;
    numSelected: number;
    isMultiSelectable?: boolean;
    onRequestSort: (event: any, property: string) => void;
    onSelectAllClick: (event: any) => void;
    order: ETableHeaderOrder;
    orderBy: string;
    rowCount: number;
    headCells: any[];
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
      headCells
    } = props;
  
    const createSortHandler = (property: string) => (event: any) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          {headCells.map((headCell: any, i: number) => (
            <>
              <TableCell
                key={i}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  style={{
                    height: '60px',
                    minWidth: '100%',
                    justifyContent: 'center',
                  }}
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  { headCell.label }
                </TableSortLabel>
              </TableCell>
            </>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  export default TableHeader;
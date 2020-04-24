import React from 'react';
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Checkbox,
  TablePagination,
  FormControl,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableHeader, { ETableHeaderOrder } from './TableHeader';
import { IBOLMonitoring } from '../../store/bol/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const descendingComparator = (a: any, b: any, orderBy: string) => {
  if (b[orderBy] && b[orderBy].source < a[orderBy] && a[orderBy].source) {
    return -1;
  }
  if (b[orderBy] && b[orderBy].source > a[orderBy] && a[orderBy].source) {
    return 1;
  }
  return 0;
}
 
const getComparator = (order: ETableHeaderOrder, orderBy: string) =>  {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}
        
const stableSort = (array: Array<any>, comparator: (a:any, b: any) => number) =>  {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
  },
  table: {
      heigh: '100%',
  },
}));

export interface IHeaderCellType {
    id: string;
    numeric: boolean;
    disablePadding: boolean;
    label: string;
    isFilter?: boolean;
    filterCB?: (id: string, value: string) => void;
}
export interface IDynamicTable {
   onSelectedCallBack?: (monitoring: IBOLMonitoring, selected: string[], pk: string) => void;
   rows: any[];
   headers: IHeaderCellType[];
   headerProperty: string;
   isMultiSelectable?: boolean;
   isSelectionRestricted?: (monitoring: IBOLMonitoring, selected: string[], pk: string) => boolean;
}

const doTableItemsList = (len: number): number[] => {
  if (len < 10) {
    return [10];
  } else if (len < 50) {
    return [10, len];
  } else if (len < 100) {
    return [10, 50, len];
  } else if (len < 200) {
    return [10, 50, 100, len];
  } else {
    return [10, 50, 100, 200];
  }
}

const DynamicTable = (props: IDynamicTable) => {
  const classes = useStyles();
  const rows = props.rows;
  const [order, setOrder] = React.useState(ETableHeaderOrder.asc);
  const [orderBy, setOrderBy] = React.useState('calories');
  const defaultSelected: string[] = [];
  const [selected, setSelected] = React.useState(defaultSelected);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === ETableHeaderOrder.asc;
    setOrder(isAsc ? ETableHeaderOrder.desc : ETableHeaderOrder.asc);
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const selectedColumns = rows.map((n: any) => n[props.headerProperty]) || [''];
      setSelected(selectedColumns);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: string) => {
    if (props.isMultiSelectable) {
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    } else {
      setSelected([name]);
    }
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
        <TableContainer style={{ maxHeight: '60vh' }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHeader
              classes={classes}
              isMultiSelectable={props.isMultiSelectable}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={props.headers}
            />
            <TableBody>
              {
                stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  const isItemSelected = isSelected(row[props.headerProperty]);
                  const labelId = 'enhanced-table-checkbox';

                  return (
                    <>
                      <TableRow
                        hover
                        onClick={event => {
                          if (props.isSelectionRestricted && props.isSelectionRestricted(row, selected, props.headerProperty)) {
                            return;
                          }
                          handleClick(event, row[props.headerProperty]);
                          props.onSelectedCallBack && props.onSelectedCallBack(row, selected, props.headerProperty);
                        }}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        draggable="true"
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell
                          key={`checkbox-${index}`}
                          padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        {
                          <>
                              {
                                  Object.keys(row)
                                  .filter((k: string) => k !== props.headerProperty)
                                  .map(
                                      (k: string, i: number) => {
                                          const copyRow: any = row;
                                          const rowItem = copyRow[k];
                                          return (
                                          <TableCell
                                              key={`inner-cell-${i}--${index}`}
                                              component="th"
                                              align="center"
                                              id={labelId}
                                          >
                                            {rowItem.value}
                                          </TableCell>
                                          )
                                      }
                                  )
                              }
                          </>
                        }
                    </TableRow>
                    {
                      row.remarks ? (
                        <TableRow>
                          <TableCell
                            key={`info-cell-${index}`}
                            colSpan={9}
                          >
                            <Typography>
                              Remarks: {row.remarks && row.remarks.source}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : null
                    }
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (33 * emptyRows) }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={doTableItemsList(rows.length)}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </div>
  );
}

export default DynamicTable;
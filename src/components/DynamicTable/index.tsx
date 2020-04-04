import React from 'react';
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
} from '@material-ui/core';
// import { AutoSizer, Column, Table, TableCellRenderer, TableHeaderProps } from 'react-virtualized';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TableHeader, { ETableHeaderOrder } from './TableHeader';
import TableToolbar from './TableHeaderToolbar';
import { IBOLMonitoring } from '../../store/bol/types';

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
        overflowX: 'auto',
        overflowY: 'auto'
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
}
export interface IDynamicTable {
   onSelectedCallBack?: (monitoring: IBOLMonitoring, selected: string[], pk: string) => void;
   rows: any[];
   headers: IHeaderCellType[];
   headerProperty: string;
   isMultiSelectable?: boolean;
   isSelectionRestricted?: (monitoring: IBOLMonitoring, selected: string[], pk: string) => boolean;
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
      <Paper className={classes.paper}>
        {
          props.isMultiSelectable ? (
            <TableToolbar numSelected={selected.length} />
          ) : null
        }
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
                      tabIndex={-1}
                      draggable="true"
                      title={row.remarks || ''}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
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
                                    (k: string, index: number) => {
                                        const copyRow: any = row;
                                        const rowItem = copyRow[k];
                                        return (
                                        <TableCell
                                            key={index}
                                            component="th"
                                            id={labelId}
                                            size="medium"
                                            padding="checkbox"
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
          rowsPerPageOptions={[10, 50, 100, 200]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default DynamicTable;
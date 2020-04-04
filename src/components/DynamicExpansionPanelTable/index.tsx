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
import { makeStyles } from '@material-ui/core/styles';
import TableHeader, { ETableHeaderOrder } from './TableHeader';
import TableToolbar from './TableHeaderToolbar';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

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
   rows: any[];
   headers: IHeaderCellType[];
   headerProperty: string;
   isMultiSelectable?: boolean;
   isToolbarShown?: boolean;
   setRows: (rows: any[]) => void;
}

const DynamicExpansionPanelTable = (props: IDynamicTable) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState(ETableHeaderOrder.asc);
  const [orderBy, setOrderBy] = React.useState('calories');
  const defaultSelected: string[] = [];
  const [selected, setSelected] = React.useState(defaultSelected);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === ETableHeaderOrder.asc;
    setOrder(isAsc ? ETableHeaderOrder.desc : ETableHeaderOrder.asc);
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const selectedColumns = props.rows.map((n: any) => n[props.headerProperty]) || [''];
      setSelected(selectedColumns);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: string): void => {
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
      const indexOfPrevElement = props.rows.findIndex(r => r.id === selected[0]);
      if (indexOfPrevElement !== -1) {
        hideRow(indexOfPrevElement, true);
      }
      const indexOfElement = props.rows.findIndex(r => r.id === name);
      setSelected([name]);
      showRow(indexOfElement);
    }
  };

  const handleClickExpand = (event: any, name: string): void => {
    
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const hideRow = (index: number, flag?: boolean) => {
    if (!Array.isArray(props.rows) || !props.rows[index]) {
      return;
    }
    if (!flag && selected[0] === props.rows[index].id) {
      return;
    }
    Object.keys(props.rows[index]).filter(f=> f !== 'id').forEach(k => {
      props.rows[index][k].isFocused = false;
    });
    props.setRows([...props.rows]);
  }

  const showRow = (index: number) => {  
    console.log(index);  
    console.log(props.rows);  
    if (!Array.isArray(props.rows) || !props.rows[index]) {
      return;
    }
    Object.keys(props.rows[index]).filter(f=> f !== 'id').forEach(k => {
      props.rows[index][k].isFocused = true;
    });
    props.setRows([...props.rows]);
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        { props.isToolbarShown ? (<TableToolbar numSelected={selected.length} />) : null}
        <TableContainer style={{ maxHeight: '50vh' }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHeader
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
              headCells={props.headers}
            />
            <TableBody>
              {
                stableSort(props.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  const isItemSelected = isSelected(row[props.headerProperty]);
                  const labelId = 'enhanced-table-checkbox';

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClickExpand(event, row[props.headerProperty])}
                      role="radio"
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
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          onClick={event => handleClick(event, row[props.headerProperty])}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {
                         <>
                            {
                                Object.keys(row).filter(f=> f !== 'id').map(
                                    (k: string, innerIndex: number) => {
                                        const copyRow: any = row;
                                        const value = copyRow[k];
                                        return (
                                        <TableCell
                                            key={innerIndex}
                                            component="th"
                                            id={labelId}
                                            onMouseOver={event => showRow(index)}
                                            onMouseOut={event => hideRow(index)}
                                            size="medium"
                                            padding="checkbox"
                                        >
                                          {
                                            value.value1
                                          }
                                          {
                                            value.isFocused ? value.value2 : null
                                          }
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
          rowsPerPageOptions={[25, 50, 100, 200]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default DynamicExpansionPanelTable;
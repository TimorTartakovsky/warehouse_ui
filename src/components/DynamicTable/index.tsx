import React from 'react';
import {
  TableBody,
  Table,
  Switch,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
  Toolbar,
  IconButton,
  Paper,
  Typography,
  Checkbox,
  Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import TablePagination from '@material-ui/icons/FilterList';
// import { lighten } from '@material-ui/core/styles';
import TableHeader, { ETableHeaderOrder } from './TableHeader';
import TableToolbar from './TableHeaderToolbar';

// const rows: IBOLProcessingCellData[] = [
//     {
//         orderNumber: 'TRCG0089',
//         deliveryNumber: 'TRCG0089',
//         pilot: '',
//         proNumber: 'NA',
//         carrier: 'Not selected',
//         freightTerms:'Prepaid (Genera Pay)',
//         freightCharges:'',
//         customerName: 'EXPRESS BODY PARTS',
//         shipToCity:'N. HOLLYWOOD',
//         shipToState: 'CA',
//         boxes: 175,
//         skid: 1,
//         originalWeight: 228,
//     },
//     {
//         orderNumber: 'TRCG0088',
//         deliveryNumber: 'TRCG0088',
//         pilot: '',
//         proNumber: 'NA',
//         carrier: 'Not selected',
//         freightTerms:'Prepaid (Genera Pay)',
//         freightCharges:'',
//         customerName: 'EXPRESS BODY PARTS',
//         shipToCity:'N. HOLLYWOOD',
//         shipToState: 'CA',
//         boxes: 175,
//         skid: 1,
//         originalWeight: 228,
//     },
// ];

// function descendingComparator(a, b, orderBy) {
    //   if (b[orderBy] < a[orderBy]) {
        //     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
    //     return 1;
    //   }
    //   return 0;
    // }
    
    // function getComparator(order, orderBy) {
        //   return order === 'desc'
        //     ? (a, b) => descendingComparator(a, b, orderBy)
        //     : (a, b) => -descendingComparator(a, b, orderBy);
        // }
        
        // function stableSort(array, comparator) {
            //   const stabilizedThis = array.map((el, index) => [el, index]);
            //   stabilizedThis.sort((a, b) => {
                //     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map(el => el[0]);
// }


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    paper: {
        width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
      minWidth: 750
    },
  visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
}
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
}

const DynamicTable = (props: IDynamicTable) => {
  const classes = useStyles();
  const rows = props.rows;
  const [order, setOrder] = React.useState(ETableHeaderOrder.asc);
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState(['']);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
  };

//   const handleChangePage = (event:, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = event => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = event => {
//     setDense(event.target.checked);
//   };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table">
            <TableHeader
              classes={classes}
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
                // stableSort(rows, getComparator(order, orderBy))
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index: number) => {
                  const isItemSelected = isSelected(row[props.headerProperty]);
                  const labelId = 'enhanced-table-checkbox';

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row[props.headerProperty])}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.orderNumber}
                      selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {
                         <>
                            {
                                Object.keys(row).map(
                                    (k: string) => {
                                        const copyRow: any = row;
                                        const value = copyRow[k];
                                        return (
                                        <TableCell
                                            key={k}
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {value}
                                        </TableCell>
                                        )
                                    }
                                )
                            }
                            <TableCell
                                key={index}
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                            >
                                Actions
                            </TableCell>
                         </>
                      }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}

export default DynamicTable;
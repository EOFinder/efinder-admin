import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { getAllTransaction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import DetailTrans from './ModalTrans';
// import Payment from "./ModalPayment"
import Payment from "./DialogPayment";
import { blue } from "@material-ui/core/colors";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Button from "@material-ui/core/Button";



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'nama_acara', numeric: false, disablePadding: false, label: 'Event Name' },
  { id: 'tanggal_acara', numeric: false, disablePadding: false, label: 'Event Date' },
  { id: 'status_transaksi', numeric: false, disablePadding: false, label: 'Event Status' },
  { id: 'status_speaker', numeric: false, disablePadding: false, label: 'Speaker Action' },
  { id: 'payment', numeric: false, disablePadding: false, label: 'Pay To Speaker' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.tablehead}>
      <TableRow>
        <TableCell >
          No
        </TableCell>
        {headCells.map((headCell) => (

          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
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

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};





const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    boxShadow: '0 0.7rem 1rem rgba(111, 115, 184, 0.8) !important',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tablecell: {
    whiteSpace: 'nowrap',
  },
  tablehead: {
    whiteSpace: 'nowrap',
    backgroundColor: '#3a6986',
      '& th, & a,': {
        color: 'white',
        fontSize: '18px',
    },
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
    width: 1,
  },
  button: {
    margin: theme.spacing(1),
},
}));

export default function Audience() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('tanggal_acara');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const dispatch = useDispatch();
    const allTransaction = useSelector((state) => state.transaction.allTransaction);

    useEffect(() => {
        dispatch(getAllTransaction());
    }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={allTransaction.length}
            />
            <TableBody>
              {stableSort(allTransaction, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (

                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row._id}
                    >
                      <TableCell>
                        {index+1}
                      </TableCell>
                      <TableCell align="left" className={classes.tablecell}  >
                         <DetailTrans id={row._id}/>
                          {row.nama_acara}
                      </TableCell>
                      <TableCell align="left">{row.speakerID.name}</TableCell>
                      <TableCell align="left">{moment(row.tanggal_acara).format('LL') + ', Pukul ' + row.waktu_acara}</TableCell>
                      <TableCell align="left">{row.status_transaksi}</TableCell>
                      <TableCell align="left">{row.status_speaker}</TableCell>
                      <TableCell align="left">{row.status_audience}</TableCell>
                      <TableCell align="left" >
                      {(row.status_speaker==='SELESAI' && row.status_audience==='SELESAI' && row.status_transaksi !== 'PAID BY ADMIN') &&
                        <Payment id={row._id}/>
                      }
                      {(row.status_speaker==='PENDING' || row.status_audience==='PENDING') &&
                        <Button
                            disabled
                            color="primary"
                            variant="contained"
                            style={{ color: blue[500] }}
                          >
                            <AttachFileIcon />
                        </Button>
                      }
                      {(row.status_transaksi==='PAID BY ADMIN') &&
                        <Button
                            disabled
                            color="primary"
                            variant="contained"
                            style={{ color: blue[500] }}
                          >
                            PAID
                        </Button>
                      }
                      </TableCell>
                    </TableRow>
                  );
                })}
             
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allTransaction.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
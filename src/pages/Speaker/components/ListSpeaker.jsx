import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { getActiveSpeaker, updateStatusSpeaker } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import RejectedIcon from "@material-ui/icons/Clear";
import { Box } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";



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
  { id: 'image', numeric: false, disablePadding: true, label: 'Avatar' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Expertation' },
  { id: 'fee', numeric: true, disablePadding: false, label: 'Fee' },
  // { id: 'rating', numeric: true, disablePadding: false, label: 'Rating' },
  { id: "cv", numeric: true, disablePadding: false, label: "Portfolio" },
  { id: '_id', numeric: true, disablePadding: false, label: 'Suspend' },
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
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tablehead: {
    backgroundColor: '#5c84a6',
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
}));

export default function ListSpeaker() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const dispatch = useDispatch();
    const activeSpeakers = useSelector((state) => state.speaker.activeSpeaker);
    console.log(activeSpeakers)

    useEffect(() => {
        dispatch(getActiveSpeaker(), updateStatusSpeaker());
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
              rowCount={activeSpeakers.length}
            />
            <TableBody>
              {stableSort(activeSpeakers, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.role}
                    >
                      <TableCell >
                        {index+1}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Avatar alt="Remy Sharp" src={row.image} />
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.category}</TableCell>
                      <TableCell align="right">{row.fee}</TableCell>
                      {/* <TableCell align="right">{row.rating}</TableCell> */}
                      <TableCell align="right">
                        <Button
                            variant="outlined"
                            style={{ color: 'blue' }}
                            href={row.cv}
                            target="_blank"
                            size="small"
                          >
                            <AttachFileIcon />Check CV
                          </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.button}
                                size="small"
                                startIcon={<RejectedIcon />}
                                onClick={() =>
                                    dispatch(
                                        updateStatusSpeaker(
                                            row._id,
                                            "INACTIVE"
                                        )
                                    )
                                }
                            >
                                Suspend
                          </Button>
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
          count={activeSpeakers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
     
    </Box>
  );
}
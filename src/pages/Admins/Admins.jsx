import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { getAllAdmin, deleteAdmin } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: 'auto',
        boxShadow: '0 0.7rem 1rem rgba(111, 115, 184, 0.8) !important',
        backgroundColor: '#3a6986',
    },
    table: {
        padding: theme.spacing(3),
    },
    tablehead: {
        marginRight: theme.spacing(5),
        color: 'white',
        marginLeft: theme.spacing(5),
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#d16473'
    },
    link: {
        textDecoration: "none",
    },
    text: {
        color: 'white',
        backgroundColor: '#5c84a6',
    }
}));


export default function Admin() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const admins = useSelector((state) => state.admin);
    console.log(admins)
    const loggedAdmin = jwtDecode(localStorage.getItem('token'))
    console.log(loggedAdmin, "logged")

    useEffect(() => {
        dispatch(getAllAdmin());
    }, [dispatch]);

    return (
        <Fragment >
            <Box component={Paper} className={classes.root}>
                <Container >
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid>
                            <Typography className={classes.tablehead} variant="h4">List Admin</Typography>
                        </Grid>
                        <Grid>
                            {loggedAdmin.role==='superadmin' && 
                            <Link
                                to="/dashboard/admins/create"
                                className={classes.link}
                            >
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<AddIcon />}
                                >
                                    Add
                                </Button>
                            </Link>}
                        </Grid>
                    </Grid>
                </Container>

                <TableContainer component={Paper} className={classes.table} >
                    <Table aria-label="a dense table" size="small">
                        <TableHead className={classes.text} >
                            <TableRow  > 
                                <TableCell >
                                    <Typography className={classes.text} variant="h6">No</Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography className={classes.text} variant="h6">Name</Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography className={classes.text} variant="h6">Role</Typography>
                                </TableCell>
                                <TableCell align="right" >
                                    <Typography className={classes.tablehead} variant="h6">Action</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(admins) &&
                            admins.map((row, index) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="h6">{index+1}</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="h6">{row.username}</Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="h6">{row.role}</Typography>
                                    </TableCell>
                                    {index===0 &&
                                    <TableCell align="Right">
                                        <Typography variant="h6"></Typography>
                                    </TableCell>
                                    }
                                    {index > 0 &&
                                    <TableCell align="right">
                                        {loggedAdmin.id===row._id &&
                                        <Link
                                            to={`/dashboard/admins/edit/${row._id}`}
                                            className={classes.link}
                                        >
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                startIcon={<EditIcon />}
                                            >
                                                Edit
                                            </Button>
                                    </Link>
                                        
                                        }
                                    {(loggedAdmin.role==='superadmin' && index===0) && 
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            disabled
                                            className={classes.button}
                                            startIcon={<DeleteIcon />}
                                            onClick={() =>
                                                dispatch(deleteAdmin(row._id))
                                            }
                                        >
                                            Delete
                                        </Button>
                                    }
                                    {(loggedAdmin.role==='superadmin' && index>0) && 
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<DeleteIcon />}
                                            onClick={() =>
                                                dispatch(deleteAdmin(row._id))
                                            }
                                        >
                                            Delete
                                        </Button>
                                    }
                                    {loggedAdmin.role==='admin' && 
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            disabled
                                            className={classes.button}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Delete
                                        </Button>
                                    }
                                    </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Fragment>
    );
}
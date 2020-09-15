import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListMenuItem from "./ListMenuItem";
import Header from "./Header";
import MainApp from "./MainApp";
import { useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import SideImage from "./assets/bg.jpg"
import { Box } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: '#e3f2fd',
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        backgroundImage: `url(${SideImage})`,
        backgroundSize: 'cover',
        objectFit: '',
        width: '100%',
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        height: "100vh",
    },
}));


export default function Dashboard() {
    const classes = useStyles();
    const { pathname } = useLocation();
    const routeName = pathname.split("/")[2];
    const [open] = React.useState(true);
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <Box className={classes.root}>
            <CssBaseline />
            <Header open={open} />

            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                    ),
                }}
            >
                <Box className={classes.toolbarIcon}>
                <Typography
                    component="h5"
                    variant="h5"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    {capitalize(`${routeName}`)}
                </Typography>
                </Box>
                <Divider />
                <List>
                    <ListMenuItem />
                </List>
                <Divider />
            </Drawer>
            <MainApp />
        </Box>
    );
}
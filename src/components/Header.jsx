import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SideImage from "./assets/bg.jpg"
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { useLocation, useHistory } from "react-router-dom";
import { logout } from "../redux/actions";
import { useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer - 1,
        backgroundImage: `url(${SideImage})`,
        paddingRight: theme.spacing(5),
    },
   
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    icon: {
        marginLeft: theme.spacing(2),
        color:"#f50057",
    },SideImage
}));

export default function Header(props) {
    const { pathname } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const routeName = pathname.split("/")[2];
    return (
        <AppBar
            position="absolute"
            className={clsx(classes.appBar)}
        >
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerOpen}
                    className={clsx(
                        classes.menuButton,
                        props.open && classes.menuButtonHidden
                    )}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    {routeName}
                </Typography>
                <IconButton className={classes.icon} onClick={() => dispatch(logout(history))}>
                    <LogoutIcon color="secondary" />
                    <Typography className={classes.icon}>LOGOUT</Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
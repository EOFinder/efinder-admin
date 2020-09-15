import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Routes from "./Routes";
import bg2 from "./assets/image.jpg"
import { Box } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        padding: '0',
        margin: '0',
        backgroundImage: `url(${bg2})`,
        backgroundSize: 'cover',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        padding: '0 9vh',
        margin: '5vh auto',
    },
}));

export default function MainApp() {
    const classes = useStyles();

    return (
        <Box className={classes.content}>
            <Box className={classes.appBarSpacer} />
            <Grid item xs={false} md={12} sm={12} lg={12} className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item sm={12} md={12} lg={12}>
                        <Routes />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Payment from "./Payment";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        paddingTop: theme.spacing(1),
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#3a6986',
        color: 'white',
        paddingBottom: theme.spacing(1),
    },
}));

export default function ModalPayment(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Fragment>
            <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={handleOpen}
            >
                Pay Now
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title" >
                    <Box className={classes.modal}>
                        <Typography variant="h4">
                            Pay Now
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Payment id={props.id} handleClose={handleClose} />
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
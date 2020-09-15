import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DetailTrans from "./DetailTrans";
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

export default function ModalTrans(props) {
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
                onClick={handleOpen}
            >
                <Typography >
                            Detail 
                        </Typography>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title" >
                    <Box className={classes.modal}>
                        <Typography variant="h4">
                            Detail Transaction
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DetailTrans id={props.id} handleClose={handleClose} />
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminPayment } from "../../redux/actions";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import ReactFilestack from "filestack-react";
import Button from "@material-ui/core/Button";
import FormGroup from '@material-ui/core/FormGroup';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#3a6986',
    color: "white",
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        margin: "auto",    
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(3),
        width: theme.spacing(40),
    },
    typography: {
        width: theme.spacing(20),
    },
    button: {
        textAlign: 'center',
        margin: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const id = props.id;

    useEffect(() => {
         // eslint-disable-next-line
    }, []);
   
    console.log(detail.jumlah_bayar, 'bayar')
    const [formData, setFormData] = useState({
        bukti_trans_adm: "",
        nom_trans_adm: 0,
        status_transaksi: "PAID BY ADMIN",
    });
    console.log(formData, 'form data')

 // eslint-disable-next-line 
    String.prototype.localIDR = function () {
        return Number(this).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 2,
        });
    };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button  variant="outlined" color="primary" onClick={handleClickOpen}>
        <AccountBalanceWalletIcon /> Pay Now
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle 
            id="customized-dialog-title" onClose={handleClose} >
                <Typography variant="h4">Pay Now</Typography>
        </DialogTitle>
        <DialogContent dividers >
            <Grid container item xs={12} md={12} lg={12}>
                <Grid key={detail._id} container item xs={12} md={12} lg={12}>
                    <Grid container item xs={12} md={12} lg={12}>
                        <Typography className={classes.typography}
                            variant="h6" >
                            Event Name
                        </Typography>
                        <TextField
                            className={classes.textField}
                            defaultValue={detail.nama_acara}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid container item xs={12} md={12} lg={12}>
                        <Typography className={classes.typography}
                            variant="h6" >
                            Event Organizer
                        </Typography>
                        <TextField
                            className={classes.textField}
                            defaultValue={detail.penyelenggara}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid container item xs={12} md={12} lg={12}>
                        <Typography variant="h6" className={classes.typography}>
                            Nominal Transfer
                        </Typography>
                        <TextField 
                            className={classes.textField}
                            defaultValue={detail !== null &&
                                `${`${
                                    detail.jumlah_bayar
                                }
                                    `.localIDR()}`}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid container item xs={12} md={12} lg={12}>
                        <FormGroup>
                            <ReactFilestack
                                apikey={`${process.env.REACT_APP_API_KEY}`}
                                customRender={({ onPick }) => (
                                    <div>
                                        <Button
                                            onClick={onPick}
                                            color="default"
                                            variant="contained"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload Bukti Pembayaran
                                        </Button>
                                    </div>
                                )}
                                onSuccess={(res) =>
                                    setFormData({
                                        ...formData,
                                        bukti_trans_adm:
                                            res.filesUploaded[0].url,
                                        nom_trans_adm: detail.jumlah_bayar
                                    })
                                }
                            />
                        </FormGroup>
                      
                    </Grid>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            // autoFocus onClick={handleClose} 

            color="primary"
            type="submit"
            variant="contained"
            className={classes.button}
            onClick={() => {
                handleClose() 
                dispatch(updateAdminPayment(id, formData))
                } }>
            <AccountBalanceWalletIcon /> Pay Now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
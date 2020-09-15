import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Button from "@material-ui/core/Button";



const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        margin: "auto",
        marginBottom: theme.spacing(3),
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(3),
        width: theme.spacing(35),
    },
    typography: {
        width: theme.spacing(25),
    },
    button: {
        marginLeft: theme.spacing(3)
    },
}));

export default function DetailTrans(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const id = props.id;
    useEffect(() => {
        dispatch(getTransactionDetail(id));
    }, [dispatch, id]);
    
     // eslint-disable-next-line 
     String.prototype.localIDR = function () {
        return Number(this).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 2,
        });
    };
    return (
        <Container className={classes.root}>
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
                            Event Location
                        </Typography>
                        <TextField
                            className={classes.textField}
                            defaultValue={detail.alamat +', '+ detail.kota}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid container item xs={12} md={12} lg={12}>
                        <Typography variant="h6" className={classes.typography}>
                            Description
                        </Typography>
                        <TextField
                            className={classes.textField}
                            defaultValue={detail.deskripsi}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid container item xs={12} md={12} lg={12}>
                        <Typography variant="h6" className={classes.typography}>
                            Participants
                        </Typography>
                        <TextField
                            className={classes.textField}
                            defaultValue={detail.jml_peserta + ' orang' }
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid container item xs={12} md={12} lg={12}>
                        <Typography variant="h6" className={classes.typography}>
                            Duration
                        </Typography>
                        <TextField
                            className={classes.textField}
                            defaultValue={detail.durasi + ' jam' }
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid container item xs={12} md={12} lg={12}>
                        <Typography variant="h6" className={classes.typography}>
                            Paid to Speaker
                        </Typography>
                        {detail.status_transaksi !=='PAID BY ADMIN' && 
                        <TextField
                            className={classes.textField}
                            defaultValue="Speaker belum dibayar"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        }
                        {detail.status_transaksi ==='PAID BY ADMIN' && 
                        <TextField
                            className={classes.textField}
                            defaultValue={`${detail.nom_trans_adm}`.localIDR()}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        }
                    </Grid>
                    <Grid container item xs={12} md={12} lg={12}>
                        <Typography variant="h6" className={classes.typography}>
                            Evidence of Transfer
                        </Typography>
                        {detail.status_transaksi !=='PAID BY ADMIN' && 
                        <Button className={classes.button}
                            disabled
                            variant="contained"
                            color="primary"
                            style={{ color: 'blue' }}
                            // href={detail.bukti_trans_adm}
                            target="_blank"
                            size="small"
                        >
                          <AttachFileIcon />Bukti Transfer
                        </Button>
                        }
                        {detail.status_transaksi ==='PAID BY ADMIN' && 
                        <Button className={classes.button}
                            variant="contained"
                            color="primary"
                            style={{ color: 'white' }}
                            href={detail.bukti_trans_adm}
                            target="_blank"
                            size="small"
                        >
                          <AttachFileIcon />Bukti Transfer
                        </Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
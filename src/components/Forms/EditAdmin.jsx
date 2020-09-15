// import React, { useEffect } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Grid, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
// import { getAdminByID } from "../../redux/actions";
import { Formik, Form, Field, ErrorMessage} from "formik";
import { updateAdmin } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
    field: {
        width: "100%",
    },
    error: {
        color: "red",
        fontStyle: "italic",
    },
}));

export default function EditAdmin() {
    const classes = useStyles();

    const CustomField = (props) => {
        return (
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                className={classes.field}
                {...props}
            />
        );
    };

    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const admins = useSelector((state) => state.admin);
    const history = useHistory();

    console.log(admins, 'ssss')

    const id = pathname.split("/")[4];

    // useEffect(() => {
    //     dispatch(getAdminByID(id));
    // }, [dispatch, id]);

    return (
        <Container>
            <Formik
                initialValues={{
                    username: admins.username || "",
                    password: "",
                    confirmPassword: "",
                }}
                enableReinitialize={true}
                validate={(values) => {
                    const errors = {};
                    

                    if (values.password.length > 0) {
                        if (values.password !== values.confirmPassword) {
                            errors.confirmPassword = "Password not match";
                        } else if (values.password.length < 8) {
                            errors.password = "Minimum Password 8 Character";
                        }
                    }

                    if (!values.username) {
                        errors.username = "Required";
                    }
                    return errors;
                }}
                onSubmit={(values) => {
                    dispatch(updateAdmin(values, id, history));
                }}
            >
                {() => (
                    <Form className={classes.form}>
                        <Grid
                            container
                            justify="center"
                            direction="column"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid container item xs={12} md={6} lg={6}>
                                <Field
                                    type="text"
                                    as={CustomField}
                                    name="username"
                                    label="Username"
                                    required
                                    autoFocus
                                />
                              
                            </Grid>
                            <Grid container item xs={12} md={6} lg={6}>
                                <Field
                                    type="password"
                                    as={CustomField}
                                    name="password"
                                    label="Password"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className={classes.error}
                                />
                            </Grid>
                            <Grid container item xs={12} md={6} lg={6}>
                                <Field
                                    type="password"
                                    as={CustomField}
                                    name="confirmPassword"
                                    label="Re-enter Password"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className={classes.error}
                                />
                            </Grid>
                            <Grid container item xs={12} md={6} lg={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Grid, Button, InputLabel, Select, FormControl } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addAdmin } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: '0 0.7rem 1rem rgba(111, 115, 184, 0.8) !important',
    },
    field: {
        width: "100%",
    },
    error: {
        color: "red",
        fontStyle: "italic",
    },

}));

export default function AddAdmin() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedAdmin = jwtDecode(localStorage.getItem('token'))
    console.log(loggedAdmin.role, "logged")

    const CustomField = (props) => {
        return (
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                className={classes.field}
                required
                {...props}
            />
        );
    };

    const SelectField = (props) => {
        return (
            <Select
                native
                label="Role"
                inputProps={{
                    name: 'role',
                }}
                {...props}
            ></Select>
        );
    };

    return (
        <Container  >
            <Formik 
                initialValues={{
                    fullname: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                    role: "",
                }}
                validate={(values) => {
                    const errors = {};
                   if (values.password !== values.confirmPassword) {
                        errors.confirmPassword = "Password not match";
                    } else if (values.password.length < 8) {
                        errors.password = "Minimum Password 8 Character";
                    }
                    return errors;
                }}
                onSubmit={(values) => {
                    console.log(values)
                    dispatch(addAdmin(values, loggedAdmin.role.toUpperCase(),  history));
                }}
            >
                {() => (
                <Form
                noValidate
                autoComplete="off"
            >
                <Grid 
                    container
                    justify="center"
                    direction="column"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid container item xs={12} md={6} lg={6}>
                        <Field
                            type="fullname"
                            as={CustomField}
                            name="fullname"
                            label="Full Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid container item xs={12} md={6} lg={6}>
                        <Field
                            type="text"
                            as={CustomField}
                            name="username"
                            label="Username"
                        />
                        <ErrorMessage
                            name="username"
                            component="div"
                            className={classes.error}
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
                    <FormControl variant="outlined" className={classes.field}>
                        <InputLabel>
                            Role
                        </InputLabel>
                        <Field 
                            name="role" 
                            as={SelectField} 
                            placeholder="Role"
                            variant="outlined"
                            margin="normal"
                        >
                                
                            <option value=""></option>
                            <option value="superadmin">Super Admin</option>
                            <option value="admin">Admin</option>
                        
                        </Field>
                    </FormControl>
                    </Grid>
                    <Grid container item xs={12} md={6} lg={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Form>
             )}
            </Formik>
        </Container>
    );
}
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Desktop from "../assets/desktop.png";
import Logo1 from "../assets/new_logo.png";
import CardMedia from "@material-ui/core/CardMedia";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5% auto",
    width: "50%",
    display: "flex",
    backgroundColor: "#3a6986",
    MozBorderRadius: "10px",
    WebkitBorderRadius: "10px",
    borderRadius: "10px",
  },
  head: {
    width: "40%",
    margin: "auto",
    display: "flex",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundColor: "lightblue",
    backgroundPosition: "center",
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },

  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#6cc7d9",
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CustomField = (props) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      required
      size="medium"
      {...props}
    />
  );
};

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={12} md={12} lg={12} >
        <img src={Logo1} alt="" className={classes.head} />
      </Grid>
      <Grid item sm={12} md={7} lg={7} className={classes.image}  >
        <CardMedia
          sm={12}
          md={7}
          lg={7}
          className={classes.media}
          elevation={6}
          image={Desktop}
        />
      </Grid>
      <Grid item sm={12} md={5} lg={5} component={Paper} >
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Formik
            initialValues={{ username: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = "Required";
              }
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={(values) => {
              dispatch(login(values, history));
            }}
          >
            {() => (
              <Form className={classes.form}>
                <Field
                  type="username"
                  as={CustomField}
                  name="username"
                  label="Username"
                  autoFocus
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={classes.error}
                />
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}

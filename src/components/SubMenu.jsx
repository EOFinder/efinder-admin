import React from "react";
import { Grid, Container, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function SubMenu(props) {
    const history = useHistory();
    return (
        <Container >
            <Grid 
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid>
                    <h1>{props.title}</h1>
                </Grid>
                <Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
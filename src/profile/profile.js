import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2)
    }
}));

export default function Profile() {
    const classes = useStyles();

    return (
        <div className={classes.layout}>
            <form noValidate autoComplete="off">
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id="firstName"
                                label="Voornaam"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="lastName"
                                label="Achternaam"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        </div>
    );
}

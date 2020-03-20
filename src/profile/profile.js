import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import firebase from "../firebase/firebase";

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

export default function Profile(props) {
    const classes = useStyles();
    const [firstName, setFirstName] = React.useState(props.profile.firstName);
    const [lastName, setLastName] = React.useState(props.profile.lastName);

    const saveProfile = () => {
        const db = firebase.firestore();
        db.collection("profile")
            .doc(props.profile.id)
            .set({ lastName, firstName });
    };

    return (
        <div className={classes.layout}>
            <form noValidate autoComplete="off">
                <Toolbar>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={saveProfile}
                    >
                        Bewaar
                    </Button>
                </Toolbar>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id="firstName"
                                label="Voornaam"
                                value={firstName}
                                onChange={event => {
                                    setFirstName(event.target.value);
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="lastName"
                                label="Achternaam"
                                value={lastName}
                                onChange={event => {
                                    setLastName(event.target.value);
                                }}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        </div>
    );
}

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        minHeight: "100%",
        width: "100%",
        position: "fixed",
        background: "url('./bg-pattern-triangles.png') 0 0 repeat",
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "transparent",
    },
}));

export default function PreLoad() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <img
                        src="./Icon-green.svg"
                        alt="CODEZILLA logo"
                        height="100%"
                        width="100%"
                    ></img>
                </Avatar>
                <Typography component="h1" variant="h4">
                    CODEZILLA Hours
                </Typography>
                <Typography component="h2" variant="subtitle1">
                    Bezig met aanmelden...
                </Typography>
            </div>
        </Container>
    );
}

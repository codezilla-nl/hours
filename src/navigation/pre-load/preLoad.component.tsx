import React from "react";
import {
    Avatar,
    Container,
    CssBaseline,
    LinearProgress,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
        <>
            <LinearProgress />
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
                    <Typography id="preloadTitle" component="h1" variant="h4">
                        CODEZILLA Hours
                    </Typography>
                    <Typography
                        id="preloadSubTitle"
                        component="h2"
                        variant="subtitle1"
                    >
                        Bezig met aanmelden...
                    </Typography>
                </div>
            </Container>
        </>
    );
}

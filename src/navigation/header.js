import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: "#7d518",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header({ profile }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        CODEZILLA Hours
                    </Typography>
                    <Button component={NavLink} color="inherit" to="/">
                        Urenstaat
                    </Button>
                    <Button component={NavLink} color="inherit" to="/template">
                        Template
                    </Button>
                    <Button
                        color="inherit"
                        component={NavLink}
                        to="/admin"
                        startIcon={<AccountCircle />}
                    >
                        {profile.displayName}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

import React from "react";
import { makeStyles, darken } from "@material-ui/core/styles";
import { Avatar, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import AccountCircle from "@material-ui/icons/AccountCircle";

import IProfile from "../common/interfaces/IProfile";

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#7d518",
        color: "#fff",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    highlight: {
        backgroundColor: darken("rgba(103, 213, 24)", 0.1),
    },
    title: {
        flexGrow: 1,
    },
    avatar: {
        marginRight: theme.spacing(2),
        backgroundColor: "transparent",
    },
}));

interface IProps {
    profile: IProfile;
}

export default function Header({ profile }: IProps) {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Avatar className={classes.avatar}>
                        <img
                            src="./Icon-white.svg"
                            alt="CODEZILLA logo"
                            height="100%"
                            width="100%"
                        ></img>
                    </Avatar>
                    <Typography variant="h6" className={classes.title}>
                        CODEZILLA Hours
                    </Typography>
                    <Button
                        component={NavLink}
                        color="inherit"
                        to="/"
                        exact
                        activeClassName={classes.highlight}
                    >
                        Urenstaat
                    </Button>
                    <Button
                        component={NavLink}
                        color="inherit"
                        to="/template"
                        activeClassName={classes.highlight}
                    >
                        Template
                    </Button>
                    {profile.isAdmin && (
                        <Button
                            component={NavLink}
                            color="inherit"
                            to="/admin"
                            activeClassName={classes.highlight}
                        >
                            Beheer
                        </Button>
                    )}
                    <Button color="inherit" startIcon={<AccountCircle />}>
                        {profile.displayName}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

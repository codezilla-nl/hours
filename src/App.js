import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GridOn from "@material-ui/icons/GridOn";
import AccountCircle from "@material-ui/icons/AccountCircle";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import Typography from "@material-ui/core/Typography";

import firebase from "./firebase/firebase";

import HoursGrid from "./hours/hoursGrid";
import Profile from "./profile/profile";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    activeItem: {
        backgroundColor: theme.palette.primary[100]
    },
    item: {},
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1
    },
    title: {
        margin: theme.spacing(0, 1)
    }
}));

export default function App() {
    const classes = useStyles();
    const [open] = React.useState(true);
    const [profile, setProfile] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchData = async () => {
        const db = firebase.firestore();
        const data = await db.collection("profile").get();
        const firstProfile = data.docs.find((doc, index) => index === 0);
        const profileData = firstProfile.data();
        profileData.id = firstProfile.id;
        setProfile(profileData);
        setIsLoading(false);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={classes.root}>
            <Router>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })
                    }}
                >
                    <div className={classes.toolbar}>CODEZILLA Hours</div>
                    <Divider />
                    <List>
                        <ListItem
                            component={NavLink}
                            button
                            key="profile"
                            to="/profile"
                        >
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary="Profiel" />
                        </ListItem>
                        <ListItem component={NavLink} button key="hours" to="/">
                            <ListItemIcon>
                                <GridOn />
                            </ListItemIcon>
                            <ListItemText primary="Urenstaat" />
                        </ListItem>
                        <ListItem
                            component={NavLink}
                            button
                            key="template"
                            to="/template"
                        >
                            <ListItemIcon>
                                <BookmarkBorder />
                            </ListItemIcon>
                            <ListItemText primary="Template" />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    {!isLoading ? (
                        <Switch>
                            <Route exact path="/">
                                <HoursGrid type="month" profile={profile} />
                            </Route>
                            <Route path="/template">
                                <Typography
                                    variant="h4"
                                    component="h4"
                                    className={classes.title}
                                >
                                    Template
                                </Typography>
                                <HoursGrid type="template" profile={profile} />
                            </Route>
                            <Route path="/profile">
                                <Typography
                                    variant="h4"
                                    component="h4"
                                    className={classes.title}
                                >
                                    Profiel
                                </Typography>
                                <Profile profile={profile} />
                            </Route>
                        </Switch>
                    ) : null}
                </main>
            </Router>

            <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js"></script>

            <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-analytics.js"></script>

            <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-auth.js"></script>
            <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-firestore.js"></script>
        </div>
    );
}

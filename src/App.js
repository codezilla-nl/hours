import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Typography } from "@material-ui/core";

import {
    makeStyles,
    ThemeProvider,
    createMuiTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import firebase from "./firebase/firebase";

import Header from "./navigation/header";
import HoursContainer from "./hours/HoursContainer";
import PreLoad from "./navigation/preLoad";
import Admin from "./admin/admin";

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: "#67d518",
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
    },
});

const useStyles = makeStyles((theme) => ({
    activeItem: {
        backgroundColor: theme.palette.primary[100],
    },
    item: {},
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
    },
    title: {
        margin: theme.spacing(1, 1),
    },
}));

export default function App() {
    const classes = useStyles();
    const [profile, setProfile] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    const signIn = () => {
        const provider = new firebase.auth.OAuthProvider("microsoft.com");

        provider.setCustomParameters({
            tenant: "45c0a280-6475-473d-a8ee-a5684b93879c",
        });

        firebase.auth().signInWithRedirect(provider);
    };

    const getAuth = () => {
        firebase
            .auth()
            .getRedirectResult()
            .then(function (result) {
                if (result.user === null) {
                    signIn();
                    return;
                }
                fetchProfile(result.user);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    React.useEffect(() => {
        getAuth();
    }, []);

    const fetchProfile = async (user) => {
        const db = firebase.firestore();
        const snapshot = await db.collection("profile").get();
        const response = snapshot.docs.find((doc) => {
            return doc.data().microsoftId === user.uid;
        });

        if (!response) {
            createNewProfile(user);
            return;
        }

        const data = response.data();
        data.id = response.id;
        setProfile(data);
        setIsLoading(false);
    };

    const createNewProfile = (user) => {
        const db = firebase.firestore();
        const newProfile = {
            displayName: user.displayName,
            microsoftId: user.uid,
            email: user.email,
        };
        db.collection("profile")
            .add(newProfile)
            .then((docRef) => {
                fetchProfile(user);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    };

    if (isLoading) return <PreLoad />;

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                {isLoading ? (
                    <PreLoad />
                ) : (
                    <Router>
                        <CssBaseline />
                        <Header profile={profile} />
                        <Switch>
                            <Route
                                path="/"
                                exact
                                component={() => (
                                    <HoursContainer
                                        profile={profile}
                                        type="month"
                                    />
                                )}
                            />
                            <Route path="/template">
                                <TemplateHeader classes={classes} />
                                <HoursContainer
                                    type="template"
                                    profile={profile}
                                />
                            </Route>
                            {profile.isAdmin && (
                                <Route
                                    path="/admin"
                                    component={() => (
                                        <Admin profile={profile} />
                                    )}
                                />
                            )}
                        </Switch>
                    </Router>
                )}

                <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js"></script>

                <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-analytics.js"></script>

                <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-auth.js"></script>
                <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-firestore.js"></script>
            </div>
        </ThemeProvider>
    );
}

const TemplateHeader = ({ classes }) => (
    <>
        <Typography variant="body1" className={classes.title}>
            Maak hier een template voor je gemiddelde werkweek. Pas het template
            toe op de hele urenstaat met een klik op de knop.
        </Typography>

        <Typography variant="body2" className={classes.title}>
            Uren die je al hebt ingevuld worden niet overschreven.
        </Typography>
    </>
);

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, Snackbar } from "@material-ui/core";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import firebase from "./firebase/firebase.component";

import IProfile from "./common/interfaces/IProfile";
import IUser from "./common/interfaces/IUser";

import Header from "./navigation/header.component";
import HoursContainer from "./hours/hours-container/HoursContainer.component";
import PreLoad from "./navigation/pre-load/preLoad.component";
import Admin from "./admin/Admin.component";
import AdminDetail from "./admin/detail/Detail.component";
import Settings from "./settings/Settings.component";

import Profile from "./firebase/data/Profile";

require("dotenv").config();

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#67d518",
        },
        secondary: {
            main: "#009CA6",
        },
    },
});

export default function App() {
    const [profile, setProfile] = React.useState<IProfile>({
        displayName: "",
        email: "",
        hoursPerWeek: "40",
        id: "",
        isAdmin: false,
        microsoftId: "",
    });
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [notificationMessage, setNotificationMessage] = React.useState("");

    const signIn = () => {
        const provider = new firebase.auth.OAuthProvider("microsoft.com");

        provider.setCustomParameters({
            tenant: "45c0a280-6475-473d-a8ee-a5684b93879c",
        });

        firebase.auth().signInWithRedirect(provider);
    };

    const notification = (message: string) => {
        setNotificationMessage(message);
    };

    const closeNotification = (event: any, reason: string) => {
        if (reason === "clickaway") {
            return;
        }

        setNotificationMessage("");
    };

    const getAuth = () => {
        firebase
            .auth()
            .getRedirectResult()
            .then(function (result: any) {
                if (result.user === null) {
                    signIn();
                    return;
                }
                fetchProfile(result.user);
            })
            .catch(function (error) {
                notification("Het is niet gelukt om in te loggen: " + error);
            });
    };

    React.useEffect(() => {
        getAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProfile = async (user: IUser) => {
        Profile.getProfile(user.uid)
            .then((response) => {
                if (response && response?.docs.length > 0) {
                    const doc = response.docs[0];
                    const data = doc.data();
                    if (data) {
                        setProfile({
                            displayName: data.displayName,
                            email: data.email,
                            hoursPerWeek: data.hoursPerWeek,
                            id: doc.id,
                            isAdmin: Boolean(data.isAdmin),
                            microsoftId: data.microsoftId,
                        });
                        setIsLoading(false);
                    }
                } else {
                    createNewProfile(user);
                }
            })
            .catch((error) => {
                notification(
                    "Het is niet gelukt een profiel op te halen: " + error,
                );
                setIsLoading(false);
            });
    };

    const createNewProfile = (user: IUser) => {
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
                notification(
                    "Het is niet gelukt om een profiel op te halen: " + error,
                );
            });
    };

    if (isLoading) return <PreLoad />;

    return (
        <ThemeProvider theme={theme}>
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
                                    notification={notification}
                                />
                            )}
                        />
                        <Route path="/settings">
                            <Settings
                                profile={profile}
                                notification={notification}
                            />
                        </Route>
                        {profile.isAdmin && (
                            <>
                                <Route
                                    path="/admin"
                                    exact
                                    component={() => (
                                        <Admin notification={notification} />
                                    )}
                                />
                                <Route
                                    path="/admin/detail/:id"
                                    component={() => (
                                        <AdminDetail
                                            notification={notification}
                                        />
                                    )}
                                />
                            </>
                        )}
                    </Switch>
                    <Snackbar
                        open={notificationMessage !== ""}
                        autoHideDuration={6000}
                        onClose={closeNotification}
                        message={notificationMessage}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                    ></Snackbar>
                </Router>
            )}

            <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js"></script>

            <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-analytics.js"></script>

            <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-auth.js"></script>
            <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-firestore.js"></script>
        </ThemeProvider>
    );
}

import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import firebase from "../firebase/firebase";

import HoursHeader from "./HoursHeader";
import HoursGrid from "./hoursGrid";

class HoursContainer extends Component {
    state = {
        id: "",
        days: [],
        month: "",
        year: "",
        expandColumns: true,
        client: "",
        project: "",
        profileId: "",
        profile: "",
        snackbarOpen: false,
        isLoading: false,
        isTemplate: false,
    };

    componentDidMount() {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const { type, profile } = this.props;
        const isTemplate = type === "template";

        this.setState(
            {
                isTemplate,
                profile,
                profileId: profile.id,
                year,
                month,
            },
            () => {
                if (isTemplate) {
                    this.fetchTemplate(profile.id);
                } else {
                    this.fetchMonth();
                }
            },
        );
    }

    fetchMonth = async () => {
        this.setState({ isLoading: true });
        const db = firebase.firestore();
        const response = await db
            .collection("months")
            .where("month", "==", this.state.month)
            .where("year", "==", this.state.year)
            .where("profileId", "==", this.state.profileId)
            .get();
        const instance = response.docs.find(doc => doc.data());

        if (instance && instance.exists) {
            this.setState({ ...instance.data(), id: instance.id });
        } else {
            this.setState({
                days: this.getDaysInMonth(this.state.month, this.state.year),
            });
        }

        this.setState({ isLoading: false });
    };

    fetchTemplate = async profileId => {
        this.setState({ isLoading: true });

        const db = firebase.firestore();
        const instance = await db
            .collection("template")
            .doc(profileId)
            .get();

        if (instance && instance.exists) {
            this.setState({
                days: instance.data().days,
                id: instance.id,
            });
        }

        this.setState({ isLoading: false });
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value }, () => {
            if (["month", "year"].includes(name)) {
                this.fetchMonth();
            }
        });
    };

    getDaysInMonth(month, year) {
        const daysInAMonth = new Date(year, month, 0).getDate();
        const rows = [];

        for (let i = 1; i <= daysInAMonth; i++) {
            rows.push({
                day: i,
                date: new Date(year, month - 1, i),
                worked: "",
                overtime: "",
                sick: "",
                holiday: "",
                publicHoliday: "",
                available: "",
                education: "",
                other: "",
                standBy: "",
                kilometers: "",
                explanation: "",
            });
        }

        return rows;
    }

    submitHours = () => {
        const db = firebase.firestore();
        db.collection("months")
            .doc(
                this.state.year +
                    "-" +
                    this.state.month +
                    "-" +
                    this.state.profile.displayName,
            )
            .set({
                client: this.state.client,
                days: this.state.days,
                profile: this.state.profile,
                profileId: this.state.profileId,
                project: this.state.project,
                year: this.state.year,
                month: this.state.month,
            })
            .then(docRef => {
                this.setState(prevState => {
                    prevState.snackbarOpen = true;
                    return prevState;
                });
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
    };

    submitTemplate = days => {
        const data = days.map(day => {
            delete day.date;
            delete day.dayOfTheWeek;
            return day;
        });

        const db = firebase.firestore();
        db.collection("template")
            .doc(this.props.profile.id)
            .set({ days: data })
            .then(docRef => {
                this.setState(prevState => {
                    prevState.snackbarOpen = true;
                    return prevState;
                });
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
    };

    save = isTemplate => {
        if (isTemplate) {
            this.submitTemplate(this.state.days);
            return;
        }
        this.submitHours();
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState(prevState => {
            prevState.snackbarOpen = false;
            return prevState;
        });
    };

    render() {
        if (!this.props.profile.id) return null;

        return (
            <form noValidate autoComplete="off">
                <HoursHeader
                    setMonth={this.setMonth}
                    handleInputChange={this.handleInputChange}
                    client={this.state.client}
                    project={this.state.project}
                    expandColumns={this.state.expandColumns}
                    isTemplate={this.state.isTemplate}
                />
                <HoursGrid
                    expandColumns={this.state.expandColumns}
                    days={this.state.days}
                    handleChange={this.handleInputChange}
                    save={this.save}
                    month={this.state.month}
                    year={this.state.year}
                    isTemplate={this.state.isTemplate}
                />

                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    onClose={this.handleClose}
                    open={this.state.snackbarOpen}
                    autoHideDuration={6000}
                    message="Opgeslagen"
                />
            </form>
        );
    }
}

export default HoursContainer;

import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import firebase from "../firebase/firebase";

import HoursHeader from "./HoursHeader";
import HoursGrid from "./HoursGrid";

class HoursContainer extends Component {
    state = {
        id: "",
        days: this.getDaysInMonth(),
        expandColumns: true,
        client: "",
        project: "",
        profileId: this.props.profile.id,
        profile: this.props.profile,
        isFinal: false,
        snackbarOpen: false,
        isLoading: false,
        isTemplate: false,
    };

    componentDidUpdate() {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const isTemplate = this.props.type === "template";

        if (isTemplate) {
            this.fetchTemplate(this.props.profile.id);
        } else {
            this.fetchMonth(currentMonth, currentYear, this.props.profile.id);
        }
    }

    fetchMonth = async (month, year, profileId) => {
        this.setState({ isLoading: true });
        const db = firebase.firestore();
        const response = await db.collection("months").get();
        const instance = response.docs.find(doc => {
            const data = doc.data();
            return (
                data.month === month &&
                data.year === year &&
                data.profileId === profileId
            );
        });

        if (instance) {
            this.setState({ ...instance.data, id: instance.id });
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

        if (instance) {
            this.setState({
                days: instance.data().days,
                id: instance.id,
            });
        }

        this.setState({ isLoading: false });
    };

    handleChange(value, column, day) {
        const { days } = this.state;
        const numberValue = Number(value);
        days[day][column] = isNaN(numberValue) ? "" : numberValue;
        this.setState({ days });
    }

    expandColumns(checked) {
        this.setState({ expandColumns: checked });
    }

    setMonth(month, year) {
        const days = this.getDaysInMonth(month, year);
        this.setState({
            month,
            year,
            days,
        });

        this.fetchMonth(month, year, this.props.profile.id);
    }

    getDaysInMonth() {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const daysInAMonth = new Date(year, month, 0).getDate();
        const rows = [];

        for (let i = 1; i < daysInAMonth; i++) {
            rows.push({
                day: i,
                dayOfTheWeek: new Date(year, month - 1, i).getDay(),
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

    isNotWeekend(dayOfTheWeek) {
        return dayOfTheWeek !== 0 && dayOfTheWeek !== 6;
    }

    handleClientInput(value) {
        this.setState({
            client: value,
        });
    }

    handleProjectInput(value) {
        this.setState({
            project: value,
        });
    }

    submitHours() {
        const db = firebase.firestore();
        db.collection("months")
            .doc(
                this.state.year +
                    "-" +
                    this.state.month +
                    "-" +
                    this.state.profile.displayName,
            )
            .set(this.state)
            .then(docRef => {
                this.setState(prevState => {
                    prevState.snackbarOpen = true;
                    return prevState;
                });
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
    }

    submitTemplate() {
        const data = this.state.days.map(day => {
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
    }

    save(isTemplate) {
        if (isTemplate) {
            this.submitTemplate();
            return;
        }
        this.submitHours();
    }

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState(prevState => {
            prevState.snackbarOpen = false;
            return prevState;
        });
    };

    makeFinal(checked, isTemplate) {
        this.setState(prevState => {
            prevState.isFinal = checked;
            return prevState;
        }, this.save(isTemplate));
    }

    render() {
        if (!this.props.profile.id) return null;
        console.log(this.state);
        return (
            <form noValidate autoComplete="off">
                <HoursHeader
                    setMonth={this.setMonth}
                    handleClientInput={this.handleClientInput}
                    client={this.state.client}
                    project={this.state.project}
                    handleProjectInput={this.handleProjectInput}
                    columnsExpanded={this.state.expandColumns}
                    expandColumns={this.expandColumns}
                    isFinal={this.state.isFinal}
                    makeFinal={this.makeFinal}
                    isTemplate={this.props.type === "template"}
                />
                <HoursGrid
                    columnsExpanded={this.state.expandColumns}
                    days={this.state.days}
                    handleChange={this.handleChange}
                    save={this.save}
                    isTemplate={this.props.type === "template"}
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

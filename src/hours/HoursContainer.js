import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import LinearProgress from "@material-ui/core/LinearProgress";

import firebase from "../firebase/firebase";
import Hours from "../firebase/data/Hours";
import JSReport from "../pdf/JSReport";

import HoursHeader from "./HoursHeader";
import HoursGrid from "./HoursGrid";
import Validators from "./validation/Validators";
import Utils from "../common/Utils";

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
        saved: false,
        approved: false,
        showValidationMessages: [],
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

    componentWillUnmount() {
        document
            .querySelector("input")
            .removeEventListener("blur", this.handleInputChange);
    }

    fetchMonth = async () => {
        this.setState({ isLoading: true });
        const instance = await Hours.getHoursForProfile(
            this.state.month,
            this.state.year,
            this.state.profileId,
        );

        if (instance.length === 1) {
            this.setState(
                {
                    ...instance[0],
                    id: instance[0].id,
                    approved: instance[0].approved,
                },
                () => {
                    this.initData();
                },
            );
        } else {
            this.setState(
                {
                    approved: false,
                    days: this.getDaysInMonth(
                        this.state.month,
                        this.state.year,
                    ),
                },
                () => {
                    this.initData();
                },
            );
        }

        this.setState({ isLoading: false });
    };

    fetchTemplate = async (profileId) => {
        this.setState({ isLoading: true });

        const db = firebase.firestore();
        const instance = await db.collection("template").doc(profileId).get();

        if (instance && instance.exists && instance.data().days) {
            this.setState(
                {
                    days: instance.data().days,
                    client: instance.data().client,
                    project: instance.data().project,
                    id: instance.id,
                },
                () => {
                    this.initData();
                },
            );
        } else {
            this.getTemplateWeek();
        }

        this.setState({ isLoading: false });
    };

    initData = () => {
        const days = Utils.initDays(
            this.state.days,
            this.state.isTemplate,
            this.state.year,
            this.state.month,
        );
        this.setState({ days: days }, () => {
            this.isValid();
        });
    };

    applyTemplate = async () => {
        this.setState({ isLoading: true });

        const db = firebase.firestore();
        const instance = await db
            .collection("template")
            .doc(this.state.profileId)
            .get();

        const templateDays = await instance.data().days;
        const { days } = this.state;

        const mergedDays = days.map((day) => {
            const sameDay = templateDays.find((templateDay) => {
                const monthDayOfTheWeek = day.dayOfTheWeek;
                return monthDayOfTheWeek === templateDay.day - 1;
            });

            if (day !== sameDay) {
                Object.keys(day).forEach((item) => {
                    if (day[item] === "") {
                        day[item] = sameDay[item];
                    }
                });
            }

            return day;
        });
        this.setState(
            {
                isLoading: false,
                days: mergedDays,
                client: instance.data().client,
                project: instance.data().project,
                saved: true,
            },
            () => this.save(),
        );
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value }, () => {
            if (["month", "year"].includes(name)) {
                this.setState({ isLoading: true });
                this.fetchMonth();
            }
        });
    };

    getTemplateWeek = () => {
        const rows = [];

        for (let i = 1; i <= 7; i++) {
            rows.push({
                day: i,
                dayOfTheWeek: i,
                isWeekend: i === 1 || i === 7,
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

        return this.setState({ days: rows });
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
        const id =
            this.state.year +
            "-" +
            this.state.month +
            "-" +
            this.state.profile.displayName;

        const document = {
            client: this.state.client,
            days: this.state.days,
            profile: this.state.profile,
            profileId: this.state.profileId,
            project: this.state.project,
            year: this.state.year,
            month: this.state.month,
        };

        Hours.updateHours(id, document)
            .then(() => {
                this.setState({ saved: true });
            })
            .catch((error) => {
                this.props.notification(
                    "Het is niet gelukt om de uren te bewaren: " + error,
                );
            });
    };

    submitTemplate = (days, client, project, profile) => {
        const data = days.map((day) => {
            delete day.date;
            delete day.dayOfTheWeek;
            return day;
        });

        const db = firebase.firestore();
        db.collection("template")
            .doc(this.props.profile.id)
            .set({
                days: data,
                client,
                project,
                profileName: profile.displayName,
            })
            .then((docRef) => {
                this.setState((prevState) => {
                    prevState.snackbarOpen = true;
                    return prevState;
                });
            })
            .catch((error) => {
                this.props.notification(
                    "Het is niet gelukt om het template te bewaren: " + error,
                );
            });
    };

    save = () => {
        this.setState({ saved: false });

        if (this.state.isTemplate) {
            const { days, client, project, profile } = this.state;
            this.submitTemplate(days, client, project, profile);
            return;
        }

        this.isValid();

        this.submitHours();
    };

    isValid = () => {
        if (this.state.isTemplate) {
            return true;
        }

        const validationMessages = [];
        this.state.days.forEach((day) => {
            const weekendValidation = Validators.validateWeekend(day);
            if (weekendValidation) {
                validationMessages.push(weekendValidation);
            }
        });

        const totalHoursValidation = Validators.validateTotalHoursOfMonth(
            this.state.days,
        );
        if (totalHoursValidation) {
            validationMessages.push(totalHoursValidation);
        }

        this.setState({
            validationMessages: validationMessages,
        });

        return true;
    };

    closeValidationMessage = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ showValidationMessage: false });
    };

    getReport = () => {
        this.setState({ isLoading: true });

        JSReport.getReport(this.state)
            .then(() => {
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                this.props.notification(
                    "Het is niet gelukt om een PDF te maken: " + error,
                );
            });
    };

    render() {
        if (!this.props.profile.id) return null;

        return (
            <form noValidate autoComplete="off">
                <HoursHeader
                    handleInputChange={this.handleInputChange}
                    client={this.state.client}
                    project={this.state.project}
                    expandColumns={this.state.expandColumns}
                    isTemplate={this.state.isTemplate}
                    applyTemplate={this.applyTemplate}
                    getReport={this.getReport}
                    validationMessages={this.state.validationMessages}
                    saved={this.state.saved}
                    approved={this.state.approved}
                />

                {this.state.isLoading ? (
                    <LinearProgress />
                ) : (
                    <HoursGrid
                        expandColumns={this.state.expandColumns}
                        days={this.state.days}
                        handleChange={this.handleInputChange}
                        save={this.save}
                        isTemplate={this.state.isTemplate}
                        readOnly={this.state.approved}
                    />
                )}
                <Snackbar
                    open={this.state.showValidationMessage}
                    autoHideDuration={6000}
                    onClose={this.closeValidationMessage}
                    message={this.state.validationMessage}
                ></Snackbar>
            </form>
        );
    }
}

export default HoursContainer;

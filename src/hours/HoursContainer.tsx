import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

import Hours from "../firebase/data/Hours";
import JSReport from "../pdf/JSReport";

import HoursHeader from "./HoursHeader";
import HoursGrid from "./HoursGrid";
import Validators from "./validation/Validators";
import Utils from "../common/Utils";

import IDay from "../common/interfaces/IDay";
import IProfile from "../common/interfaces/IProfile";

interface IProps {
    type: string;
    profile: IProfile;
    notification: any;
}

class HoursContainer extends Component<IProps> {
    state = {
        id: "",
        days: [],
        month: 0,
        year: 0,
        expandColumns: true,
        client: "",
        project: "",
        profileId: "",
        profile: {
            id: "",
            displayName: "",
            microsoftId: "",
            email: "",
            isAdmin: false,
        },
        saved: false,
        approved: false,
        showValidationMessage: false,
        validationMessages: [],
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
            .querySelector("input")!
            .removeEventListener("blur", () => this.handleInputChange);
    }

    fetchMonth = async () => {
        this.setState({ isLoading: true });
        const instance = await Hours.getHoursForProfile(
            Number(this.state.month),
            Number(this.state.year),
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

    fetchTemplate = async (profileId: string) => {
        this.setState({ isLoading: true });

        Hours.getTemplate(profileId)
            .then((response) => {
                if (response && response?.exists) {
                    const data = response.data();
                    if (data) {
                        this.setState(
                            {
                                days: data.days,
                                client: data.client,
                                project: data.project,
                                id: response.id,
                            },
                            () => {
                                this.initData();
                            },
                        );
                    }
                } else {
                    this.getTemplateWeek();
                }
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                this.props.notification(
                    "Het is niet gelukt een template op te halen: " + error,
                );
            });
    };

    initData = () => {
        const days = Utils.initDays(
            this.state.days,
            this.state.isTemplate,
            Number(this.state.year),
            Number(this.state.month),
        );
        this.setState({ days: days }, () => {
            this.isValid();
        });
    };

    applyTemplate = async () => {
        this.setState({ isLoading: true });

        Hours.getTemplate(this.state.profileId)
            .then((response) => {
                if (response && response?.exists) {
                    const data = response.data();
                    if (data) {
                        const templateDays = data.days;
                        const { days } = this.state;

                        const mergedDays = days.map((day: IDay) => {
                            const sameDay = templateDays.find(
                                (templateDay: IDay) => {
                                    const monthDayOfTheWeek = day.dayOfTheWeek;
                                    return (
                                        monthDayOfTheWeek ===
                                        templateDay.day - 1
                                    );
                                },
                            );

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
                                client: data.client,
                                project: data.project,
                                saved: true,
                            },
                            () => this.save(),
                        );
                    }
                } else {
                    this.props.notification(
                        "Er is nog geen template aangemaakt.",
                    );
                }
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                this.props.notification(
                    "Het is niet gelukt een template op te halen: " + error,
                );
            });
    };

    handleInputChange = (name: string, value: string) => {
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

    getDaysInMonth(month: number, year: number) {
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
            id: id,
            client: this.state.client,
            days: this.state.days,
            profile: this.state.profile,
            profileId: this.state.profileId,
            project: this.state.project,
            year: this.state.year,
            month: this.state.month,
            approved: this.state.approved,
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

    submitTemplate = (
        days: IDay[],
        client: string,
        project: string,
        profile: IProfile,
    ) => {
        const data = days.map((day) => {
            delete day.date;
            delete day.dayOfTheWeek;
            return day;
        });

        Hours.updateTemplate(
            profile.id,
            data,
            client,
            project,
            profile.displayName,
        )
            .then(() => {
                this.props.notification("Template opgeslagen");
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

    closeValidationMessage = (event: any, reason: string) => {
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
                        readOnly={this.state.approved}
                    />
                )}
            </form>
        );
    }
}

export default HoursContainer;

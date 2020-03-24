import React from "react";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import TableFooter from "@material-ui/core/TableFooter";
import Snackbar from "@material-ui/core/Snackbar";

import firebase from "../firebase/firebase";

import * as HoursConstants from "./hoursConstants";

class HoursGrid extends React.Component {
    columns = HoursConstants.columns;
    months = HoursConstants.months;
    years = HoursConstants.years;
    isTemplate = false;
    snackbarOpen = false;
    isLoading = true;

    constructor(props) {
        super(props);

        this.isTemplate = props.type === "template";
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        this.submitHours = this.submitHours.bind(this);
        this.handleClientInput = this.handleClientInput.bind(this);
        this.handleProjectInput = this.handleProjectInput.bind(this);

        this.state = {
            data: {
                id: "",
                days: this.getDaysInMonth(currentMonth, currentYear),
                expandColumns: this.isTemplate,
                month: currentMonth,
                year: currentYear,
                client: "",
                project: "",
                profileId: props.profile.id,
                profile: props.profile
            },
            snackbarOpen: false
        };

        this.fetchData(currentMonth, currentYear, props.profile.id);
    }

    fetchData = async (month, year, profileId) => {
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
            this.setState(prevState => {
                prevState.data = instance.data();
                prevState.data.id = instance.id;
                return prevState;
            });
        }

        this.isLoading = false;
    };

    handleChange(value, column, day) {
        const days = this.state.data.days;
        const numberValue = Number(value);
        days[day][column] = isNaN(numberValue) ? "" : numberValue;
        this.setState({ ...this.state.data, days: days });
    }

    expandColumns(checked) {
        this.setState(prevState => {
            prevState.data.expandColumns = checked;
            return prevState;
        });
    }

    setMonth(month, year) {
        const days = this.getDaysInMonth(month, year);
        this.setState(prevState => {
            prevState.data.month = month;
            prevState.data.year = year;
            prevState.data.days = days;
            return prevState;
        });

        this.fetchData(month, year, this.props.profile.id);
    }

    getDaysInMonth(month, year) {
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
                explanation: ""
            });
        }

        return rows;
    }

    getRowClass(row) {
        return this.isNotWeekend(row.dayOfTheWeek) ? "" : "highlight";
    }

    getTotal(column) {
        const values = this.state.data.days.map(x => x[column]);
        return values.reduce((total, currentValue) => {
            return Number(total) + Number(currentValue);
        });
    }

    isNotWeekend(dayOfTheWeek) {
        return (dayOfTheWeek !== 0 && dayOfTheWeek !== 6) || this.isTemplate;
    }

    hoursCell(row, column) {
        return (
            <TableCell align="right" key={row.day + "-" + column}>
                {this.isNotWeekend(row.dayOfTheWeek) ? (
                    <TextField
                        id={column}
                        inputProps={{
                            style: {
                                textAlign: "right"
                            },
                            day: row.day
                        }}
                        value={row[column]}
                        onChange={event =>
                            this.handleChange(
                                event.target.value,
                                column,
                                row.day - 1
                            )
                        }
                        onBlur={this.submitHours}
                        size="small"
                    />
                ) : null}
            </TableCell>
        );
    }

    handleClientInput(value) {
        this.setState(prevState => {
            prevState.data.client = value;
            return prevState;
        });
    }

    handleProjectInput(value) {
        this.setState(prevState => {
            prevState.data.project = value;
            return prevState;
        });
    }

    submitHours() {
        const db = firebase.firestore();
        db.collection("months")
            .doc(
                this.state.data.year +
                    "-" +
                    this.state.data.month +
                    "-" +
                    this.state.data.profile.displayName
            )
            .set(this.state.data)
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
        return (
            <form noValidate autoComplete="off">
                {!this.isTemplate ? (
                    <Toolbar>
                        <Grid container direction="row" alignItems="flex-start">
                            <FormControl>
                                <InputLabel id="select-month-label">
                                    Maand
                                </InputLabel>
                                <Select
                                    labelId="select-month-label"
                                    id="select-month-label"
                                    value={this.state.data.month}
                                    onChange={event =>
                                        this.setMonth(
                                            event.target.value,
                                            this.state.data.year
                                        )
                                    }
                                >
                                    {this.months.map(month => {
                                        return (
                                            <MenuItem
                                                value={month.id}
                                                key={month.id}
                                            >
                                                {month.description}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel id="select-year-label">
                                    Jaar
                                </InputLabel>
                                <Select
                                    labelId="select-year-label"
                                    id="select-year-label"
                                    value={this.state.data.year}
                                    onChange={event =>
                                        this.setMonth(
                                            this.state.data.month,
                                            event.target.value
                                        )
                                    }
                                >
                                    {this.years.map(year => {
                                        return (
                                            <MenuItem value={year} key={year}>
                                                {year}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <TextField
                                id="client"
                                label="Klant"
                                value={this.state.data.client}
                                onChange={event =>
                                    this.handleClientInput(event.target.value)
                                }
                            />
                            <TextField
                                id="project"
                                label="Project"
                                value={this.state.data.project}
                                onChange={event =>
                                    this.handleProjectInput(event.target.value)
                                }
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.data.expandColumns}
                                        onChange={event =>
                                            this.expandColumns(
                                                event.target.checked
                                            )
                                        }
                                        color="primary"
                                    />
                                }
                                label="Toon alle velden"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.submitHours}
                            >
                                Verstuur
                            </Button>
                        </Grid>
                    </Toolbar>
                ) : null}
                <TableContainer component={Paper} className="hoursGrid">
                    <Table stickyHeader size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                {this.columns.map(column => {
                                    if (
                                        !column.enabled &&
                                        !this.state.data.expandColumns
                                    ) {
                                        return null;
                                    }
                                    return (
                                        <TableCell
                                            align="right"
                                            key={"header-" + column.id}
                                        >
                                            {column.description}
                                        </TableCell>
                                    );
                                })}
                                <TableCell align="right">Toelichting</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.days.map(row => (
                                <TableRow
                                    key={row.day}
                                    className={this.getRowClass(row)}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.day}
                                    </TableCell>
                                    {this.columns.map(column => {
                                        if (
                                            !column.enabled &&
                                            !this.state.data.expandColumns
                                        ) {
                                            return null;
                                        }
                                        return this.hoursCell(row, column.id);
                                    })}
                                    <TableCell align="right">
                                        {this.isNotWeekend(row.dayOfTheWeek) ? (
                                            <TextField
                                                id="explanation"
                                                inputProps={{
                                                    day: row.day
                                                }}
                                                onBlur={event =>
                                                    this.handleChange(
                                                        event.target.value,
                                                        "explanation",
                                                        row.day
                                                    )
                                                }
                                            />
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell> Totaal</TableCell>
                                {this.columns.map(column => {
                                    if (
                                        !column.enabled &&
                                        !this.state.data.expandColumns
                                    ) {
                                        return null;
                                    }
                                    return (
                                        <TableCell
                                            align="right"
                                            key={"footer-" + column.id}
                                        >
                                            {this.getTotal(column.id)}
                                        </TableCell>
                                    );
                                })}
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
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

export default HoursGrid;

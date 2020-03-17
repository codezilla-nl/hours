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

import * as HoursConstants from "./hoursConstants";

import * as firebase from "firebase";
import "firebase/firestore";

class HoursGrid extends React.Component {
    columns = HoursConstants.columns;
    months = HoursConstants.months;
    years = HoursConstants.years;
    isTemplate = false;
    db;
    snackbarOpen = false;

    // Your web app's Firebase configuration
    firebaseConfig = {
        apiKey: "AIzaSyAkvaF-lqt8ZxyBwcNlwrHhj-Pp3Ev54pI",
        authDomain: "codezilla-hours.firebaseapp.com",
        databaseURL: "https://codezilla-hours.firebaseio.com",
        projectId: "codezilla-hours",
        storageBucket: "codezilla-hours.appspot.com",
        messagingSenderId: "634823174203",
        appId: "1:634823174203:web:ca40af276111cfae66541e",
        measurementId: "G-DR0KK33WCW"
    };

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
                days: this.getDaysInMonth(0, currentYear),
                expandColumns: this.isTemplate,
                month: currentMonth,
                year: currentYear,
                client: "",
                project: ""
            }
        };

        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(this.firebaseConfig);
        }

        this.db = firebase.firestore();

        this.db
            .collection("months")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log(doc.data());
                });
            });
    }

    handleChange(value, column, day) {
        var days = this.state.data.days;
        days[day][column] = Number(value);
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
    }

    getDaysInMonth(month, year) {
        const daysInAMonth = new Date(year, month, 0).getDate();
        const rows = [];

        for (let i = 1; i < daysInAMonth; i++) {
            rows.push({
                day: i,
                dayOfTheWeek: new Date(year, month - 1, i).getDay(),
                date: new Date(year, month - 1, i),
                worked: 0,
                overtime: 0,
                sick: 0,
                holiday: 0,
                publicHoliday: 0,
                available: 0,
                education: 0,
                other: 0,
                standBy: 0,
                kilometers: 0,
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
            return total + currentValue;
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
                        onBlur={event =>
                            this.handleChange(
                                event.target.value,
                                column,
                                row.day
                            )
                        }
                        size="small"
                    />
                ) : null}
            </TableCell>
        );
    }

    handleClientInput(event) {
        var value = event.target.value;
        this.setState(prevState => {
            prevState.data.client = value;
            return prevState;
        });
    }

    handleProjectInput(event) {
        var value = event.target.value;
        this.setState(prevState => {
            prevState.data.project = value;
            return prevState;
        });
    }

    submitHours() {
        console.log(this.state);
        this.db
            .collection("months")
            .add(this.state.data)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                this.snackbarOpen = true;
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    }

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
                                onBlur={this.handleClientInput}
                            />
                            <TextField
                                id="project"
                                label="Project"
                                onBlur={this.handleProjectInput}
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
                    open={this.snackbarOpen}
                    autoHideDuration={6000}
                    message="Uren verstuurd"
                />
            </form>
        );
    }
}

export default HoursGrid;

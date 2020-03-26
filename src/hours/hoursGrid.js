import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import TableFooter from "@material-ui/core/TableFooter";

import * as HoursConstants from "./hoursConstants";

const columns = HoursConstants.columns;

const HoursGrid = props => {
    const { columnsExpanded, days, handleChange, save, isTemplate } = props;

    const isNotWeekend = dayOfTheWeek => {
        return dayOfTheWeek !== 0 && dayOfTheWeek !== 6;
    };

    const getRowClass = dayOfTheWeek => {
        return isNotWeekend(dayOfTheWeek) ? "" : "highlight";
    };

    const hoursCell = (row, column) => {
        return (
            <TableCell align="right" key={row.day + "-" + column}>
                {isNotWeekend(row.dayOfTheWeek) ? (
                    <TextField
                        id={column}
                        inputProps={{
                            style: {
                                textAlign: "right",
                            },
                            day: row.day,
                        }}
                        value={row[column]}
                        onChange={event =>
                            handleChange(
                                event.target.value,
                                column,
                                row.day - 1,
                            )
                        }
                        onBlur={() => save(isTemplate)}
                        size="small"
                    />
                ) : null}
            </TableCell>
        );
    };

    const getTotal = column => {
        const values = days.map(x => x[column]);
        return values.reduce((total, currentValue) => {
            return Number(total) + Number(currentValue);
        });
    };

    return (
        <TableContainer component={Paper} className="hoursGrid">
            <Table stickyHeader size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        {columns.map(column => {
                            if (!column.enabled && !columnsExpanded) {
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
                    {days.map(row => (
                        <TableRow
                            key={row.day}
                            className={getRowClass(row.dayOfTheWeek)}
                        >
                            <TableCell component="th" scope="row">
                                {row.day}
                            </TableCell>
                            {columns.map(column => {
                                if (!column.enabled && !columnsExpanded) {
                                    return null;
                                }
                                return hoursCell(row, column.id);
                            })}
                            <TableCell align="right">
                                {isNotWeekend(row.dayOfTheWeek) ? (
                                    <TextField
                                        id="explanation"
                                        inputProps={{
                                            day: row.day,
                                        }}
                                        onBlur={event =>
                                            handleChange(
                                                event.target.value,
                                                "explanation",
                                                row.day,
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
                        {columns.map(column => {
                            if (!column.enabled && !columnsExpanded) {
                                return null;
                            }
                            return (
                                <TableCell
                                    align="right"
                                    key={"footer-" + column.id}
                                >
                                    {getTotal(column.id)}
                                </TableCell>
                            );
                        })}
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default HoursGrid;

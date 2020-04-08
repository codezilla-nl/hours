import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Paper,
} from "@material-ui/core";

import * as HoursConstants from "./hoursConstants";
import HoursFooter from "./HoursFooter";
import HoursCell from "./HoursCell";
import HoursTableHead from "./HoursTableHeader";

const columns = HoursConstants.columns;

const HoursGrid = ({ expandColumns, days, handleChange, save, isTemplate }) => {
    const isNotWeekend = dayOfTheWeek => {
        return dayOfTheWeek !== 0 && dayOfTheWeek !== 6;
    };

    const getRowClass = dayOfTheWeek => {
        return isNotWeekend(dayOfTheWeek) ? "" : "highlight";
    };

    const getDayOfTheWeek = row => {
        if (isTemplate) {
            return row.day - 1;
        }
        if (row.date instanceof Date) {
            /* row.date is valid date object */
            return new Date(row.date).getDay();
        }
        if (row.date.toDate() instanceof Date) {
            /* row.date is a timestamp */
            return new Date(row.date.toDate()).getDay();
        }
        /* No valid date, return -1 */
        return -1;
    };

    return (
        <TableContainer component={Paper} className="hoursGrid">
            <Table stickyHeader size="small" aria-label="simple table">
                <HoursTableHead expandColumns={expandColumns} />
                <TableBody>
                    {days.map(row => {
                        const dayOfTheWeek = getDayOfTheWeek(row);
                        return (
                            <TableRow
                                key={row.day}
                                className={getRowClass(dayOfTheWeek)}
                            >
                                <TableCell component="th" scope="row">
                                    {row.day}
                                </TableCell>
                                {columns.map((column, i) => {
                                    if (!column.enabled && !expandColumns) {
                                        return null;
                                    }
                                    return (
                                        <HoursCell
                                            key={`${column.id}-${i}`}
                                            row={row}
                                            column={column.id}
                                            handleChange={handleChange}
                                            save={save}
                                            days={days}
                                        />
                                    );
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
                        );
                    })}
                </TableBody>
                <HoursFooter expandColumns={expandColumns} days={days} />
            </Table>
        </TableContainer>
    );
};

export default HoursGrid;

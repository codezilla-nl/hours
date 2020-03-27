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

const HoursGrid = ({
    expandColumns,
    days,
    handleChange,
    save,
    month,
    year,
    isTemplate,
}) => {
    const isNotWeekend = dayNumber => {
        const dayOfTheWeek = new Date(year, month - 1, dayNumber + 1).getDay();
        return dayOfTheWeek !== 0 && dayOfTheWeek !== 6;
    };

    const getRowClass = dayNumber => {
        return isNotWeekend(dayNumber) ? "" : "highlight";
    };

    return (
        <TableContainer component={Paper} className="hoursGrid">
            <Table stickyHeader size="small" aria-label="simple table">
                <HoursTableHead expandColumns={expandColumns} />
                <TableBody>
                    {days.map((row, rowNumber) => {
                        return (
                            <TableRow
                                key={row.day}
                                className={getRowClass(rowNumber)}
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
                                            isTemplate={isTemplate}
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

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
    const isNotWeekend = dayOfTheWeek => {
        return dayOfTheWeek !== 0 && dayOfTheWeek !== 6;
    };

    const getRowClass = dayOfTheWeek => {
        return isNotWeekend(dayOfTheWeek) ? "" : "highlight";
    };

    return (
        <TableContainer component={Paper} className="hoursGrid">
            <Table stickyHeader size="small" aria-label="simple table">
                <HoursTableHead expandColumns={expandColumns} />
                <TableBody>
                    {days.map(row => {
                        const dayOfTheWeek = isTemplate
                            ? row.day - 1
                            : new Date(
                                  month + "-" + row.day + "-" + year,
                              ).getDay();
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

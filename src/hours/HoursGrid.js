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

const HoursGrid = ({ expandColumns, days, handleChange, save, readOnly }) => {
    const getRowClass = (row) => {
        return row.isWeekend ? "highlight" : "";
    };

    return (
        <TableContainer component={Paper} className="hoursGrid">
            <Table stickyHeader size="small" aria-label="simple table">
                <HoursTableHead expandColumns={expandColumns} />
                <TableBody>
                    {days.map((row) => {
                        return (
                            <TableRow
                                key={row.day}
                                className={getRowClass(row)}
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
                                            readOnly={readOnly}
                                        />
                                    );
                                })}
                                <TableCell>
                                    {Boolean(readOnly) ? (
                                        row.explanation
                                    ) : (
                                        <TextField
                                            id="explanation"
                                            inputProps={{
                                                day: row.day,
                                            }}
                                            value={row.explanation}
                                            onBlur={(event) =>
                                                handleChange(
                                                    event.target.value,
                                                    "explanation",
                                                    row.day,
                                                )
                                            }
                                        />
                                    )}
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

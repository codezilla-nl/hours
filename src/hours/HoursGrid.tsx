import React from "react";
import {
    makeStyles,
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

import IDay from "../common/interfaces/IDay";

interface IProps {
    expandColumns: boolean;
    days: IDay[];
    handleChange: any;
    save: any;
    readOnly: any;
}

const columns = HoursConstants.columns;

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        overflowX: "inherit",
    },
}));

const HoursGrid = ({
    expandColumns,
    days,
    handleChange,
    save,
    readOnly,
}: IProps) => {
    const classes = useStyles();
    const getRowClass = (isWeekend: boolean, isPublicHoliday: boolean) => {
        let output = "";
        output += isWeekend ? " isWeekend" : "";
        output += isPublicHoliday ? " isPublicHoliday" : "";
        return output;
    };

    const getDayName = (date: string, index: number) => {
        const days = [
            "Zondag",
            "Maandag",
            "Dinsdag",
            "Woensdag",
            "Donderdag",
            "Vrijdag",
            "Zaterdag",
        ];

        if (!date) {
            return days[index];
        }

        const dateObj = new Date(date);
        return days[dateObj.getDay()];
    };

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table stickyHeader size="small" aria-label="simple table">
                <HoursTableHead expandColumns={expandColumns} />
                <TableBody>
                    {days.map((row, index) => {
                        return (
                            <TableRow
                                key={row.day}
                                className={getRowClass(
                                    row.isWeekend,
                                    row.isPublicHoliday,
                                )}
                            >
                                <TableCell component="th" scope="row">
                                    <span className="dayName">
                                        {getDayName(row.date, index)}
                                    </span>
                                </TableCell>
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

import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";

const HoursCell = ({ row, column, days, handleChange, isTemplate, save }) => {
    const handleHoursInput = (value, column, day) => {
        const daysInput = [...days];
        const numberValue = Number(value);
        daysInput[day][column] = isNaN(numberValue) ? "" : numberValue;
        handleChange("days", daysInput);
    };

    if (!row) return null;

    return (
        <TableCell align="right" key={row.day + "-" + column}>
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
                    handleHoursInput(event.target.value, column, row.day - 1)
                }
                onBlur={() => save(isTemplate)}
                size="small"
            />
        </TableCell>
    );
};

export default HoursCell;

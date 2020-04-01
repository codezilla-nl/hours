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

    /* Jump with arrow keys to another field */
    const onKeyDown = event => {
        const column = event.target.closest("td");
        const row = column.parentNode;
        const index = Array.from(row.children).indexOf(column);

        switch (event.keyCode) {
            case 40:
                /* arrow key down */
                const nextRow = row.nextSibling;
                if (nextRow !== null) {
                    nextRow.children[index].querySelector("input").focus();
                }
                break;
            case 38:
                /* arrow key up */
                const prevRow = row.previousSibling;
                if (prevRow !== null) {
                    prevRow.children[index].querySelector("input").focus();
                }
                break;
            default:
                break;
        }
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
                onKeyDown={onKeyDown}
                size="small"
            />
        </TableCell>
    );
};

export default HoursCell;

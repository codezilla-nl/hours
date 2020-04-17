import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";

const HoursCell = ({ row, column, days, handleChange, save, readOnly }) => {
    const [value, setValue] = React.useState(row[column]);

    React.useEffect(() => {
        setValue(row[column]);
    }, [row, column, days]);

    const handleHoursInput = (value, column, day) => {
        const daysInput = [...days];
        let output = "";
        if (value !== "") {
            const numberValue = Number(value);
            output = isNaN(numberValue) ? "" : numberValue;
        }
        daysInput[day][column] = output;
        setValue(output);
        handleChange("days", daysInput);
        save();
    };

    /* Jump with arrow keys to another field */
    const onKeyDown = (event) => {
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
            case 37:
                /* arrow key left */
                if(column.previousElementSibling.tagName === 'TD') {
                    column.previousElementSibling.querySelector("input").focus();
                }
                break;
            case 39:
                /* arrow key right */
                if(column.nextElementSibling.tagName === 'TD') {
                    column.nextElementSibling.querySelector("input").focus();
                }
                break;
            default:
                break;
        }
    };

    if (!row) return null;

    return (
        <TableCell align="left" key={row.day + "-" + column}>
            <TextField
                id={column}
                inputProps={{
                    style: {
                        textAlign: "left",
                    },
                    day: row.day,
                }}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onBlur={(event) =>
                    handleHoursInput(event.target.value, column, row.day - 1)
                }
                onKeyDown={onKeyDown}
                size="small"
                disabled={Boolean(readOnly)}
            />
        </TableCell>
    );
};

export default HoursCell;

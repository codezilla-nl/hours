import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";

import IDay from "../../common/interfaces/IDay";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "90%",
    },
}));

interface IProps {
    row: any;
    column: string;
    days: IDay[];
    handleChange: any;
    save: any;
    readOnly: boolean;
}

const HoursCell = ({
    row,
    column,
    days,
    handleChange,
    save,
    readOnly,
}: IProps) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(row[column]);

    React.useEffect(() => {
        setValue(row[column]);
    }, [row, column, days]);

    const handleHoursInput = (value: string, column: string, day: number) => {
        const daysInput = [...days];
        daysInput[day][column] = value;
        setValue(value);
        handleChange("days", daysInput);
        save();
    };

    /* Jump with arrow keys to another field */
    const onKeyDown = (event: any) => {
        const column = event.target.closest("td");
        const row = column.parentNode;
        const index = Array.from(row.children).indexOf(column);

        event.preventDefault();

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
                if (column.previousElementSibling.tagName === "TD") {
                    column.previousElementSibling
                        .querySelector("input")
                        .focus();
                }
                break;
            case 39:
                /* arrow key right */
                if (column.nextElementSibling.tagName === "TD") {
                    column.nextElementSibling.querySelector("input").focus();
                }
                break;
            default:
                break;
        }
    };

    if (!row) return null;

    return (
        <TableCell align="left" key={row.day + "-" + column} padding="none">
            {Boolean(readOnly) ? (
                value
            ) : (
                <TextField
                    id={column}
                    className={classes.textField}
                    fullWidth={false}
                    type="number"
                    inputProps={{
                        style: {
                            textAlign: "left",
                        },
                        day: row.day,
                    }}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onBlur={(event) =>
                        handleHoursInput(
                            event.target.value,
                            column,
                            row.day - 1,
                        )
                    }
                    onKeyDown={onKeyDown}
                />
            )}
        </TableCell>
    );
};

export default HoursCell;
